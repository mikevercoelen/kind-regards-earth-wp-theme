import { createReducer } from 'utils/redux'
import { SET_PAGE } from 'actions/home'

const initialState = {
  page: 1
}

export default createReducer(initialState, {
  [SET_PAGE]: (state, { payload: page }) => ({
    ...state,
    page
  })
})
