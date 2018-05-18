import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
// import { createEpicMiddleware } from 'redux-observable'

// import { reducer as apiReducer, logic as apiLogic } from './packages/api' // POR CADA SERVICE

import { reducer as mlReducer, logic as mlLogic } from './packages/ml' // POR CADA SERVICE


// https://github.com/jeffbski/redux-logic
import { createLogicMiddleware } from 'redux-logic'
// import arrLogic from './logic';
const deps = { // optional injected dependencies for logic
  // anything you need to have available in your logic
  A_SECRET_KEY: 'dsfjsdkfjsdlfjls',
  otraCosa: 'lalalala'
}

const logicMiddleware = createLogicMiddleware(
  // POR CADA SERVICE
  [
    //...apiLogic,
    ...mlLogic
  ], 
  deps
)


// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history)

const middleware = [thunk, historyMiddleware, logicMiddleware]
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger())
}

export const store = createStore(
  combineReducers({
    // api: apiReducer,
    ml: mlReducer,
    router: routerReducer
  }),
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)


