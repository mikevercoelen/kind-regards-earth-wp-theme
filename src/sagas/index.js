import { all } from 'redux-saga/effects'

export default function makeRootSaga () {
  return function * rootSaga () {
    const sagas = []
    yield all(sagas)
  }
}
