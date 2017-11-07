import manager from '@/store/manager.js'
import CONST from './const.js'
import utils from '@/tool/utils.js'

class File {
  constructor(data) {
    if (data.thumbnail) {
      this.thumbnail = encodeURI(data.thumbnail)
    }
    else {
      this.thumbnail = null
    }
    if (data.file) {
      this.file = encodeURI(data.file)
    }
    else {
      this.file = null
    }
    this.folder = data.folder
    this.type = data.type
    this.name = data.name
    this.size = data.size
  }
  getType() {
    if (!this.type) {
      return 'other'
    }
    let types = this.type.split('/')
    let type = types[0]
    if (types[0] == 'chat' && types[1] == 'message') {
      return 'message'
    }
    if (types[0] == 'audio') {
      return 'audio'
    }
    else if (types[0] == 'video') {
      return 'video'
    }
    else if (types[0] == 'image') {
      if (types[1] && (types[1].indexOf('octet-stream') != -1 || types[1].indexOf('photoshop') != -1 || types[1].indexOf('psd') != -1)) {
        return 'other'
      }
      else {
        return 'image'
      }
    }
    else {
      return 'other'
    }
  }
  getThumbnail() {
    if (this.thumbnail) {
      return this.thumbnail
    }
    if (this.getType() == 'image') {
      if (this.size <= 1024 * 1024 * 5) {
        return this.file
      }
    }
    return this.getIcon()
  }
  getIcon() {
    let rootpath = '/static/icons/'
    let invalid = '/static/noimage.png'
    let types = this.type.split('/')
    if (types.length <= 1) {
      return invalid
    }
    let type = types[1].toLowerCase()
    if (type.indexOf('png') != -1) {
      return rootpath + 'png.png'
    }
    if (type.indexOf('jpeg') != -1 || type.indexOf('jpg') != -1) {
      return rootpath + 'jpeg.png'
    }
    if ((type.indexOf('tiff') != -1) || (type.indexOf('tif') != -1)) {
      return rootpath + 'tiff.png'
    }
    if (type.indexOf('bmp') != -1) {
      return rootpath + 'bmp.png'
    }
    if (type.indexOf('midi') != -1) {
      return rootpath + 'midi.png'
    }
    if (type.indexOf('mp3') != -1) {
      return rootpath + 'mp3.png'
    }
    if (type.indexOf('wav') != -1) {
      return rootpath + 'wav.png'
    }
    if (type.indexOf('wmv') != -1) {
      return rootpath + 'wmv.png'
    }
    if (type.indexOf('avi') != -1) {
      return rootpath + 'avi.png'
    }
    if (type.indexOf('mp4') != -1) {
      return rootpath + 'mp4.png'
    }
    if (type.indexOf('quicktime') != -1 ) {
      return rootpath + 'mov.png'
    }
    if (type.indexOf('mpeg') != -1) {
      return rootpath + 'mpeg.png'
    }
    if (type.indexOf('eps') != -1) {
      return rootpath + 'eps.png'
    }
    if (type.indexOf('msword') != -1) {
      return rootpath + 'docx.png'
    }
    if (type.indexOf('sheet') != -1 || type.indexOf('ms-excel') != -1) {
      return rootpath + 'xlsx.png'
    }
    if (type.indexOf('presentation') != -1 || type.indexOf('ms-powerpoint') != -1) {
      return rootpath + 'pptx.png'
    }
    if (type.indexOf('pdf') != -1) {
      return rootpath + 'pdf.png'
    }
    if (type.indexOf('postscript') != -1) {
      return rootpath + 'ai.png'
    }
    if (type.indexOf('octet-stream') != -1 || type.indexOf('photoshop') != -1 || type.indexOf('psd') != -1) {
      return rootpath + 'psd.png'
    }
    if (type.indexOf('vnd.ms-visio.viewer') != -1) {
      return rootpath + 'vsd.png'
    }
    if (type.indexOf('zip') != -1) {
      return rootpath + 'zip.png'
    }
    return invalid
  }
  getSize() {
    return utils.formatSize(this.size)
  }
}
export default File
