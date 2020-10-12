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
  gettingFunds: false,
  funds: null,
  getFundsError: null,
  skip: 0,
  getMoreFundsError: null,
  keyword: null,
  gettingFundsByClass: false,
  fundsByClass: null,
  getFundsByClassError: null,
  subFunds: null,
  gettingSubfunds: false,
  getSubfundsError: null,
  subFundClasses: null,
  gettingSubFundClasses: false,
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
        gettingFunds: true,
        getFundsError: null,
        loading: true,
      })
    case actions.GET_FUNDS_SUCCESS:
      return Object.assign({}, state, {
        gettingFunds: false,
        funds: (action as GetFundsSuccessAction).funds,
        getFundsError: null,
        loading: false,
      })
    case actions.GET_FUNDS_FAILED:
      return Object.assign({}, state, {
        gettingFunds: false,
        //funds: (action as GetFundsSuccessAction).funds,
        getFundsError: (action as GetFundsFailedAction).error,
        loading: false,
      })
    case actions.GET_FUNDS_BY_CLASS: {
      return Object.assign({}, state, {
        gettingFundsByClass: true,
        getFundsByClassError: null,
        loading: true,
        fundsByClass: null,
      })
    }
    case actions.GET_FUNDS_BY_CLASS_SUCCESS: {
      return Object.assign({}, state, {
        gettingFundsByClass: false,
        getFundsByClassError: null,
        fundsByClass: (action as GetFundsByClassSuccessAction).funds,
        loading: false,
      })
    }
    case actions.GET_FUNDS_BY_CLASS_FAILED: {
      return Object.assign({}, state, {
        gettingFundsByClass: false,
        getFundsByClassError: (action as GetFundsByClassFailedAction).error,
        loading: false,
      })
    }
    case actions.GET_SUBFUNDS: {
      return Object.assign({}, state, {
        gettingSubfunds: true,
        getSubfundsError: null,
        loading: true,
        subFunds: null,
      })
    }
    case actions.GET_SUBFUNDS_SUCCESS: {
      return Object.assign({}, state, {
        gettingSubfunds: false,
        getSubfundsError: null,
        subFunds: (action as GetSubfundSuccessAction).subFunds,
        loading: false,
      })
    }
    case actions.GET_SUBFUNDS_FAILED: {
      return Object.assign({}, state, {
        gettingSubfunds: false,
        getFundsByClassError: (action as GetSubfundFailedAction).error,
        loading: false,
      })
    }
    case actions.GET_CLASSES_BY_FUNDSUBFUNDID: {
      return Object.assign({}, state, {
        gettingSubFundClasses: true,
        getSubFundClass: null,
        loading: true,
        subFundClasses: null,
      })
    }
    case actions.GET_CLASSES_BY_FUNDSUBFUNDID_SUCCESS: {
      return Object.assign({}, state, {
        gettingSubFundClasses: false,
        getSubFundClassesError: null,
        subFundClasses: (action as GetClassesByFundSubfundSuccessAction)
          .classes,
        loading: false,
      })
    }
    case actions.GET_CLASSES_BY_FUNDSUBFUNDID_FAILED: {
      return Object.assign({}, state, {
        gettingSubFundClasses: false,
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
