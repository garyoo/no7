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
import NotFoundComponent from '../pages/404.vue'
Vue.use(Router);

const router = new Router({
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
      component: BlogWrite,
      meta: {
        requiresAuth: true
      }
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
      }
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(t=> t.meta.requiresAuth)) {
    if (!store.state.isAuth) {
      return next('/Login')
    }
  }
  return next()
});


export default router
