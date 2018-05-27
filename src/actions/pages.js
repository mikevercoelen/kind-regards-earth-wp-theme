import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

const PAGE_LOAD_BY_SLUG = '@pages/PAGE_LOAD_BY_SLUG'
export const PAGE_LOAD_BY_SLUG_REQUEST = createRequestTypes('@pages/PAGE_LOAD_BY_SLUG_REQUEST')

export const constants = {
  PAGE_LOAD_BY_SLUG,
  PAGE_LOAD_BY_SLUG_REQUEST
}

export const pageLoadBySlug = createAction(PAGE_LOAD_BY_SLUG)
export const pageLoadBySlugRequest = createRequestAction(PAGE_LOAD_BY_SLUG_REQUEST)

export default {
  pageLoadBySlug,
  pageLoadBySlugRequest
}
