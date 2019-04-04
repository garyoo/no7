import PostComment from './PostComment'

export default interface Post {
  documentID: string,
  _id: string,
  title: string,
  subTitle: string,
  categories: Array<string>,
  dt: number,
  content: string,
  backgroundImage? : string,
  comments?: Array<PostComment>
}
