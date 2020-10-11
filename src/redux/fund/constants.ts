import { Fund, FundName, SubFunClassesOfFund, SubFund } from 'apiTypes'

// actions
export const actions = {
  GET_FUNDS: 'GET_FUNDS',
  GET_FUNDS_SUCCESS: 'GET_FUNDS_SUCCESS',
  GET_FUNDS_FAILED: 'GET_FUNDS_FAILED',
  GET_MORE_FUNDS: 'GET_MORE_FUNDS',
  GET_MORE_FUNDS_SUCCESS: 'GET_MORE_FUNDS_SUCCESS',
  GET_MORE_FUNDS_FAILED: 'GET_MORE_FUNDS_FAILED',
  GET_FUNDS_BY_CLASS: 'GET_FUNDS_BY_CLASS',
  GET_FUNDS_BY_CLASS_SUCCESS: 'GET_FUNDS_BY_CLASS_SUCCESS',
  GET_FUNDS_BY_CLASS_FAILED: 'GET_FUNDS_BY_CLASS_FAILED',
  GET_SUBFUNDS: 'GET_SUBFUND',
  GET_SUBFUNDS_SUCCESS: 'GET_SUBFUND_SUCCESS',
  GET_SUBFUNDS_FAILED: 'GET_SUBFUND_FAILED',
  GET_CLASSES_BY_FUNDSUBFUNDID: 'GET_CLASSES_BY_FUNDSUBFUNDID',
  GET_CLASSES_BY_FUNDSUBFUNDID_SUCCESS: 'GET_CLASSES_BY_FUNDSUBFUNDID_SUCCESS',
  GET_CLASSES_BY_FUNDSUBFUNDID_FAILED: 'GET_CLASSES_BY_FUNDSUBFUNDID_FAILED',
}

//state type

export interface FundState {
  gettingFunds: boolean
  getFundsError: string | null
  funds: FundName[] | null
  skip: number
  getMoreFundsError: string | null
  keyword: string | null
  gettingFundsByClass: boolean
  getFundsByClassError: string | null
  fundsByClass: Fund[] | null
  subFunds: SubFund[] | null
  gettingSubfunds: boolean
  getSubfundsError: string | null
  subFundClasses: SubFunClassesOfFund | null
  gettingSubFundClasses: boolean
  getSubFundClassesError: string | null
}

// actions

export interface GetFundsAction {
  type: typeof actions.GET_FUNDS
  keyword?: string
}

export interface GetFundsSuccessAction {
  type: typeof actions.GET_FUNDS_SUCCESS
  funds?: FundName[] | null
}

export interface GetFundsFailedAction {
  type: typeof actions.GET_FUNDS_FAILED
  error: string
}

export interface GetFundsByClassAction {
  type: typeof actions.GET_FUNDS_BY_CLASS
  id: string
}

export interface GetFundsByClassSuccessAction {
  type: typeof actions.GET_FUNDS_BY_CLASS_SUCCESS
  funds?: Fund[] | null
}

export interface GetFundsByClassFailedAction {
  type: typeof actions.GET_FUNDS_BY_CLASS_FAILED
  error: string
}

export interface GetMoreFundsAction {
  type: typeof actions.GET_MORE_FUNDS
}

export interface GetMoreFundsSuccessAction {
  type: typeof actions.GET_MORE_FUNDS_SUCCESS
  funds?: Fund[] | null
}

export interface GetMoreFundsFailedAction {
  type: typeof actions.GET_MORE_FUNDS_FAILED
  error: string
}

export interface GetSubfundAction {
  type: typeof actions.GET_SUBFUNDS
  id: string
}

export interface GetSubfundSuccessAction {
  type: typeof actions.GET_SUBFUNDS_SUCCESS
  subFunds?: SubFund | null
}

export interface GetSubfundFailedAction {
  type: typeof actions.GET_SUBFUNDS_FAILED
  error: string
}
export interface GetClassesByFundSubfundAction {
  type: typeof actions.GET_CLASSES_BY_FUNDSUBFUNDID
  id: string
}

export interface GetClassesByFundSubfundSuccessAction {
  type: typeof actions.GET_CLASSES_BY_FUNDSUBFUNDID_SUCCESS
  classes?: SubFunClassesOfFund | null
}

export interface GetClassesByFundSubfundFailedAction {
  type: typeof actions.GET_CLASSES_BY_FUNDSUBFUNDID_FAILED
  error: string
}

export type GetFundsActionTypes =
  | GetFundsAction
  | GetFundsSuccessAction
  | GetFundsFailedAction
  | GetMoreFundsAction
  | GetMoreFundsSuccessAction
  | GetMoreFundsFailedAction
  | GetFundsByClassAction
  | GetFundsByClassSuccessAction
  | GetFundsByClassFailedAction
  | GetSubfundAction
  | GetSubfundSuccessAction
  | GetSubfundFailedAction
  | GetClassesByFundSubfundAction
  | GetClassesByFundSubfundSuccessAction
  | GetClassesByFundSubfundFailedAction
