import { Record } from 'immutable'
import { createReducer } from 'utils/redux'
import { SET_FONTS_LOADED, SET_PAGE_LOADED } from 'actions/app'

const initialState = Record({
  hasFontsLoaded: false,
  hasPageLoaded: false
})

export default createReducer(initialState, {
  [SET_FONTS_LOADED]: (state, action) => {
    return state.set('hasFontsLoaded', action.payload)
  },
  [SET_PAGE_LOADED]: (state, action) => {
    return state.set('hasPageLoaded', action.payload)
  }
})
