<template>
  <div>
    <TopNav></TopNav>
    <div>asd</div>
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
  created (): void {
    console.log(1)
  }
}
</script>

<style scoped>

</style>
