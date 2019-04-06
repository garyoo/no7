import {firebaseApp} from './firebaseApp'
import * as firebaseui from 'firebaseui'
export const firebaseUI = new firebaseui.auth.AuthUI(firebaseApp.auth())
