import manager from '@/store/manager.js'
import CONST from './const.js'
import utils from '@/tool/utils.js'

class Controller {
  constructor() {
    this.cors = true
    this.currentApp = ''
  }
  setApp(route) {
    let blocks = route.path.replace('/', '').split('/')
    let target = blocks[0]? blocks[0]: ''
    if (target == '') {
      target = CONST.defaultApp
    }
    if (target != this.currentApp) {
      this.currentApp = target
    }
  }
  checkAuth(route) {
    if (!manager.user.isLogin()) {
      if (route) {
        utils.router.push({name: 'loading', query: {path: route.fullPath}})
      }
      else {
        utils.router.push({name: 'loading'})
      }
    }
    return manager.user.isLogin()
  }
}
export default Controller
