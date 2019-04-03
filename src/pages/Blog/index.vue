
<template>
  <div>
    <TopNav></TopNav>
    <h1 class="text-left mt-4 ml-4">멍멍(이것 저것)</h1>
    <div id="blog-containers" class="container mt-4" v-if="postLoading">
      <div class="row">
        <PostComponent v-for="(post, index) in posts" :post="post" v-bind:key="index" data-aos="fade-up" v-bind:data-aos-duration="(index+1)*1000"></PostComponent>
      </div>

    </div>
    <div class="container mt-4" v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import TopNav from '../../components/Nav.vue'
import PostComponent from '../../components/Post.vue'
import Component from 'vue-class-component'
import Post from '../../interface/Post'

@Component({
  components: {
    TopNav, PostComponent
  }
})

export default class Blog extends Vue {
  postLoading : boolean = false;
  posts: Array<Post> = [];
  created () {

  }

  mounted () {
    this.loadPost()
  }
  loadPost () {
    this.axios.post('https://api2.surveypp.com/api/getBlogContents', {}).then(res => {
      if (res.status === 200) {
        this.posts = res.data
        this.postLoading = true
      }
    });
  }
}
</script>
<style scoped>

</style>
