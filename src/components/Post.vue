<template>
    <div v-bind:id="postData._id" class="border rounded p-4 col-12 my-2 blog-content-column">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="p-4 text-center w-100 blog-content-wrapper" v-bind:style="postData.backgroundImage ? {'background-image': 'url('+ postData.backgroundImage +')'} : {}">
              <div style="background: rgba(255, 255, 255, 0.7)" class="blog-content">
                <h3>{{postData.title}}</h3>
                <h5 class="text-right">{{new Date(postData.dt).toLocaleString()}}</h5>
                <p class="blog-content-text" v-html="postData.content"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12" v-for="(comment, idx) in postData.comments" v-bind:key="idx">
            <div class="border rounded my-3 p-4">
              <small class="float-right">{{comment.dt ? new Date(comment.dt).toLocaleString() : ''}}</small>
              <div class="text-left">
                <p>{{comment.title}}</p>
              </div>
              <div class="text-left">
                <small class="font-weight-bold">{{comment.author}}</small>
              </div>
              <div class="text-left">
                <small class="blog-content-comment">
                  {{comment.content}}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <hr/>
          </div>
        </div>
        <div class="row"  v-if="$store.state.isAuth">
          <div class="col-12">
            <form>
              <div class="form-group row">
                <div class="col-12">
                  <b-form-input v-model="comment.title" placeholder="제목" type="text"></b-form-input>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12 col-sm-6 mt-2">
                  <b-form-input v-model="comment.author" placeholder="이름" type="text"></b-form-input>
                </div>
                <div class="col-12 col-sm-6 mt-2">
                  <b-form-input v-model="comment.password" placeholder="password" type="password" autocomplete></b-form-input>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12 mt-2">
                  <b-form-textarea
                    v-model="comment.content"
                    placeholder="댓글"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12 mt-2">
                  <b-button block variant="danger" v-bind:disabled="!commentValid || commentSaving" v-on:click="saveComment">{{commentSaving ? '저장 중' : '저장'}}</b-button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-12">
            <h5>로그인을 하시면 댓글을 달 수 있어요</h5>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Post from '../interface/Post'
import PostComment from '../interface/PostComment'

@Component({
  props: ['post']
})

export default class PostCommentCls extends Vue {
  name: string = 'Post'
  postData: Post | null = null
  comment: PostComment | null = null
  commentValid: boolean = false
  commentSaving: boolean = false

  created () {
    console.log(this.$store.state.isAuth)
    this.postData = this.$props['post']
    if (this.postData) {
      let _postComment: PostComment = {
        documentID: this.postData.documentID,
        author: '',
        password: '',
        title: '',
        content: '',
        dt: 0
      }
      this.comment = _postComment
    }
  }

  clearComment (): void {
    if (this.comment) {
      this.comment.author = ''
      this.comment.password = ''
      this.comment.title = ''
      this.comment.content = ''
      this.comment.dt = 0
    }
  }

  saveComment (): void {
    if (this.comment) {
      this.comment.dt = new Date().valueOf()
      this.commentSaving = true
      this.$store.dispatch('setComment', this.comment).then(res => {

      }).catch(err => {
        console.log(err)
      }).then(res => {
        this.commentSaving = false
        this.getComment()
        this.clearComment()
      })
    }
  }

  getComment (): void {
    this.$store.dispatch('getComment', this.comment).then(res => {
      if (this.postData) this.postData.comments = res
    })
  }

  @Watch('comment', { immediate: false, deep: true })
  validComment (val: PostComment): void {
    if (val.password.length > 3 && val.content.length && val.author.length) {
      this.commentValid = true
    } else {
      this.commentValid = false
    }
  }
}
</script>

<style scoped>
  p.blog-content-text, .blog-content-comment {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
    text-align: justify;
  }
  div.blog-content-column{
    min-height: calc(100vh - 60px);
  }
  div.blog-content {
    height: 100%;
    min-height: 100%;
  }
  div.blog-content-wrapper {
    background-repeat : no-repeat;
    background-size: 100px 100px;
    background-position: center;
  }
  div.blog-content-wrapper::after {
    opacity: 0.5;
  }
</style>