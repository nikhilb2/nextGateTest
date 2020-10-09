
import { actions, FundState, GetFundsAction } from './constants'

import { getFundsSuccess, getFundsFailed, getMoreFundsSuccess, getMoreFundsFailed } from './actions'
import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import firebase from 'firstoreConfig'
import { Success, Fail, Fund, FundName } from 'apiTypes'
import { RootState } from 'configureStore'

const { GET_FUNDS, GET_MORE_FUNDS } = actions

const getFundSkip = (state:RootState ) => state.fundReducer.funds?.length

function* getFunds(action: GetFundsAction) {

    
    const getResult = async (): Promise<Success | Fail> => {
        try {
            if (!action.keyword) {
                const data = await firebase.database().ref('fundsid').orderByKey().limitToFirst(20).once('value').then(snap => 
                    snap.toJSON()
                    )
                    return data as Success
            } else {
                console.log(action.keyword);
                const data = await firebase.database().ref('data').orderByChild('fund_name').startAt(action.keyword).limitToFirst(20).once('value').then(snap => 
                    snap.toJSON()
                    )
                    return data as Success
            }

           //    console.log(data);
               
            
        } catch(err) {
            console.log(err);
            
            return {err: 'failed'} as Fail
        }
    }

    
    let result = yield call<typeof getResult>(getResult)
    result = Object.values(result)
    
    if (result && !result.err) {
        yield put(getFundsSuccess(result as FundName[]))
    } else {
        yield put(getFundsFailed(result.err))
    }

    

}

function* getMoreFunds() {
    const skip = yield select(getFundSkip)
    console.log(skip)
    const getResult = async (): Promise<Success | Fail> => {
        try {
           const data = await firebase.database().ref('data').startAt((skip + 20).toString()).orderByKey().limitToFirst(20).once('value').then(snap => 
               snap.toJSON()
               )
        //       console.log(data);
               
            return data as Success
        } catch(err) {
            console.log(err);
            
            return {err: 'failed'} as Fail
        }
    }

    
    let result = yield call<typeof getResult>(getResult)
    result = Object.values(result)
    console.log('result')
    console.log(result)
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