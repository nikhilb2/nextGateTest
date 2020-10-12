import {
  actions,
  FundState,
  GetFundsSuccessAction,
  GetFundsFailedAction,
  GetFundsActionTypes,
  GetFundsByClassSuccessAction,
  GetFundsByClassFailedAction,
  GetSubfundSuccessAction,
  GetSubfundFailedAction,
  GetClassesByFundSubfundFailedAction,
  GetClassesByFundSubfundSuccessAction,
} from './constants'

const initialState: FundState = {
  funds: null,
  getFundsError: null,
  skip: 0,
  getMoreFundsError: null,
  keyword: null,
  fundsByClass: null,
  getFundsByClassError: null,
  subFunds: null,
  getSubfundsError: null,
  subFundClasses: null,
  getSubFundClassesError: null,
  loading: false,
}

const fundReducer = (
  state = initialState,
  action: GetFundsActionTypes
): FundState => {
  switch (action.type) {
    case actions.GET_FUNDS:
      return Object.assign({}, state, {
        getFundsError: null,
        loading: true,
      })
    case actions.GET_FUNDS_SUCCESS:
      return Object.assign({}, state, {
        funds: (action as GetFundsSuccessAction).funds,
        getFundsError: null,
        loading: false,
      })
    case actions.GET_FUNDS_FAILED:
      return Object.assign({}, state, {
        getFundsError: (action as GetFundsFailedAction).error,
        loading: false,
      })
    case actions.GET_FUNDS_BY_CLASS: {
      return Object.assign({}, state, {
        getFundsByClassError: null,
        loading: true,
        fundsByClass: null,
      })
    }
    case actions.GET_FUNDS_BY_CLASS_SUCCESS: {
      return Object.assign({}, state, {
        getFundsByClassError: null,
        fundsByClass: (action as GetFundsByClassSuccessAction).funds,
        loading: false,
      })
    }
    case actions.GET_FUNDS_BY_CLASS_FAILED: {
      return Object.assign({}, state, {
        getFundsByClassError: (action as GetFundsByClassFailedAction).error,
        loading: false,
      })
    }
    case actions.GET_SUBFUNDS: {
      return Object.assign({}, state, {
        getSubfundsError: null,
        loading: true,
        subFunds: null,
      })
    }
    case actions.GET_SUBFUNDS_SUCCESS: {
      return Object.assign({}, state, {
        getSubfundsError: null,
        subFunds: (action as GetSubfundSuccessAction).subFunds,
        loading: false,
      })
    }
    case actions.GET_SUBFUNDS_FAILED: {
      return Object.assign({}, state, {
        getFundsByClassError: (action as GetSubfundFailedAction).error,
        loading: false,
      })
    }
    case actions.GET_CLASSES_BY_FUNDSUBFUNDID: {
      return Object.assign({}, state, {
        getSubFundClass: null,
        loading: true,
        subFundClasses: null,
      })
    }
    case actions.GET_CLASSES_BY_FUNDSUBFUNDID_SUCCESS: {
      return Object.assign({}, state, {
        getSubFundClassesError: null,
        subFundClasses: (action as GetClassesByFundSubfundSuccessAction)
          .classes,
        loading: false,
      })
    }
    case actions.GET_CLASSES_BY_FUNDSUBFUNDID_FAILED: {
      return Object.assign({}, state, {
        getSubFundClassesError: (action as GetClassesByFundSubfundFailedAction)
          .error,
        loading: false,
      })
    }

    default:
      return state
  }
}

export default fundReducer
