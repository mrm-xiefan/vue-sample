import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/selectable.css'
import 'jquery-ui/themes/base/draggable.css'
import 'jquery-ui/themes/base/resizable.css'
import 'jquery-ui/themes/base/sortable.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'

import 'es6-promise/auto'
import 'jquery/dist/jquery.min.js'
import 'jquery-ui/ui/core.js'
import 'jquery-ui/ui/widgets/selectable.js'
import 'jquery-ui/ui/widgets/draggable.js'
import 'jquery-ui/ui/widgets/droppable.js'
import 'jquery-ui/ui/widgets/resizable.js'
import 'jquery-ui/ui/widgets/sortable.js'
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'admin-lte/dist/js/adminlte.min.js'
import 'bootstrap-fileinput'

import manager from '@/store/manager.js'
import utils from '@/tool/utils.js'
utils.init(manager)
import Vue from 'vue'
import router from '@/tool/router.js'
utils.router = router
import app from './app'
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  manager.controller.setApp(to)
  next()
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
