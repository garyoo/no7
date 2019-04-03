export default interface Post {
  _id: string,
  title: string,
  subTitle: string,
  categories: Array<string>,
  dt: number,
  content: string,
  backgroundImage? : string
}
