import { takeLatest, put, all, call } from 'redux-saga/effects'
import actions, { constants } from 'actions/posts'
import api from 'api/wp'
import { normalize } from 'normalizr'
import schemas from 'schemas'
import * as config from 'config'

export function * onPostsLoad ({ payload: { page } }) {
  yield put(actions.postsLoadRequest.start())

  try {
    const posts = yield call(api.getPosts, config.ARTICLES_PER_LOAD, page)
    const norm = yield call(normalize, posts, [schemas.post])

    yield put(actions.postsLoadRequest.success({
      posts: norm,
      totalPages: Number(posts._paging.totalPages)
    }))
  } catch (error) {
    yield put(actions.postsLoadRequest.error(error))
  }
}

export function * onPostLoadBySlug ({ payload: slug }) {
  yield put(actions.postLoadBySlugRequest.start())

  try {
    const response = yield call(api.getPostBySlug, slug)
    const post = response[0]

    const posts = [post]

    if (post.next) {
      posts.push(yield call(api.getPostById, post.next))
    }

    if (post.previous) {
      posts.push(yield call(api.getPostById, post.previous))
    }

    const norm = yield call(normalize, posts, [schemas.post])
    yield put(actions.postLoadBySlugRequest.success(norm))
  } catch (error) {
    yield put(actions.postLoadBySlugRequest.error(error))
  }
}

export default function * watchPosts () {
  yield all([
    takeLatest(constants.POSTS_LOAD, onPostsLoad),
    takeLatest(constants.POST_LOAD_BY_SLUG, onPostLoadBySlug)
  ])
}
