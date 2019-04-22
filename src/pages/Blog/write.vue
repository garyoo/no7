<template>
  <div>
    <TopNav></TopNav>
    <div id="editor-wrapper" class="container">
      <div class="row">
        <div class="col-12">
          <b-input v-model="postData.title" placeholder="제목"></b-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div id="toolbar"></div>
          <div id="editor" class="border shadow rounded"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-button variant="danger" block v-on:click="this.save" v-bind:disabled="isSaving">SAVE</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import TopNav from '../../components/Nav.vue'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Post from '../../interface/Post'

export default Vue.extend({
  components: {
    TopNav
  },
  data () {
    return {
      editor: Quill.prototype,
      postData: {} as Post,
      isSaving: false
    }
  },
  mounted (): void {
    let toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ];

    let options = {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: 'Compose an epic...',
      //readOnly: true,
      theme: 'snow'
    }
    this.editor = new Quill('#editor', options);
  },
  methods: {
    save: function (): void {
      let html = this.editor.root.innerHTML;
      this.postData._id = ''
      this.postData.content = html
      this.postData.categories = []
      this.postData.dt = new Date().valueOf()
      this.isSaving = true
      this.$store.dispatch('setPost', this.postData).then(res => {
        let id = res.id
        this.$router.replace({path: '/Blog', query: { documentID: id }})
      }).catch(err => {
        alert(err)
      }).then(res => {
        this.isSaving = false
      })
    }
  }
})
</script>

<style scoped>
  div#editor-wrapper{
    margin-top: 100px;
  }
  div#editor {
    height: 50vh;
    width: 100%;
  }
</style>
