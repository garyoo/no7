import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
declare module 'vue/types/vue' {
  interface Vue {
    $firebase: firebase.app.App,
    $firebaseAuth: firebaseui.auth.AuthUI
  }
}
