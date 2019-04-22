<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#" to="/">HOME</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" to="/Blog">POSTS</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" disabled>Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#" v-if="$store.state.user">
              <b-img v-bind:src="$store.state.user.photoURL" rounded="circle" width="25"></b-img>
              <small>{{$store.state.user.displayName}}</small>
            </b-dropdown-item>
            <b-dropdown-item href="#" v-if="$store.state.isAuth" v-on:click="signOut">Sign Out</b-dropdown-item>
            <b-dropdown-item href="#" to="/Login" v-else >Sign In</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'nav',
  data () {
    return {
      user: null
    }
  },
  created (): void {
  },
  mounted (): void {
  },
  methods: {
    signOut () : void {
      this.$firebase.auth().signOut().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
</script>

<style scoped>

</style>
