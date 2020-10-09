
import { actions, FundState } from './constants'

import { getFundsSuccess, getFundsFailed, getMoreFundsSuccess, getMoreFundsFailed } from './actions'
import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import firebase from 'firstoreConfig'
import { Success, Fail, Fund } from 'apiTypes'

const { GET_FUNDS, GET_MORE_FUNDS } = actions

const getFundSkip = (state: FundState) => state.funds ? state.funds.length : 0

function* getFunds() {

    const getResult = async (): Promise<Success | Fail> => {
        try {
           const data = await firebase.database().ref('data').orderByKey().limitToFirst(20).once('value').then(snap => 
               snap.toJSON()
               )
           //    console.log(data);
               
            return data as Success
        } catch(err) {
            console.log(err);
            
            return {err: 'failed'} as Fail
        }
    }

    
    let result = yield call<typeof getResult>(getResult)
    result = Object.values(result)
    
    if (result && !result.err) {
        yield put(getFundsSuccess(result as Fund[]))
    } else {
        yield put(getFundsFailed(result.err))
    }

    

}

function* getMoreFunds() {
    const skip = yield select(getFundSkip)
    const getResult = async (): Promise<Success | Fail> => {
        try {
           const data = await firebase.database().ref('data').startAt(skip).orderByKey().limitToFirst(20).once('value').then(snap => 
               snap.toJSON()
               )
           //    console.log(data);
               
            return data as Success
        } catch(err) {
            console.log(err);
            
            return {err: 'failed'} as Fail
        }
    }

    
    let result = yield call<typeof getResult>(getResult)
    result = Object.values(result)
    
    if (result && !result.err) {
        yield put(getMoreFundsSuccess(result as Fund[]))
    } else {
        yield put(getMoreFundsFailed(result.err))
    }

    

}

function* getFundsSaga() {
    yield takeLatest(GET_FUNDS, getFunds)
  }
  
  
function* getMoreFundsSaga() {
    yield takeLatest(GET_MORE_FUNDS, getMoreFunds)
  }
  
  
  function* mainSaga() {
    yield all([call(getFundsSaga), call(getMoreFundsSaga)])
  }
  
  export default mainSaga