<template>
    <div v-if="userName.length">
      <h1>{{userName}}(으)로 로그인 성공!</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LoginSuccess',
  data () {
    return {
      userName: '',
      userEmail: ''
    }
  },
  created (): void {
    this.$firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName)
        if (user.displayName) this.userName = user.displayName
      }
    })
  }
})
</script>

<style scoped>

</style>
