import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'

import {
  POSTS_LOAD_REQUEST,
  POST_LOAD_BY_SLUG_REQUEST,
  CATEGORIES_LOAD_REQUEST,
  MEDIA_LOAD_REQUEST
} from 'actions/posts'

export const initialState = fromJS({
  posts: {},
  pages: {},
  categories: {},
  media: {}
})

const mergeEntities = (state, { payload }) => {
  return state.withMutations(state =>
    Object.keys(payload.entities).reduce(
      (_state, entity) => _state.mergeDeepIn([entity], payload.entities[entity]),
      state
    )
  )
}

export default createReducer(initialState, {
  [POSTS_LOAD_REQUEST.SUCCESS]: (state, action) => {
    return mergeEntities(state, {
      payload: action.payload.posts
    })
  },
  [POST_LOAD_BY_SLUG_REQUEST.SUCCESS]: mergeEntities,
  [CATEGORIES_LOAD_REQUEST.SUCCESS]: mergeEntities,
  [MEDIA_LOAD_REQUEST.SUCCESS]: mergeEntities
})
