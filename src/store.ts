import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Post from './interface/Post'
import PostComment from './interface/PostComment'
import createPersistedState from 'vuex-persistedstate'
import {firebaseApp} from './firebase/firebaseApp'
Vue.use(Vuex)
/*

    this.$firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName)
        if (user.displayName) this.userName = user.displayName
      }
    })

*/
// Watching Auth
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    posts: [],
    isAuth: false,
    user: {
      displayName: '',
      email: '',
      photoURL: '',
      uid: ''
    }
  },
  mutations: {
    posts (state, payload) {
      state.posts = payload
    },
    comments (sate, payload) {
    },
    setUser (state, payload) {
      state.user = payload
    },
    setAuth (state, payload) {
      state.isAuth = payload
    },
    signOut (state, payload) {
      state.user = payload
    }
  },
  getters: {
    posts: (state) => {
      return state.posts
    },
    isAuth: (state) => {
      return state.isAuth
    },
    user: (state) => {
      return state.user
    }
  },
  actions: {
    getPost: async ({commit}: any) => {
      return new Promise(async (resolve, reject) => {
        let snapshot = await firebase.firestore().collection('Posts').get()
        let ids: Array<string> = []
        let docs: Array<Post> = snapshot.docs.map(d => {
          ids.push(d.id)
          return Object.assign({documentID: d.id, ...d.data()})
        })
        for (let id of ids) {
          let comment = await firebase.firestore().collection(`Posts/${id}/comments`).orderBy('dt', 'asc').get()
          let find = docs.find(d => d.documentID === id)
          if (find) {
            find.comments = Object.assign(comment.docs.map(d => d.data()))
          }
        }
        commit('posts', docs)
        return resolve(docs)
      })
    },
    getComment: async ({commit}: any, payload: Post) => {
      return new Promise(async (resolve, reject) => {
        let comment = await firebase.firestore().collection(`Posts/${payload.documentID}/comments`).orderBy('dt', 'asc').get()
        let rntData = comment.docs.map(d => d.data())
        commit('comments', rntData)
        return resolve(rntData)
      })
    },
    setComment: async ({commit}: any, payload: PostComment) => {
      return new Promise(async (resolve, reject) => {
        console.log(payload)
        await firebase.firestore().collection('Posts').doc(payload.documentID).collection('comments').add(payload)
        // set({comments: [payload] }, {merge: true})
        return resolve()
      })
    },
    getAuth: async ({commit}: any) => {
    }
  }
})
