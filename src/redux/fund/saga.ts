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
  getFundsByClassSuccess,
  getFundsByClassFailed,
  getSubFundsSuccess,
  getSubFundsFailed,
  getSubFundsClassesSuccess,
  getSubFundsClassesFailed,
} from './actions'
import { call, put, all, takeLatest } from 'redux-saga/effects'
import firebase from 'firstoreConfig'
import {
  Success,
  Fail,
  Fund,
  FundName,
  SubFund,
  SubFunClassesOfFund,
} from 'apiTypes'

const {
  GET_FUNDS,
  GET_FUNDS_BY_CLASS,
  GET_SUBFUNDS,
  GET_CLASSES_BY_FUNDSUBFUNDID,
} = actions


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
    } catch (err) {
      return { err: 'failed' } as Fail
    }
  }

  let result = yield call<typeof getResult>(getResult)
  if (result) {
    result = Object.values(result)
  }

  if (!result) {
    yield put(getFundsSuccess(result as null))
  }

  if (result && !result.err) {
    yield put(getFundsSuccess(result as FundName[]))
  } else {
    yield put(getFundsFailed(result.err))
  }
}

function* getFundsByClass(action: GetFundsByClassAction) {
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
    } catch (err) {
      return { err: 'failed' } as Fail
    }
  }

  let result = yield call<typeof getResult>(getResult)

  if (result) {
    result = Object.values(result)
  }

  if (!result) {
    yield put(getFundsByClassSuccess(result as null))
    return
  }
  if (result && !result.err) {
    yield put(getFundsByClassSuccess(result as Fund[]))
  } else {
    yield put(getFundsByClassFailed(result.err))
  }
}

function* getSubfunds(action: GetSubfundAction) {
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
    } catch (err) {
      return { err: 'failed' } as Fail
    }
  }

  let result = yield call<typeof getResult>(getResult)

  if (result) {
    result = Object.values(result)

    result[0].subfunds = Object.values(result[0].subfunds)
  }

  if (!result) {
    yield put(getSubFundsSuccess(result as null))
    return
  }

  if (result && !result.err) {
    yield put(getSubFundsSuccess(result as SubFund[]))
  } else {
    yield put(getSubFundsFailed(result.err))
  }
}
function* getSubFundClasses(action: GetClassesByFundSubfundAction) {
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
    } catch (err) {
      return { err: 'failed' } as Fail
    }
  }

  let result = yield call<typeof getResult>(getResult)

  if (result) {
    result = Object.values(result)[0]
    result.classes = Object.values(result.classes)
  }

  if (!result) {
    yield put(getSubFundsClassesSuccess(result as null))
    return
  }

  if (result && !result.err) {
    yield put(getSubFundsClassesSuccess(result as SubFunClassesOfFund))
  } else {
    yield put(getSubFundsClassesFailed(result.err))
  }
}


function* getFundsSaga() {
  yield takeLatest(GET_FUNDS, getFunds)
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
    call(getFundsByClassSaga),
    call(getSubfundsSaga),
    call(getSubFundClassesSaga),
  ])
}

export default mainSaga
