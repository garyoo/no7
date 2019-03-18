<template>
  <div class="index-bg"><h1>Vue.js + Typescript</h1></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'index'
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
