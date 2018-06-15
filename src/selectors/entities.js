import { createSelector } from 'reselect'
import schemas from 'schemas'
import { denormalize } from 'normalizr'
import { Map } from 'immutable'

export const getEntities = state => {
  return state.entities
}

export const getPostsEntities = state => {
  return state.entities.get('posts')
}

export const getPagesEntities = state => {
  return state.entities.get('pages')
}

export const getPosts = createSelector(
  [getPostsEntities, getEntities],
  (posts, entities) => {
    // We filter these, because our preload can contain private posts
    const nonPrivatePosts = posts.filter(p => p.get('status') !== 'private')

    return denormalize(
      nonPrivatePosts,
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

export const getPageBySlug = slug => createSelector(
  [getPagesEntities, getEntities],
  (pages, entities) => {
    const page = pages.find(page => page.get('slug') === slug)

    if (!page) {
      return Map()
    }

    return denormalize(
      page,
      schemas.page,
      entities
    )
  }
)

export const getPostsSortedByDate = createSelector(
  getPosts,
  posts => posts.sort((a, b) => new Date(b.get('date')) - new Date(a.get('date')))
)

export const getLatestPost = createSelector(
  getPostsSortedByDate,
  posts => posts.first()
)
