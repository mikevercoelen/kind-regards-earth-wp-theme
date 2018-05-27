import { takeLatest, put, all, call } from 'redux-saga/effects'
import actions, { constants } from 'actions/pages'
import api from 'api/wp'
import { normalize } from 'normalizr'
import schemas from 'schemas'

export function * onPageLoadBySlug ({ payload: slug }) {
  yield put(actions.pageLoadBySlugRequest.start())

  try {
    const response = yield call(api.getPageBySlug, slug)
    const page = response[0]
    const norm = yield call(normalize, page, schemas.page)
    yield put(actions.pageLoadBySlugRequest.success(norm))
  } catch (error) {
    yield put(actions.pageLoadBySlugRequest.error(error))
  }
}

export default function * watchPosts () {
  yield all([
    takeLatest(constants.PAGE_LOAD_BY_SLUG, onPageLoadBySlug)
  ])
}
