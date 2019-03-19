<template>
  <div>
    <div class="thumb-nail-wrapper" v-for="(item, idx) in items" v-bind:key="idx" v-on:mouseover="hover(item)">
      <div class="thumb-nail-name">
        <span style="font-weight: bold;">{{item.name}}</span>
      </div>
      <div class="thumb-nail" v-bind:style="{ 'background-image': 'url('+ item.url +')'}">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
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
</style>
