
import * as actions from './actions'


const reducer = (state = {
  breadcrum: false,
  search: {
    terms: '',
    data: false,
    isFetching: false,
    msg: ''
  },
  detail: {
    data: false,
    isFetching: false,
    msg: ''
  }
}, action) => {
  switch (action.type) {
    // BREADCRUM:
    case actions.BREADCRUM_CHANGE:
      return {
        ...state,
        breadcrum: action.payload
      }
    
    // SEARCH:
    case actions.SEARCH_FETCH:
      return {
        ...state,
        search: {
          ...state.search,
          isFetching: true
        }
      }
    case actions.SEARCH_FETCH_COMPLETE: 
      if (action.error){
        return {
          ...state,
          search: {
            ...state.search,
            data: false,
            isFetching: false,
            msg: action.error
          }
        }
      }
      else {
        return {
          ...state,
          search: {
            ...state.search,
            data: action.payload,
            isFetching: false,
            msg: state.search.msg
          }
        }
      }
    case actions.SEARCH_RESET:
      return {
        ...state,
        search: {
          ...state.search,
          data: false
        }
      }
    case actions.SEARCH_TERMS_CHANGE:
      return {
        ...state,
        search: {
          ...state.search,
          data: false,
          terms: action.terms
        }
      }

    // DETAIL:
    case actions.DETAIL_FETCH:
      return {
        ...state,
        detail: {
          ...state.detail,
          isFetching: true
        }
      }
    case actions.DETAIL_FETCH_COMPLETE: 
      if (action.error){
        return {
          ...state,
          detail: {
            ...state.detail,
            data: false,
            isFetching: false,
            msg: action.error
          }
        }
      }
      else {
        return {
          ...state,
          detail: {
            ...state.detail,
            data: action.payload,
            isFetching: false,
            msg: state.detail.msg
          }
        }
      }
      

    default:
      return state
  }
}

export default reducer
