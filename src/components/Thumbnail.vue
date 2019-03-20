<template>
  <div class="border rounded position-relative h-100 w-100">
    <div class="thumb-nail-name border d-none d-sm-block">
      <span style="font-weight: bold;">{{item.name}}, {{item.age|| '?'}} 사진 {{item.info.length}}장</span>
    </div>
    <div v-if="item.info[0].video === true">
      <video width="100%" autoplay loop controls>
        <source v-bind:src="item.info[0].url" type="video/mp4">
        {{item.desc}}
      </video>
    </div>
    <div v-else class="thumb-nail w-100 h-100 bg-dark" v-bind:style="{ 'background-image': 'url('+ item.info[0].url +')'}"></div>
  </div>
</template>

<script language="ts">
export default {
  name: 'Thumbnail.vue',
  props: ['item']
}
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
