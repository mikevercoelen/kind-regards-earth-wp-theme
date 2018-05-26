import { createSelector } from 'reselect'
import * as schemas from 'schemas'
import { denormalize } from 'normalizr'

export const getEntities = state => state.entities

export const getPostsEntities = state => {
  return state.entities.get('posts')
}

export const getCategories = state => {
  return state.entities.get('categories')
}

export const getMedia = state => {
  return state.entities.get('media')
}

export const getPostBySlug = slug => createSelector(
  getPostsEntities,
  posts => posts.find(post => post.get('slug') === slug)
)

export const getPostById = id => createSelector(
  getPostsEntities,
  posts => posts.find(post => post.get('id') === id)
)

export const getPosts = createSelector(
  [getPostsEntities, getEntities],
  (posts, entities) => {
    return denormalize(
      posts,
      [schemas.post],
      entities
    )
  }
)

export const getPostsSortedByDate = createSelector(
  getPosts,
  posts => posts.sort((a, b) => new Date(a.get('date')) - new Date(b.get('date')))
)

export const getLatestPost = createSelector(
  getPostsSortedByDate,
  posts => posts.first()
)
