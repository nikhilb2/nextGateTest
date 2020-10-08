
import { actions, GetFundsAction } from './constants'

import { getFundsSuccess, getFundsFailed } from './actions'
import { call, put, all, takeLatest } from 'redux-saga/effects'
import firebase from 'firstoreConfig'


const { GET_FUNDS } = actions


function getFunds(action: GetFundsAction) {

    const getResult = async () => {
        try {
            const data = await firebase.database().ref('data').limitToFirst(10)
            console.log(data);
            
            return data
        } catch(err) {
            return {err}
        }
    }

    
    const result = getResult()
;
    

    

}

function* getFundsSaga() {
    yield takeLatest(GET_FUNDS, getFunds)
  }
  
  
  function* mainSaga() {
    yield all([call(getFundsSaga)])
  }
  
  export default mainSaga