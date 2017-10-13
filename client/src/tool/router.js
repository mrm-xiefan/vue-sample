import Vue from 'vue'
import Router from 'vue-router'
import app1 from '@/components/app1'
import app2 from '@/components/app2'

import CONST from '@/store/const.js'
import manager from '@/store/manager.js'
import utils from '@/tool/utils.js'

Vue.use(Router)

// this.$router.push({name: 'app2', query: {something: 'sss'}})
let getApp1Data = (to, from, next) => {
  // let param = to.query.something
  // utils.restGet('/api/getApp1Data', {param: param}).then(
  //   response => {
  //     if (response) {
        next()
  //     }
  //   }
  // )
}

export default new Router({
  routes: [
    {name: 'app1', path: '/app1', component: app1, beforeEnter: getApp1Data},
    {name: 'app2', path: '/app2', component: app2},
    {path: '*', redirect: '/app1'}
  ]
})
