import { schema } from 'normalizr'

const post = new schema.Entity('posts')
const page = new schema.Entity('pages')

post.define({
  next: post,
  previous: post
})

export default {
  post,
  page
}
