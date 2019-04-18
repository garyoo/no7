<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">로그인</h5>
            <div id="firebase-login"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebaseui/dist/firebaseui.css'
export default Vue.extend({
  name: 'Index',
  data () {
    return {
      isLoginProc: false
    }
  },
  mounted (): void {
    const config = {
      signInSuccessUrl: './LoginSuccess',
      tosUrl: './Blog',
      privacyPolicyUrl: () => {
        window.location.assign('./Blog')
      },
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
          customParameters: {
            prompt: 'select_account'
          }
        },
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          scopes: [
            'public_profile',
            'email',
            'user_likes',
            'user_friends'
          ]
        },
        {
          provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          scopes: [
            'public_profile',
            'email',
            'user_likes',
            'user_friends'
          ]
        }
      ]
    }
    if (this.$firebaseUI.isPendingRedirect()) {
      //  this.$firebaseAuth.reset()
    }
    this.$firebaseUI.start('#firebase-login', config)
  },
  methods: {
  }
})
</script>

<style scoped>

</style>
