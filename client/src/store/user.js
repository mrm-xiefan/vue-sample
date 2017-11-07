import manager from '@/store/manager.js'
import CONST from './const.js'
import utils from '@/tool/utils.js'

class User {
  constructor() {
    this._id = ''
    this.password = ''
  }
  isLogin() {
    return !(this._id == '')
  }
  login(user) {
    this._id = user._id
    this.password = user.password
  }
  logout() {
    this._id = ''
    this.password = ''
  }
}

export default User
