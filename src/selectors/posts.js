import { createSelector } from 'reselect'

export const getPosts = state => {
  return state.posts.posts
}

export const getCategories = state => {
  return state.posts.categories
}

export const getMedia = state => {
  return state.posts.media
}

export const getHasAllPostDataLoaded = state => {
  const { hasPostsLoaded, hasCategoriesLoaded, hasMediaLoaded } = state.posts
  return hasPostsLoaded && hasCategoriesLoaded && hasMediaLoaded
}

export const getHasPostsLoaded = state => {
  return state.posts.hasPostsLoaded
}

export const getTotalPages = state => {
  return state.posts.totalPages
}

export const getPostBySlug = slug => createSelector(
  getPosts,
  posts => posts.find(post => post.slug === slug)
)

export const getPostById = id => createSelector(
  getPosts,
  posts => posts.find(post => post.id === id)
)

export const getNextPost = state => state.posts.nextPost
export const getPreviousPost = state => state.posts.previousPost
