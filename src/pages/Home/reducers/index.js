import { fromJS } from 'immutable'
import { createReducer } from 'utils/redux'

import {
  POSTS_LOAD_REQUEST
} from 'actions/posts'

export const initialState = fromJS({
  nextPage: 1,
  totalPages: null,
  hasMore: true,
  hasInitiallyLoaded: false
})

export default createReducer(initialState, {
  [POSTS_LOAD_REQUEST.SUCCESS]: (state, { payload }) => {
    const newNextPage = state.get('nextPage') + 1
    const totalPages = payload.totalPages
    const hasMore = (newNextPage <= totalPages)

    return state
      .set('nextPage', newNextPage)
      .set('totalPages', totalPages)
      .set('hasInitiallyLoaded', true)
      .set('hasMore', hasMore)
  }
})
