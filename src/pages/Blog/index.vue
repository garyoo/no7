
<template>
  <div>
    <TopNav></TopNav>
    <div id="blog-containers" class="container mt-4">
      <PostComponent v-for="(post, index) in posts" :post="post" v-bind:key="index" data-aos="fade-up" data-aos-duration-="2000"></PostComponent>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import TopNav from '../../components/Nav.vue'
import PostComponent from '../../components/Post.vue'
import Component from 'vue-class-component'

interface Post {
  _id: string,
  title: string,
  subTitle: string,
  categories: Array<string>,
  dt: number,
  content: string
}

@Component({
  components: {
    TopNav, PostComponent
  }
})

export default class Blog extends Vue {
  backgroundImageLoad : boolean = false;
  backgroundImageIndex: number = 0;
  backgroundImages: string[] = [
    'https://www.phnompenhpost.com/sites/default/files/styles/image_780x440/public/field/image/ronaldo_0.jpg?itok=BH5TGwq0',
    'https://tribune.net.ph/wp-content/uploads/2018/11/RONALDO-696x464.jpg'
  ];
  backgroundImage: string = 'https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif';
  posts: Array<Post> = [];
  created () {

  }

  mounted () {
    /*
    setInterval(() => {
      this.backgroundChange = false
      if (this.backgroundImageIndex > this.backgroundImages.length - 1) this.backgroundImageIndex = 0
      this.backgroundImage = this.backgroundImages[this.backgroundImageIndex]
      this.backgroundImageIndex += 1
      this.backgroundChange = true
    }, 2000)
    */
    // this.loadImage()
    this.loadPost()
  }

  loadImage () {
    this.backgroundImageLoad = false
    this.backgroundImage = 'https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif'
    if (this.backgroundImageIndex > this.backgroundImages.length - 1) this.backgroundImageIndex = 0
    let image = new Image()
    image.onload = (evt) => {
      this.backgroundImage = this.backgroundImages[this.backgroundImageIndex]
      this.backgroundImageIndex += 1
      this.backgroundImageLoad = true
      setTimeout(() => {
        this.loadImage()
      }, 5000)
    }
    image.src = this.backgroundImages[this.backgroundImageIndex]
  }
  loadPost () {
    let data : Post = {
      _id: '00001',
      title: 'Chrome 73에서 Node Inspect 오류',
      'subTitle': '',
      'categories': ['chrome', 'browser', 'node', 'debug', 'inspect'],
      dt: 1554266291659,
      content: `
        Chrome 73 에서 Node.js inspect가 안되는 버그가 발생하였습니다.
        Chromium 커뮤니티에 공유 되어 4월 3일자로 revise 되었네요.
        https://bugs.chromium.org/p/chromium/issues/detail?id=941608&q=nodeJS
        `
    }
    this.posts.push(data)
  }
}
</script>
<style scoped>

</style>
