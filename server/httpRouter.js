let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let url = require('url')
let qs = require('querystring')
let mimeTypes = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.otf': 'font/opentype',
  '.woff': 'application/font-woff',
  '.woff2': 'application/font-woff2',
  '.eot': 'application/vnd.ms-fontobject'
}
// let uploadService = require('./uploadService.js').uploadService
// let utils = require('./utils').utils

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

router.get('/img/*', function(req, res, next) {
  req.url = req.url.replace('/img/', '/static/img/')
  returnResourceFile(req, res)
})
router.get('/css/*', function(req, res, next) {
  req.url = req.url.replace('/css/', '/dist/static/css/')
  returnResourceFile(req, res)
})
router.get('/js/*', function(req, res, next) {
  req.url = req.url.replace('/js/', '/dist/static/js/')
  returnResourceFile(req, res)
})

// router.get('/sub/lib/*', function(req, res, next) {
//   req.url = req.url.replace('/sub/', '/')
//   returnResourceFile(req, res)
// })
// router.get('/sub/img/*', function(req, res, next) {
//   req.url = req.url.replace('/sub/', '/')
//   returnResourceFile(req, res)
// })
// router.get('/sub/css/*', function(req, res, next) {
//   req.url = req.url.replace('/sub/', '/')
//   returnResourceFile(req, res)
// })
// router.get('/sub/js/*', function(req, res, next) {
//   req.url = req.url.replace('/sub/', '/')
//   returnResourceFile(req, res)
// })

router.get('/api/getData', function(req, res, next) {
  let url_parts = url.parse(req.url, true)
//   let name = url_parts.query.name
//   console.log('getData:' + name)
  console.log('getData')

  res.setHeader('Acces-Control-Allow-Origin', '*')
  res.json({error: null, data: {msg: "mmmm"}})
})

function returnResourceFile(req, res) {
  let publicDirectory = fs.realpathSync('static')
  let decodedUri = decodeURI(req.url)
  let fileFullPathArray = path.join(publicDirectory, decodedUri).split('?')
  let fileFullPath = fileFullPathArray[0]
  let st = fs.statSync(fileFullPath)
  let etag = '"' + st.size + '-' + Number(st.mtime) + '"'
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304)
    res.end()
  } else {
    let ext = path.extname(path.basename(decodedUri).split('?')[0])
    let mimeType = 'application/octet-stream'
    if (mimeTypes[ext]) {
      mimeType = mimeTypes[ext]
    }
    fs.exists(fileFullPath, function(exists) {
      if (exists) {
        fs.readFile(fileFullPath, function(err, data) {
          if (err) {
            res.writeHead(500)
            res.end('Internal Server Error')
          } else {
            let headers = {
              'Content-Type': mimeType,
              'Etag': etag
            }
            res.writeHead(200, headers)
            res.end(data)
          }
        })
      } else {
        res.writeHead(404)
        res.end('Nod found.')
      }
    })
  }
}

module.exports = router
