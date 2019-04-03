<template>
    <div v-bind:id="postData._id" class="border rounded p-4 col-12 my-2 blog-content-column">
      <div class="p-4 text-center w-100 blog-content-wrapper" v-bind:style="postData.backgroundImage ? {'background-image': 'url('+ postData.backgroundImage +')'} : {}">
        <div style="background: rgba(255, 255, 255, 0.7)" class="blog-content">
          <h3>{{postData.title}}</h3>
          <h5 class="text-right">{{new Date(postData.dt).toLocaleString()}}</h5>
          <p class="blog-content-text" v-html="postData.content"></p>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Post from '../interface/Post'
@Component({
  props: ['post']
})

export default class Thumbnail extends Vue {
  name: string = 'Post'
  postData : Post|null = null
  created () {
    this.postData = this.$props['post']
  }
}
</script>

<style scoped>
  p.blog-content-text {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
    text-align: justify;
  }
  div.blog-content-column{
    height: 80vh;
    overflow-y: auto;
  }
  div.blog-content {
    height: 100%;
    min-height: 100%;
  }
  div.blog-content-wrapper {
    background-repeat : no-repeat;
    background-size: contain;
    background-position: center;
  }
  div.blog-content-wrapper::after {
    opacity: 0.5;
  }
</style>
