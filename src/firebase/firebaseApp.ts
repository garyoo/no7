import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConf from '../../info/firebase.conf'
export const fb = firebase
export const firebaseApp = fb.initializeApp(firebaseConf)
