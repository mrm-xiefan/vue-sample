import Vue from 'vue'
import Router from 'vue-router'
import app1 from '@/components/app1'
import app2 from '@/components/app2'

import CONST from '@/store/const.js'
import manager from '@/store/manager.js'
import utils from '@/tool/utils.js'

Vue.use(Router)

let getApp1Data = (to, from, next) => {
  // utils.restGet('/api/getApp1Data').then(
  //   response => {
  //     if (response) {
        next()
  //     }
  //   }
  // )
}

export default new Router({
  routes: [
    {path: '/', component: app1, beforeEnter: getApp1Data},
    {path: '/app2', component: app2},
    {path: '*', redirect: '/'}
  ]
})
