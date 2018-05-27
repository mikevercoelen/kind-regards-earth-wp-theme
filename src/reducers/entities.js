import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'

import {
  POSTS_LOAD_REQUEST,
  POST_LOAD_BY_SLUG_REQUEST
} from 'actions/posts'

import {
  SET_PRELOAD_DATA
} from '../actions/app'

export const initialState = fromJS({
  posts: {},
  pages: {}
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
  [SET_PRELOAD_DATA]: mergeEntities
})
