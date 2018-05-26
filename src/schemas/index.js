import { schema } from 'normalizr'

const post = new schema.Entity('posts')

post.define({
  next: post,
  previous: post
})

export default {
  post
}
