<template>
  <div>
    <div class="thumb-nail-wrapper" v-for="(item, idx) in items" v-bind:key="idx" v-on:mouseover="hover(item)" v-on:click="popModal(item)">
      <div class="thumb-nail-name">
        <span style="font-weight: bold;">{{item.name}}, {{item.age|| '?'}} 사진 {{item.info.length}}장</span>
      </div>
      <div v-if="item.info[0].video === true">
        <video width="100%" autoplay loop controls>
          <source v-bind:src="item.info[0].url" type="video/mp4">
          {{item.desc}}
        </video>
      </div>
      <div v-else class="thumb-nail" v-bind:style="{ 'background-image': 'url('+ item.info[0].url +')'}">
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <button  v-on:click="closeModal($event)" class="close">X</button>
      <div v-if="currentItem" style="width:100%;height:100%;">
        <div style="position:absolute;top:50%;left:50px;height:100%;">
          <a href="#prev" v-if="currentItemIndex>0" class="image-nav prev" v-on:click="imageNav(-1)">이전</a>
        </div>
        <div class="modal-thumb" v-if="currentItem.info[currentItemIndex]">
          <div class="thumb-nail" v-bind:style="{ 'background-image': 'url('+ currentItem.info[currentItemIndex].url +')'}"></div>
          <div style="background-color:rgba(255,255,255, 0.5);height:30%;font-size:1.2rem;font-weight:bold;padding: 2rem;">{{currentItem.info[currentItemIndex].desc ? currentItem.info[currentItemIndex].desc : 'No Description'}}</div>
        </div>
        <div style="position:absolute;top:50%;right:50px;height:100%;">
          <a href="#next" v-if="currentItemIndex<currentItem.info.length-1" class="image-nav next" v-on:click="imageNav(1)">이후</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import 'es6-promise/auto'
import http from 'axios'

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

@Component
export default class TinderImages extends Vue {
  name: string = 'TinderImages';
  items: Array<TinderProfile> = [];
  currentItem : TinderProfile | null = null;
  currentItemIndex: number = 0;
  showModal: boolean = false;

  imageNav (index: number) {
    this.currentItemIndex += index
  }
  hover (item: TinderProfile): void {

  }
  created (): void {
    let result = http.post('https://api2.surveypp.com/api/getTinderImage')
    result.then(res => {
      if (res.status === 200 && res.data) {
        if (res.data['images']) {
          let data: Array<TinderProfile> = res.data['images']
          for (let item of data) {
            let url = item.info[0] ? item.info[0].url : ''
            if (item.info[0].video) {
              let req = new Request(url, {method: 'HEAD', mode: 'no-cors'})
              fetch(req).then(res => {
                console.log(res)
              }).then(res => {
                this.items.push(item)
              }).catch(err => {
                console.log(err)
              })
            } else {
              let image = new Image()
              image.src = url
              image.onload = () => {
                this.items.push(item)
              }
              image.onerror = () => {
              }
            }
          }
        }
      }
    })
  }
  popModal (item: TinderProfile): void {
    this.currentItem = item
    this.showModal = !this.showModal
    document.body.style.overflowY = this.showModal ? 'hidden' : 'auto'
  }
  closeModal (evt: Event): void {
    this.currentItemIndex = 0
    this.currentItem = null
    this.showModal = !this.showModal
    document.body.style.overflowY = this.showModal ? 'hidden' : 'auto'
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
  div.thumb-nail-name {
    text-align:right;
    position: absolute;
    top: 2em;
    right: 2em;
    background-color:rgba(255,255,255,0.5);
    padding: 0.5rem;
    border-radius: 5px;
  }

  div.thumb-nail-wrapper{
    position: relative;
    display: inline-block;
    width: 20vw;
    height: 20vw;
    padding: 1rem;
  }

  div.thumb-nail-wrapper:hover{
    opacity: 0.5;
    cursor: pointer;
  }

  div.thumb-nail {
    width: 100%;
    height: 80%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    border-radius: 15px;
    border: 1px solid #fff;
  }
  div.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
  }

  div.modal div.modal-thumb {
    height: 100%;
    margin: 0 auto;
  }

  div.modal-thumb > div.thumb-nail {
    height: 70%;
    background-size: contain;
    border: 0;
  }

</style>
