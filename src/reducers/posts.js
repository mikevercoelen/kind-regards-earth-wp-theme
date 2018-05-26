import { createReducer } from 'utils/redux'
import {
  POSTS_LOAD_REQUEST,
  POST_LOAD_BY_SLUG_REQUEST,
  CATEGORIES_LOAD_REQUEST,
  MEDIA_LOAD_REQUEST
} from 'actions/posts'

export const initialState = {
  posts: [],
  categories: [],
  media: [],
  error: null,
  hasPostsLoaded: false,
  hasCategoriesLoaded: false,
  hasMediaLoaded: false,
  total: null,
  totalPages: null,
  nextPost: null,
  previousPost: null,
  currentPost: null
}

export default createReducer(initialState, {
  [POSTS_LOAD_REQUEST.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      hasPostsLoaded: true,
      posts: [
        ...state.posts,
        ...payload.posts
      ],
      totalPages: payload.totalPages,
      total: payload.total
    }
  },
  [POST_LOAD_BY_SLUG_REQUEST.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      hasPostsLoaded: true,
      posts: [
        ...state.posts,
        payload.post
      ],
      nextPost: payload.nextPost,
      nextPostError: payload.nextPostError,
      previousPost: payload.previousPost,
      previousPostError: payload.previousPostError
    }
  },
  [CATEGORIES_LOAD_REQUEST.SUCCESS]: (state, { payload: categories }) => {
    return {
      ...state,
      hasCategoriesLoaded: true,
      categories
    }
  },
  [MEDIA_LOAD_REQUEST.SUCCESS]: (state, { payload: media }) => {
    return {
      ...state,
      hasMediaLoaded: true,
      media
    }
  }
})
