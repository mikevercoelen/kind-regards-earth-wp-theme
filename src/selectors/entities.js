import { createSelector } from 'reselect'
import schemas from 'schemas'
import { denormalize } from 'normalizr'
import { Map } from 'immutable'

export const getEntities = state => state.entities

export const getPostsEntities = state => {
  return state.entities.get('posts')
}

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

export const getPostBySlug = slug => createSelector(
  [getPostsEntities, getEntities],
  (posts, entities) => {
    const post = posts.find(post => post.get('slug') === slug)

    if (!post) {
      return Map()
    }

    return denormalize(
      post,
      schemas.post,
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
