
<template>
  <div>
    <TopNav></TopNav>
    <div>음.</div>
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
  created () {
    console.log(1)
  }
}
</script>

<style scoped>

</style>
