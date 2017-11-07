import logger from './logger.js'
import conf from 'config'
import mongo from './mongo.js'
import utils from './utils.js'
import fs from 'fs'
import path from 'path'
import moment from 'moment'
import uuid from 'uuid'
import formidable from 'formidable'
import AWS from 'aws-sdk'
let s3 = new AWS.S3({signatureVersion: 'v2'})
import os from 'os'
if (os.arch() == 'x64') {
  var sharp = require('sharp')
}

class dataService {
  constructor() {
  }
  uploadFiles(req, next) {
    let self = this
    let localFileList = []
    let movedFileList = []
    let form = new formidable.IncomingForm()
    let params = {}
    form.multiples = false

    form.on('field', (field, value) => {
      params[field] = value
    })

    form.on('fileBegin', (field, file) => {
      let folder = uuid.v4()
      file.path = path.join(__dirname, '..', 'upload', folder, file.name)
      fs.mkdirSync(path.join(__dirname, '..', 'upload', folder))
      localFileList.push({
        fullname: file.path,
        folder: folder,
        name: file.name,
        extname: path.extname(file.path).toUpperCase().replace('.', ''),
        type: file.type
      })
    })

    form.on('file', (field, file) => {
      for (let i = 0; i < localFileList.length; i ++) {
        if (localFileList[i].fullname == file.path) {
          localFileList[i].size = file.size
          break
        }
      }
    })

    form.on('end', () => {
      let fileList = []
      self.thumbnail(localFileList, 0, fileList, (error) => {
        if (error) {
          next(error)
        }
        else {
          self.putToS3(fileList, (error) => {
            if (error) {
              next(error)
            }
            else {
              next(null, fileList, params)
            }
          })
        }
      })
    })

    form.on('error', (error) => {
      logger.error(error)
      next('S006')
    })

    form.parse(req)
  }
  thumbnail(localFileList, idx, fileList, next) {
    let self = this
    if (idx > localFileList.length - 1) {
      next(null)
      return
    }
    let needThumbnail = false
    for (let i = 0; i < conf.image.length; i ++) {
      if (conf.image[i] == localFileList[idx].extname) {
        needThumbnail = true
        break
      }
    }
    if (needThumbnail) {
      if (os.arch() == 'x64') {
        let thumbnailName = path.basename(localFileList[idx].name, path.extname(localFileList[idx].name)) + '_small' + '.jpg'
        let thumbnailFullname = path.join(__dirname, '..', 'upload', localFileList[idx].folder, thumbnailName)
        sharp(localFileList[idx].fullname)
          .rotate()
          .resize(500)
          .limitInputPixels(0)
          // .max()
          .toFile(thumbnailFullname)
          .then((data) => {
            fileList.push({
              extname: localFileList[idx].extname,
              type: localFileList[idx].type,
              size: localFileList[idx].size,
              folder: localFileList[idx].folder,
              name: localFileList[idx].name,
              thumbnail: thumbnailName
            })
            self.thumbnail(localFileList, idx + 1, fileList, next)
          })
          .catch((error) => {
            logger.error('sharp error: ' + JSON.stringify(error))
            next('S006')
          })
      }
      else {
        fileList.push({
          extname: localFileList[idx].extname,
          type: localFileList[idx].type,
          size: localFileList[idx].size,
          folder: localFileList[idx].folder,
          name: localFileList[idx].name,
          thumbnail: localFileList[idx].name
        })
        self.thumbnail(localFileList, idx + 1, fileList, next)
      }
    }
    else {
      if ((localFileList[idx].type.split('/')[0] == 'image') && (localFileList[idx].type.split('/')[1].indexOf('octet-stream') != -1 || localFileList[idx].type.split('/')[1].indexOf('photoshop') != -1 || localFileList[idx].type.split('/')[1].indexOf('psd') != -1)) {
        fileList.push({
          extname: localFileList[idx].extname,
          type: localFileList[idx].type,
          size: localFileList[idx].size,
          folder: localFileList[idx].folder,
          name: localFileList[idx].name,
          thumbnail: localFileList[idx].name
        })
      } else {
        fileList.push({
          extname: localFileList[idx].extname,
          type: localFileList[idx].type,
          size: localFileList[idx].size,
          folder: localFileList[idx].folder,
          name: localFileList[idx].name,
          thumbnail: null
        })
      }
      self.thumbnail(localFileList, idx + 1, fileList, next)
    }
  }
  putToS3(fileList, next) {
    if (conf.s3.mode == 'local') {
      next(null)
      return
    }
    this.putOneSetToS3(fileList, 0, next)
  }
  putOneSetToS3(fileList, idx, next) {
    let self = this
    if (idx > fileList.length - 1) {
      next(null)
      return
    }
    self.putOneFileToS3(fileList[idx].folder, fileList[idx].name, fileList[idx].type, (error) => {
      if (error) {
        next(error)
        return
      }
      else {
        if (fileList[idx].thumbnail && fileList[idx].name != fileList[idx].thumbnail) {
          self.putOneFileToS3(fileList[idx].folder, fileList[idx].thumbnail, fileList[idx].type, (error) => {
            if (error) {
              next(error)
              return
            }
            else {
              fs.rmdir(path.join(__dirname, '..', 'upload', fileList[idx].folder), (del_error) => {
                if (del_error) {
                  logger.error(fileList[idx].folder, "|", JSON.stringify(del_error))
                }
              })
              self.putOneSetToS3(fileList, idx + 1, next)
            }
          })
        }
        else {
          fs.rmdir(path.join(__dirname, '..', 'upload', fileList[idx].folder), (del_error) => {
            if (del_error) {
              logger.error(fileList[idx].folder, "|", JSON.stringify(del_error))
            }
          })
          self.putOneSetToS3(fileList, idx + 1, next)
        }
      }
    })
  }
  putOneFileToS3(folder, filename, filetype, next) {
    if (!filename) {
      next(null)
      return
    }
    let sourceFile = path.join(__dirname, '..', 'upload', folder, filename)
    s3.putObject({
      Bucket: conf.s3.bucket,
      Key: path.join(conf.s3.upload, folder, filename),
      ACL: 'public-read',
      Body: fs.createReadStream(sourceFile),
      ContentType: filetype
    }).promise().then((data) => {
      utils.deleteFile(sourceFile, (del_error) => {
        if (del_error) {
          logger.error(sourceFile, "|", JSON.stringify(del_error))
        }
      })
      next(null, data)
    }).catch((error) => {
      logger.error('s3.putObject error: ' + JSON.stringify(error))
      next('S004')
    })
  }
}

export default new dataService()
