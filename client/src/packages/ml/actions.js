// BREADCRUM:
export const BREADCRUM_CHANGE  = '@ml/breadcrum_change'

export const breadcrumChange = (payload) => ({
  type: BREADCRUM_CHANGE,
  payload
})

// SEARCH:
export const SEARCH_FETCH           = '@ml/search/fetch'
export const SEARCH_FETCH_CANCEL    = '@ml/search/fetch_cancel'
export const SEARCH_FETCH_COMPLETE  = '@ml/search/fetch_complete'
export const SEARCH_RESET           = '@ml/search/reset'
export const SEARCH_TERMS_CHANGE  = '@ml/search/terms_change'
export const SEARCH_SHOULD_REFRESH  = '@ml/search/should_refresh'
export const SEARCH_SHOULD_REFRESH_CANCEL  = '@ml/search/should_refresh_cancel'

export const searchTermsChange = (terms) => ({
  type: SEARCH_TERMS_CHANGE,
  terms
})

export const searchShouldRefresh = () => ({
  type: SEARCH_SHOULD_REFRESH
})

export const searchReset = () => ({
  type: SEARCH_RESET
})

export const searchFetch = (terms) => ({
  type: SEARCH_FETCH,
  terms
})

export const searchFetchComplete = (payload, error = false) => ({
  type: SEARCH_FETCH_COMPLETE,
  payload,
  error
})

export const searchFetchCancel = () => ({
  type: SEARCH_FETCH_CANCEL
})
//

// DETAIL:
export const DETAIL_FETCH           = '@ml/detail/fetch'
export const DETAIL_FETCH_CANCEL    = '@ml/detail/fetch_cancel'
export const DETAIL_FETCH_COMPLETE  = '@ml/detail/fetch_complete'

export const detailFetch = (id) => ({
  type: DETAIL_FETCH,
  id
})

export const detailFetchComplete = (payload, error = false) => ({
  type: DETAIL_FETCH_COMPLETE,
  payload,
  error
})

export const detailFetchCancel = () => ({
  type: DETAIL_FETCH_CANCEL
})
//







