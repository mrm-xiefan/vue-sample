import Vue from 'vue'
import Router from 'vue-router'
import app1 from '@/components/app1'
import app2 from '@/components/app2'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: app1},
    {path: '/app2', component: app2},
    {path: '*', redirect: '/'}
  ]
})
