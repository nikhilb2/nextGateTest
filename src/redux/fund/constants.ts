import { Fund, FundName } from '../../apiTypes'

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
    GET_FUNDS_BY_CLASS_FAILED: 'GET_FUNDS_BY_CLASS_FAILED'
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
}



// actions


export interface GetFundsAction {
    type: typeof actions.GET_FUNDS,
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
    type: typeof actions.GET_FUNDS_BY_CLASS,
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