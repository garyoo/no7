import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
declare module 'vue/types/vue' {
  interface Vue {
    $firebase: firebase.app.App,
    $firebaseUI: firebaseui.auth.AuthUI
  }
}
