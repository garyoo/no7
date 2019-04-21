export default interface PostComment {
  _id?: string,
  documentID: string,
  uid: string,
  title: string,
  author: string,
  content: string,
  dt: number
}
