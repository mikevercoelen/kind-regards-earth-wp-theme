import { schema } from 'normalizr'

export const media = new schema.Entity('media')
export const category = new schema.Entity('categories')

export const post = new schema.Entity('posts', {
  categories: [category],
  featured_media: media
})
