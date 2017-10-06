import User from './user.js'
import Controller from './controller.js'

class Manager {
  constructor() {
    this.user = new User()
    this.controller = new Controller()
    this.socket = null
    this.oldsocket = null
  }
}

export default new Manager()
