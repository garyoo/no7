import Vue from 'vue'
import Router from 'vue-router'
//  ROUTERS
import Index from '@/components/Index.vue'
import TinderImages from '@/components/TinderImages.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/TinderImages',
      name: 'TinderImages',
      component: TinderImages
    }
  ]
})
