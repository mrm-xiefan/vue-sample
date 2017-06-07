import User from './user.js'
import Controller from './controller.js'

class Manager {
  constructor() {
    this.modal = {
      // info, warn
      type: '',
      title: '',
      message: ''
    }
    this.users = []
    this.controller = new Controller()
  }
  addUser() {
    let user = new User()
    this.users.push(user)
    return user
  }
}

export default new Manager()
