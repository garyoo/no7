import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
//  ROUTERS
import Index from '../pages/Index.vue'
import TinderImages from '../pages/TinderImages/Index.vue'
import Blog from '../pages/Blog/index.vue'
import BlogWrite from '../pages/Blog/write.vue'
import Login from '../pages/Login/Index.vue'
import LoginSuccess from '../pages/Login/LoginSuccess.vue'
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
    },
    {
      path: '/Blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/Blog/write',
      name: 'BlogWrite',
      component: BlogWrite
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/LoginSuccess',
      name: 'LoginSuccess',
      component: LoginSuccess,
      meta: {
        requiresAuth: true
      },
      beforeEnter: (from, to, next) => {
        if (from.meta.requiresAuth && !store.getters.user) {
          return next('/Login')
        }
        return next()
      }
    }
  ]
})
