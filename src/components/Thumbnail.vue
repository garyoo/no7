<template>
  <div class="border rounded position-relative h-100 w-100" v-if="doneTF">
    <div class="thumb-nail-name border d-none d-sm-block">
      <span style="font-weight: bold;">{{profile.name}}, {{profile.age|| '?'}} 사진 {{profile.info.length}}장</span>
    </div>
    <div v-if="profile.info[0].video === true">
      <video width="100%" autoplay loop controls>
        <source v-bind:src="profile.info[0].url" type="video/mp4">
        {{profile.desc}}
      </video>
    </div>
    <div v-else class="thumb-nail w-100 h-100 bg-dark" v-bind:style="{ 'background-image': 'url('+ coverUrl +')'}"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

interface TinderInfo {
  _id: string,
  url: string,
  protocol: string,
  host: string,
  dt: number,
  profile: string,
  key: string,
  fileName: string,
  video: boolean
}

interface TinderProfile {
  _id: string,
  name: string,
  age: number,
  profile: string,
  desc: string,
  dt: number,
  info: Array<TinderInfo>
}
@Component({
  props: ['item']
})
export default class Thumbnail extends Vue {
  profile: TinderProfile|null = null;
  name: string = 'Thumbnail.vue';
  coverUrl: string = '';
  doneTF: boolean = false;
  videoTF: boolean = false;
  mounted (): void {
    this.profile = this.$props['item']
    if (!this.profile) return
    if (this.profile.info[0]) {
      this.videoTF = this.profile.info[0].video||false
      let url: string = this.profile.info[0].url
      if (this.videoTF) {
        this.doneTF = true
      } else {
        let image = new Image()
        this.doneTF = true
        this.coverUrl = 'https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif'
        image.src = url
        image.onload = () => {
          this.coverUrl = url
        }
        image.onerror = () => {
          this.coverUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
        }
      }
    }
  }
}
/*
export default {
  name: 'Thumbnail.vue',
  props: ['item'],
  item: null as TinderProfile,
  created (): void {
  },
  mounted (): void {
    console.log(this.item)
  }
}
*/
</script>

<style scoped>
  div.thumb-nail {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  div.thumb-nail-name {
    text-align:right;
    position: absolute;
    top: 0;
    right: 0;
    background-color:rgba(255,255,255,0.5);
    padding: 0.5rem;
    border-radius: 5px;
  }
</style>
