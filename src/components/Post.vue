<template>
    <div v-bind:id="post._id">
      <h1>{{post.title}}</h1>
      <h5 class="text-right">{{new Date(post.dt).toLocaleString()}}</h5>
      <p class="blog-content">{{post.content}}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  props: ['post']
})

export default class Thumbnail extends Vue {
  name: string = 'Post'
}
</script>

<style scoped>
  p.blog-content {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
</style>
