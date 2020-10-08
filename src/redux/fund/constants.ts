import { Fund } from '../../apiTypes'

// actions
export const actions = {
    GET_FUNDS: 'GET_FUNDS',
    GET_FUNDS_SUCCESS: 'GET_FUNDS_SUCCESS',
    GET_FUNDS_FAILED: 'GET_FUNDS_FAILED'
}

//state type

export interface FundState {
    gettingFunds: boolean
    getFundsError: string | null
    funds: Fund[] | null
}



// actions


export interface GetFundsAction {
    type: typeof actions.GET_FUNDS
  }
  
  export interface GetFundsSuccessAction {
    type: typeof actions.GET_FUNDS_SUCCESS
    funds: Fund[]
  }
  
  export interface GetFundsFailedAction {
    type: typeof actions.GET_FUNDS_FAILED
    error: string
  }
  
  export type GetFundsActionTypes =
    | GetFundsAction
    | GetFundsSuccessAction
    | GetFundsFailedAction