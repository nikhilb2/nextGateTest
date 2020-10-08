import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import fundReducer from 'redux/fund/reducer'
import fundSaga from 'redux/fund/saga'
import { GetFundsActionTypes } from 'redux/fund/constants'

const sagaMiddleware = createSagaMiddleware()

const appReducer = combineReducers({
    fundReducer
  })

  export type RootState = ReturnType<typeof appReducer>

  const store = createStore(appReducer, applyMiddleware(sagaMiddleware))

  export type AppDispatch = (
    action:  GetFundsActionTypes
  ) => void


export default function configureStore() {
    sagaMiddleware.run(fundSaga)
    return store
  }