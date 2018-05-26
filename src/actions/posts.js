import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

const POSTS_LOAD = '@posts/POSTS_LOAD'
const POST_LOAD_BY_SLUG = '@posts/POST_LOAD_BY_SLUG'
const POST_LOAD_BY_ID = '@posts/POST_LOAD_BY_ID'
const CATEGORIES_LOAD = '@posts/CATEGORIES_LOAD'
const MEDIA_LOAD = '@posts MEDIA_LOAD'

export const POSTS_LOAD_REQUEST = createRequestTypes('@posts/POSTS_LOAD_REQUEST')
export const POST_LOAD_BY_SLUG_REQUEST = createRequestTypes('@posts/POST_LOAD_BY_SLUG_REQUEST')
export const POST_LOAD_BY_ID_REQUEST = createRequestTypes('@posts/POST_LOAD_BY_ID_REQUEST')
export const CATEGORIES_LOAD_REQUEST = createRequestTypes('@posts/CATEGORIES_LOAD_REQUEST')
export const MEDIA_LOAD_REQUEST = createRequestTypes('@posts/MEDIA_LOAD_REQUEST')

export const constants = {
  POSTS_LOAD,
  POST_LOAD_BY_SLUG,
  POST_LOAD_BY_ID,
  POST_LOAD_BY_ID_REQUEST,
  CATEGORIES_LOAD,
  MEDIA_LOAD,
  POSTS_LOAD_REQUEST,
  POST_LOAD_BY_SLUG_REQUEST,
  CATEGORIES_LOAD_REQUEST,
  MEDIA_LOAD_REQUEST
}

export const postsLoad = createAction(POSTS_LOAD)
export const postLoadBySlug = createAction(POST_LOAD_BY_SLUG)
export const postLoadById = createAction(POST_LOAD_BY_ID)
export const categoriesLoad = createAction(CATEGORIES_LOAD)
export const mediaLoad = createAction(MEDIA_LOAD)
export const postsLoadRequest = createRequestAction(POSTS_LOAD_REQUEST)
export const postLoadByIdRequest = createRequestAction(POST_LOAD_BY_ID_REQUEST)
export const postLoadBySlugRequest = createRequestAction(POST_LOAD_BY_SLUG_REQUEST)
export const categoriesLoadRequest = createRequestAction(CATEGORIES_LOAD_REQUEST)
export const mediaLoadRequest = createRequestAction(MEDIA_LOAD_REQUEST)

export default {
  postsLoad,
  postsLoadRequest,
  postLoadBySlug,
  postLoadBySlugRequest,
  categoriesLoad,
  categoriesLoadRequest,
  mediaLoad,
  mediaLoadRequest,
  postLoadById,
  postLoadByIdRequest
}
