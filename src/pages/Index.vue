<template>
  <div class="index-bg">
    <h1>{{title}}</h1>
    <section>
      <figure data-aos="fade-right">
        <router-link to="/Blog">
          <img class="image" src="https://kr.vuejs.org/images/logo.png"/>
        </router-link>
        <figcaption>본 웹페이지는 Vue.js + Typescript로 만들었습니다</figcaption>
      </figure>
      <figure data-aos="fade-left" class="d-none">
        <img class="image" src="https://static.thinkster.io/topics/ts.png"/>
        <figcaption>Typescript</figcaption>
      </figure>
    </section>
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
  section {
    height: 90vh;
    margin-top: 1.5rem;
  }
  section > figure {
    height: 100%;
    width: 100%;
    text-align: center;
  }
  img.image {
    max-width: 100%;
    max-height: 100%;
  }
  img.grayscale{
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }
  div.index-bg {
    height: 100vh;
    width: 100vw;
    /*
    background-image: url('https://miro.medium.com/max/836/1*JdIjLO1YlxkjAeQ8zAEcrg.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top center;
    */
    max-width: 783px;
    text-align: center;
    margin: auto;
  }
</style>
