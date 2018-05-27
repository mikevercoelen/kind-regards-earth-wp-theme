import { createAction } from 'utils/redux'

export const SET_FONTS_LOADED = '@app/SET_FONTS_LOADED'
export const SET_PAGE_LOADED = '@app/SET_PAGE_LOADED'
export const SET_PRELOAD_DATA = '@app/SET_PRELOAD_DATA'

export const setFontsLoaded = createAction(SET_FONTS_LOADED)
export const setPageLoaded = createAction(SET_PAGE_LOADED)
export const setPreloadData = createAction(SET_PRELOAD_DATA)
