export const getHasMore = state => {
  return state.home.get('hasMore')
}

export const getNextPage = state => {
  return state.home.get('nextPage')
}

export const getHasInitiallyLoaded = state => {
  return state.home.get('hasInitiallyLoaded')
}
