import CONST from './const.js'
import utils from '../tool/utils.js'
import Controller from './controller.js'
import User from './user.js'
import io from 'socket.io-client/dist/socket.io.js'

class Manager {
  constructor() {
    this.user = new User()
    this.controller = new Controller()
    this.socket = null
    this.oldsocket = null
  }

  login(data, next) {
    this.user.login(data.user)
    this.initSocket(next)
  }
  logout() {
    this.user.logout()
    if (this.socket) {
      this.socket.disconnect()
    }
  }
  initSocket(next) {
    let self = this
    if (self.controller.cors) {
      self.socket = io(CONST.developHost, {path: CONST.socketpath, forceNew: true})
    }
    else {
      self.socket = io(location.host, {path: CONST.socketpath, forceNew: true})
    }
    self.socket.on('connect', () => {
      utils.socket = self.socket
      if (self.oldsocket != null && self.oldsocket != self.socket.id) {
        utils.socketEmit('reinit', {oldsocket: self.oldsocket, user: self.user._id})
      }
      self.oldsocket = self.socket.id
      next()
    })
    self.socket.on('disconnect', () => {
      // utils.event.$emit('SHOW_MESSAGE', 'S005')
    })
    self.socket.on('processError', (error) => {
      utils.event.$emit('SHOW_MESSAGE', error)
    })
    self.socket.on('authenticateError', () => {
      utils.router.push({name: 'error'})
    })
    self.socket.on('reinited', () => {
      // utils.event.$emit('SHOW_MESSAGE', 'I001')
    })
  }
}

export default new Manager()
