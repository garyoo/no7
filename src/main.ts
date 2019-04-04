
import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConf from '../info/firebase.conf'

//INTERFACE
import Post from './interface/Post'
import PostComment from './interface/PostComment';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

firebase.initializeApp(firebaseConf)

const store = new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    posts (state, payload) {
      state.posts = payload
    }
  },
  getters: {
    posts: (state) => {
      return state.posts
    }
  },
  actions: {
    getPost: async ({commit}) => {
      return new Promise(async (resolve, reject) => {
        let snapshot = await firebase.firestore().collection('Posts').get()
        let docs = snapshot.docs.map(d => {
          return {documentID: d.id, ...d.data()}
        })
        commit('posts', docs)
        return resolve(docs)
      })
    },
    setComment: async ({commit}, payload: PostComment) => {
      return new Promise(async (resolve, reject) => {
        await firebase.firestore().collection('Posts').doc(payload.documentID).collection('comments').add(payload)
        //set({comments: [payload] }, {merge: true})
        return resolve()
      })


    }
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  created (): void {
    AOS.init()
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})
