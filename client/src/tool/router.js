import Vue from 'vue'
import Router from 'vue-router'
import loading from '@/components/loading'
import login from '@/components/login'
import register from '@/components/register'
import error from '@/components/error'
import app1 from '@/components/app1'
import app2 from '@/components/app2'

import CONST from '@/store/const.js'
import manager from '@/store/manager.js'
import utils from '@/tool/utils.js'

Vue.use(Router)

let preloadApp1 = (to, from, next) => {
  if (!manager.controller.checkAuth(to)) {
    return
  }
  next()
}
let preloadApp2 = (to, from, next) => {
  if (!manager.controller.checkAuth(to)) {
    return
  }
  next()
}

export default new Router({
  routes: [
    {name: 'loading', path: '/', component: loading},
    {name: 'login', path: '/login', component: login},
    {name: 'register', path: '/register', component: register},
    {name: 'error', path: '/error', component: error},
    {name: 'app1', path: '/app1', component: app1, beforeEnter: preloadApp1},
    {name: 'app2', path: '/app2', component: app2, beforeEnter: preloadApp2},
    {path: '*', redirect: '/'}
  ]
})
