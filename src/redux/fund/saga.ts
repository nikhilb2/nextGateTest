
import { actions, GetFundsAction } from './constants'

import { getFundsSuccess, getFundsFailed } from './actions'
import { call, put, all, takeLatest } from 'redux-saga/effects'
import firebase from 'firstoreConfig'


const { GET_FUNDS } = actions


function* getFunds() {

    const getResult = async (): Promise<any> => {
        try {
           const data = await firebase.database().ref('data').orderByKey().limitToFirst(10).once('value').then(snap => 
               snap.toJSON()
               )
           //    console.log(data);
               
            return data
        } catch(err) {
            return {err: 'failed'}
        }
    }

    
    const result = yield call<typeof getResult>(getResult)

    if (result && !result.err) {
        yield put(getFundsSuccess(result))
    } else {
        yield put(getFundsFailed('failed'))
    }

    

}

function* getFundsSaga() {
    yield takeLatest(GET_FUNDS, getFunds)
  }
  
  
  function* mainSaga() {
    yield all([call(getFundsSaga)])
  }
  
  export default mainSaga