import { fromJS } from 'immutable'

import { createReducer } from 'utils/redux'

import {
  POST_LOAD_BY_SLUG_REQUEST
} from 'actions/posts'

export const initialState = fromJS({
  hasPostLoaded: false,
  nextPost: null,
  previousPost: null,
  currentPost: null
})

export default createReducer(initialState, {
  [POST_LOAD_BY_SLUG_REQUEST.SUCCESS]: (state, { payload }) => {
    return state
      .set('hasPostLoaded', true)
      .set('nextPost', payload.nextPost)
      .set('previousPost', payload.previousPost)
  }
})
