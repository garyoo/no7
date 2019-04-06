
import Vue from 'vue'
import 'es6-promise/auto'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import AOS from 'aos'
import 'aos/dist/aos.css'

import {firebaseApp} from './firebase/firebaseApp'
import {firebaseUI} from './firebase/firebaseUI'
import store from './store'

// INTERFACE
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

Vue.prototype.$firebase = firebaseApp
Vue.prototype.$firebaseUI = firebaseUI
firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('setUser', user)
    /*
    state.user = user
    console.log(firebaseApp.auth().currentUser)
    */
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  created (): void {
    AOS.init()
  },
  store,
  router,
  components: { App },
  template: '<App/>'
})
