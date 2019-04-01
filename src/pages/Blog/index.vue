
<template>
  <div>
    <TopNav></TopNav>
    <div id="main" class="image-div" v-bind:style="{'background-image': 'url('+ backgroundImage +')'}"></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import TopNav from '../../components/nav.vue'
import Component from 'vue-class-component'
@Component({
  components: {
    TopNav
  }
})
export default class Blog extends Vue {
  backgroundImageLoad : boolean = false
  backgroundImageIndex: number = 0
  backgroundImages: string[] = [
    'https://www.phnompenhpost.com/sites/default/files/styles/image_780x440/public/field/image/ronaldo_0.jpg?itok=BH5TGwq0',
    'https://tribune.net.ph/wp-content/uploads/2018/11/RONALDO-696x464.jpg',
  ];
  backgroundImage: string = 'https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif'
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
    this.loadImage()
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
}
</script>
<style scoped>
  div.image-div {
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: contain;
    transition: background-image 0.5s linear;
  }
</style>
