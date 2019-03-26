<template>
  <div class="container-fluid bg-light">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 thumb-nail-wrapper p-3" v-for="(item, idx) in items" v-bind:key="idx" v-on:mouseover="hover(item)" v-on:click="popModal(item)" v-bind:data-aos="idx % 4 === 0 ? `fade-left` : idx % 4 === 1 ? `fade-up` : idx % 4 === 2 ? `fade-down` : `fade-right`">
        <Thumbnail :item="item"></Thumbnail>
      </div>
    </div>
    <div v-if="showModal" class="image-modal">
      <button  v-on:click="closeModal($event)" class="close">X</button>
      <div v-if="currentStore.item" style="width:100%;height:100%;">
        <div style="position:absolute;top:50%;left:50px;height:100%;">
          <a href="#prev" v-if="this.currentStore.index>0" class="image-nav prev" v-on:click="imageNav(-1)">이전</a>
        </div>
        <div class="modal-thumb" v-if="currentStore.item.info[currentStore.index]">
          <div class="thumb-nail" v-bind:style="{ 'background-image': 'url('+ currentStore.item.info[this.currentStore.index].url +')'}"></div>
          <div style="background-color:rgba(255,255,255, 0.5);height:30%;font-size:1.2rem;font-weight:bold;padding: 2rem;">{{currentStore.item.info[currentItemIndex].desc ? currentStore.item.info[this.currentStore.index].desc : 'No Description'}}</div>
        </div>
        <div style="position:absolute;top:50%;right:50px;height:100%;">
          <a href="#next" v-if="this.currentStore.index<currentStore.item.info.length-1" class="image-nav next" v-on:click="imageNav(1)">이후</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import 'es6-promise/auto'
import http from 'axios'
import Thumbnail from '@/components/Thumbnail.vue'

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
  components: {
    Thumbnail
  }
})
export default class TinderImages extends Vue {
  name: string = 'Index.vue';
  items: Array<TinderProfile> = [];
  currentStore: {item: TinderProfile|null, index: number, page: number} = {item: null, index: 0, page: 1};
  currentItem : TinderProfile | null = null;
  currentItemIndex: number = 0;
  showModal: boolean = false;
  imageNav (index: number) {
    this.currentStore.index += index
    this.currentItemIndex += index
  }
  hover (item: TinderProfile): void {
  }
  created (): void {
    this.load().then(res => {
      console.warn(`loaded`)
    })
  }
  async load (): Promise<void> {
    let res = await http.post('https://api2.surveypp.com/api/getTinderImage', {page: this.currentStore.page})
    if (res.status === 200 && res.data) {
      if (res.data['images']) {
        this.items = res.data['images']
      }
    }
  }

  popModal (item: TinderProfile): void {
    this.currentItem = item
    this.currentStore.item = item
    this.showModal = !this.showModal
    document.body.style.overflowY = this.showModal ? 'hidden' : 'auto'
  }
  closeModal (evt: Event): void {
    console.log(evt)
    this.currentItemIndex = 0
    this.currentStore.item = null
    this.showModal = !this.showModal
    document.body.style.overflowY = this.showModal ? 'hidden' : 'auto'
  }
  onScroll (evt: Event): void {
    console.log(evt)
  }

  @Watch('showModal')
  modalTF (val: boolean) {

  }

  @Watch('currentItem')
  onChanged (val: TinderProfile) {
    console.log(val)
  }
}

</script>

<style scoped>
  button.close {
    background-color: transparent;
    border: 0px;
    float: right;
    margin: 0px 5px 0px 0px;
    font-size: 3.5rem;
    color: #fff;
    cursor: pointer;
  }
  button.close:hover {
    color: brown;
  }

  a.image-nav.prev, a.image-nav.next{
    color: #fff;
    text-decoration: none;
  }

  div.thumb-nail-wrapper{
    height: 50vh;
  }
  div.thumb-nail-wrapper:hover{
    opacity: 0.5;
    cursor: pointer;
  }

  div.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
  }

  div.image-modal div.modal-thumb {
    height: 100%;
    margin: 0 auto;
  }

  div.modal-thumb > div.thumb-nail {
    height: 70%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: 0;
  }

</style>
