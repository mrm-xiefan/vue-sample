import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'admin-lte/dist/js/app.min.js'
import 'admin-lte/plugins/slimScroll/jquery.slimscroll.min.js'

import manager from '@/store/manager.js'
import Vue from 'vue'
import router from '@/router'
import util from '@/common/util.js'
import app from './app'
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  var target = to.path.replace('/', '')
  if (target == '') {
    target = 'app1'
  }

  if (target != manager.controller.currentApp) {
    manager.controller.currentApp = target
    next()
  }
  else {
    next()
  }
})

new Vue({
  el: '#app',
  data: () => {
    return {
      manager: manager
    }
  },
  router,
  template: '<app :manager="manager"></app>',
  components: {app}
})
