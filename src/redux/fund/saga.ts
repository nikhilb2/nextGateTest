import {
  actions,
  GetClassesByFundSubfundAction,
  GetFundsAction,
  GetFundsByClassAction,
  GetSubfundAction,
} from './constants'

import {
  getFundsSuccess,
  getFundsFailed,
  getMoreFundsSuccess,
  getMoreFundsFailed,
  getFundsByClassSuccess,
  getFundsByClassFailed,
  getSubFundsSuccess,
  getSubFundsFailed,
  getSubFundsClassesSuccess,
  getSubFundsClassesFailed,
} from './actions'
import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import firebase from 'firstoreConfig'
import {
  Success,
  Fail,
  Fund,
  FundName,
  SubFund,
  SubFunClassesOfFund,
} from 'apiTypes'
import { RootState } from 'configureStore'

const {
  GET_FUNDS,
  GET_MORE_FUNDS,
  GET_FUNDS_BY_CLASS,
  GET_SUBFUNDS,
  GET_CLASSES_BY_FUNDSUBFUNDID,
} = actions

const getFundSkip = (state: RootState) => state.fundReducer.funds?.length

function* getFunds(action: GetFundsAction) {
  const getResult = async (): Promise<Success | Fail> => {
    try {
      if (!action.keyword) {
        const data = await firebase
          .database()
          .ref('fundNames')
          .orderByKey()
          .limitToFirst(20)
          .once('value')
          .then((snap) => snap.toJSON())
        return data as Success
      } else {
        console.log(action.keyword)
        const data = await firebase
          .database()
          .ref('data')
          .orderByChild('fund_name')
          .startAt(action.keyword)
          .limitToFirst(20)
          .once('value')
          .then((snap) => snap.toJSON())
        return data as Success
      }

      //    console.log(data);
    } catch (err) {
      console.log(err)

      return { err: 'failed' } as Fail
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

function* getFundsByClass(action: GetFundsByClassAction) {
  console.log(action)

  const getResult = async (): Promise<Success | Fail> => {
    try {
      const data = await firebase
        .database()
        .ref('funds')
        .orderByChild('id')
        .equalTo(action.id)
        .limitToFirst(20)
        .once('value')
        .then((snap) => snap.toJSON())
      return data as Success

      //    console.log(data);
    } catch (err) {
      console.log(err)

      return { err: 'failed' } as Fail
    }
  }

  let result = yield call<typeof getResult>(getResult)
  console.log(result)

  if (result) {
    result = Object.values(result)
  } else {
    result = []
  }

  console.log('actual funds')
  console.log(result)

  if (result && !result.err) {
    yield put(getFundsByClassSuccess(result as Fund[]))
  } else {
    yield put(getFundsByClassFailed(result.err))
  }
}

function* getSubfunds(action: GetSubfundAction) {
  console.log(action)

  const getResult = async (): Promise<Success | Fail> => {
    try {
      const data = await firebase
        .database()
        .ref('fundSubFunds')
        .orderByChild('id')
        .equalTo(action.id)
        .once('value')
        .then((snap) => snap.toJSON())

      return data as Success

      //    console.log(data);
    } catch (err) {
      console.log(err)

      return { err: 'failed' } as Fail
    }
  }

  let result = yield call<typeof getResult>(getResult)
  console.log(result)

  if (result) {
    result = Object.values(result)

    result[0].subfunds = Object.values(result[0].subfunds)
  } else {
    result = []
  }
  console.log('actual funds')
  console.log(result)

  if (result && !result.err) {
    yield put(getSubFundsSuccess(result as SubFund[]))
  } else {
    yield put(getSubFundsFailed(result.err))
  }
}
function* getSubFundClasses(action: GetClassesByFundSubfundAction) {
  console.log(action)

  const getResult = async (): Promise<Success | Fail> => {
    try {
      const data = await firebase
        .database()
        .ref('subFundClasses')
        .orderByChild('id')
        .equalTo(action.id)
        .once('value')
        .then((snap) => snap.toJSON())

      return data as Success

      //    console.log(data);
    } catch (err) {
      console.log(err)

      return { err: 'failed' } as Fail
    }
  }

  let result = yield call<typeof getResult>(getResult)
  console.log(result)

  if (result) {
    result = Object.values(result)[0]
    result.classes = Object.values(result.classes)
  }
  console.log('actual funds')
  console.log(result)

  if (result && !result.err) {
    yield put(getSubFundsClassesSuccess(result as SubFunClassesOfFund))
  } else {
    yield put(getSubFundsClassesFailed(result.err))
  }
}

function* getMoreFunds() {
  const skip = yield select(getFundSkip)
  console.log(skip)
  const getResult = async (): Promise<Success | Fail> => {
    try {
      const data = await firebase
        .database()
        .ref('data')
        .startAt((skip + 20).toString())
        .orderByKey()
        .limitToFirst(20)
        .once('value')
        .then((snap) => snap.toJSON())
      //       console.log(data);

      return data as Success
    } catch (err) {
      console.log(err)

      return { err: 'failed' } as Fail
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

function* getFundsByClassSaga() {
  yield takeLatest(GET_FUNDS_BY_CLASS, getFundsByClass)
}

function* getSubfundsSaga() {
  yield takeLatest(GET_SUBFUNDS, getSubfunds)
}

function* getSubFundClassesSaga() {
  yield takeLatest(GET_CLASSES_BY_FUNDSUBFUNDID, getSubFundClasses)
}

function* mainSaga() {
  yield all([
    call(getFundsSaga),
    call(getMoreFundsSaga),
    call(getFundsByClassSaga),
    call(getSubfundsSaga),
    call(getSubFundClassesSaga),
  ])
}

export default mainSaga
