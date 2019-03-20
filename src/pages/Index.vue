<template>
  <div class="index-bg">
    <h1>{{title}}</h1>
    <router-link to="/TinderImages">짜쓰</router-link>
    <h5>No.7</h5>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'index',
  data () {
    return {
      'title': '기술 블로그'
    }
  }
})
</script>

<style scoped>
  div.index-bg {
    height: 100vh;
    width: 100vw;
    background-image: url('https://miro.medium.com/max/836/1*JdIjLO1YlxkjAeQ8zAEcrg.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top center;
    max-width: 783px;
    text-align: center;
    margin: auto;
  }
</style>
