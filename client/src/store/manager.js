import User from './user.js'
import Controller from './controller.js'

class Manager {
  constructor() {
    this.modal = {
      type: '',
      title: '',
      message: ''
    }
    this.users = []
    this.controller = new Controller()
    this.socket = null
  }
  addUser() {
    let user = new User()
    this.users.push(user)
    return user
  }
}

export default new Manager()
