<template>
  <div>
    <TopNav></TopNav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TopNav from '../../components/Nav.vue'
@Component({
  components: {
    TopNav
  }
})
export default class BlogWrite extends Vue {

}
</script>

<style scoped>

</style>
