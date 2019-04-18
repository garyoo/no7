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
      userId: '',
      userName: '',
      userEmail: ''
    }
  },
  created (): void {
    this.userName = this.$store.state.user.displayName
  }
})
</script>

<style scoped>

</style>
