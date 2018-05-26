import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

const POSTS_LOAD = '@posts/POSTS_LOAD'
const POST_LOAD_BY_SLUG = '@posts/POST_LOAD_BY_SLUG'

export const POSTS_LOAD_REQUEST = createRequestTypes('@posts/POSTS_LOAD_REQUEST')
export const POST_LOAD_BY_SLUG_REQUEST = createRequestTypes('@posts/POST_LOAD_BY_SLUG_REQUEST')

export const constants = {
  POSTS_LOAD,
  POSTS_LOAD_REQUEST,
  POST_LOAD_BY_SLUG,
  POST_LOAD_BY_SLUG_REQUEST
}

export const postsLoad = createAction(POSTS_LOAD)
export const postsLoadRequest = createRequestAction(POSTS_LOAD_REQUEST)
export const postLoadBySlug = createAction(POST_LOAD_BY_SLUG)
export const postLoadBySlugRequest = createRequestAction(POST_LOAD_BY_SLUG_REQUEST)

export default {
  postsLoad,
  postsLoadRequest,
  postLoadBySlug,
  postLoadBySlugRequest
}
