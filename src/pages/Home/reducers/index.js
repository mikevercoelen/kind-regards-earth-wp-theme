import { fromJS } from 'immutable'
import { createReducer } from 'utils/redux'

import {
  POSTS_LOAD_REQUEST
} from 'actions/posts'

export const initialState = fromJS({
  currentPage: 1,
  totalPages: null,
  hasMore: true,
  hasInitiallyLoaded: false
})

export default createReducer(initialState, {
  [POSTS_LOAD_REQUEST.SUCCESS]: (state, { payload }) => {
    const newCurrentPage = state.get('currentPage') + 1
    const totalPages = payload.totalPages

    console.log('The total pages are: ' + totalPages)
    console.log('New current page: ' + newCurrentPage)

    return state
      .set('currentPage', newCurrentPage)
      .set('totalPages', totalPages)
      .set('hasInitiallyLoaded', true)
  }
})
