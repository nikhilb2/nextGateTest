
import { actions } from './constants'

import { getFundsSuccess, getFundsFailed } from './actions'
import { call, put, all, takeLatest } from 'redux-saga/effects'
import firebase from 'firstoreConfig'
import { Success, Fail, Fund } from 'apiTypes'

const { GET_FUNDS } = actions


function* getFunds() {

    const getResult = async (): Promise<Success | Fail> => {
        try {
           const data = await firebase.database().ref('data').startAt('1000').orderByKey().limitToFirst(20).once('value').then(snap => 
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

function* getFundsSaga() {
    yield takeLatest(GET_FUNDS, getFunds)
  }
  
  
  function* mainSaga() {
    yield all([call(getFundsSaga)])
  }
  
  export default mainSaga