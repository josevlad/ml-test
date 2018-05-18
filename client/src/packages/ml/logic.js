import { createLogic } from 'redux-logic'
import * as actions from './actions'
import { LOCATION_CHANGE } from 'react-router-redux'
import qs from 'qs'

// https://github.com/jeffbski/redux-logic


//const API_URL = 'http://localhost:8080/api/'
const API_URL = '/api/'


const searchFetchLogic = createLogic({
    // declarative built-in functionality wraps your code
    type: actions.SEARCH_FETCH, // only apply this logic to this type
    cancelType: actions.SEARCH_FETCH_CANCEL, // cancel on this type
    latest: true, // only take latest

    // your code here, hook into one or more of these execution
    // phases: validate, transform, and/or process
    process({ getState, action }, dispatch, done) {
        
        fetch(`${API_URL}items?q=${action.terms}&limit=20&offset=0&full`)
            .then(resp => {
                const data = resp.json()
                return data
            })
            .then(data => {
                dispatch(actions.searchFetchComplete(data))
                dispatch(actions.breadcrumChange(data.categories))
            })
            .catch(err => {
                console.error(err); // log since could be render err
                dispatch(actions.searchFetchComplete(err, true))
            })
            .then(() => done()) // call done when finished dispatching
    }
})

const locationLogic = createLogic({
    type: LOCATION_CHANGE,
    cancelType: 'LOCATION_CHANGE_CANCEL',
    latest: true,
    process({ getState, action }, dispatch, done) {
        // SE DISPARA EN CADA CAMBIO DE URL
        // ACÁ ES IDEAL PARA VALIDAR PERMISOS DE USUARIO POR EJ
        const location = getState().router.location
        const params = qs.parse(location.search.slice(1))
        if (params.search !== '' && location.pathname === '/items'){
            dispatch(actions.searchTermsChange(params.search))
            dispatch(actions.searchFetch(params.search))
        }
        else {
            dispatch(actions.searchReset())
            dispatch(actions.breadcrumChange(false))
        }
        done()
    }
})

const detailFetchLogic = createLogic({
    type: actions.DETAIL_FETCH, // only apply this logic to this type
    cancelType: actions.DETAIL_FETCH_CANCEL, // cancel on this type
    latest: true, // only take latest
    process({ getState, action }, dispatch, done) {
        
        fetch(`${API_URL}items/${action.id}`)
            .then(resp => {
                const data = resp.json()
                return data
            })
            .then(data => {
                dispatch(actions.detailFetchComplete(data))
                dispatch(actions.breadcrumChange(data.item.categories))
            })
            .catch(err => {
                console.error(err); // log since could be render err
                dispatch(actions.searchFetchComplete(err, true))
            })
            .then(() => done()) // call done when finished dispatching
    }
})


export default [
    searchFetchLogic,
    detailFetchLogic,
    locationLogic
]