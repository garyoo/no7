<template>
  <div>
    <div class="thumb-nail-wrapper" v-for="(item, idx) in items" v-bind:key="idx" v-on:mouseover="hover(item)" v-on:click="popModal(item)">
      <div class="thumb-nail-name">
        <span style="font-weight: bold;">{{item.name}}, {{item.age|| '?'}}</span>
      </div>
      <div class="thumb-nail" v-bind:style="{ 'background-image': 'url('+ item.url +')'}">
      </div>
    </div>
    <div v-if="showModal" class="modal" v-on:click="closeModal">
      <div v-if="currentItem" style="width:100%;height:100%;">
        <div v-for="(item, idx) in currentItem.existsValue" v-bind:key="idx" class="modal-thumb">
          <div class="thumb-nail" v-bind:style="{ 'background-image': 'url('+ item.url +')'}">
          </div>
          <div style="background-color:rgba(255,255,255, 0.5);height:30%;font-size:1.2rem;font-weight:bold;padding: 2rem;">{{item.desc ? item.desc : 'No Description'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import 'es6-promise/auto'
import http from 'axios'

interface TinderObject {
  _id: string,
  url: string,
  age: number,
  dt: number,
  name: string,
  desc: string,
  existsValue: Array<TinderObject>
}
@Component
export default class TinderImages extends Vue {
  name: string = 'TinderImages'
  items: Array<TinderObject> = []
  currentItem : TinderObject | null = null
  showModal: boolean = false

  hover (item: TinderObject): void {
    console.log(item.existsValue)
    if (item.existsValue) {
      item.url = item.existsValue[0].url
    }
  }
  created (): void {
    let result = http.post('https://api2.surveypp.com/api/getTinderImage')
    result.then(res => {
      if (res.status === 200 && res.data) {
        if (res.data['images']) {
          let data: Array<TinderObject> = res.data['images']
          for (let item of data) {
            let image = new Image()
            image.src = item.url
            image.onload = () => {
              this.items.push(item)
            }
            image.onerror = () => {
            }
          }
        }
      }
    })
  }
  popModal (item: TinderObject): void {
    this.currentItem = item
    this.showModal = !this.showModal
    document.body.style.overflowY = this.showModal ? 'hidden' : 'auto'
  }
  closeModal (): void {
    this.currentItem = null
    this.showModal = !this.showModal
    document.body.style.overflowY = this.showModal ? 'hidden' : 'auto'
  }

  @Watch('showModal')
  modalTF(val: boolean) {

  }

  @Watch('currentItem')
  onChanged(val: TinderObject) {
    console.log(val)
  }


}
</script>

<style scoped>
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
