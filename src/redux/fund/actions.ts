import { actions } from './constants'
import { Fund, FundName, SubFund } from 'apiTypes'

export const getFunds = (keyword?: string) => ({
    type: actions.GET_FUNDS,
    keyword
})

export const getFundsSuccess = (funds: FundName[]) => ({
    type: actions.GET_FUNDS_SUCCESS,
    funds
})
export const getFundsFailed = (error: string) => ({
    type: actions.GET_FUNDS_FAILED,
    error
})

export const getFundsByClass = (id?: string) => ({
    type: actions.GET_FUNDS_BY_CLASS,
    id
})

export const getFundsByClassSuccess = (funds: Fund[]) => ({
    type: actions.GET_FUNDS_BY_CLASS_SUCCESS,
    funds
})
export const getFundsByClassFailed = (error: string) => ({
    type: actions.GET_FUNDS_BY_CLASS_FAILED,
    error
})



export const getMoreFunds = () => ({
    type: actions.GET_MORE_FUNDS
})

export const getMoreFundsSuccess = (funds: Fund[]) => ({
    type: actions.GET_MORE_FUNDS_SUCCESS,
    funds
})
export const getMoreFundsFailed = (error: string) => ({
    type: actions.GET_MORE_FUNDS_FAILED,
    error
})




export const getSubFunds = (id: string) => ({
    type: actions.GET_SUBFUNDS,
    id
})

export const getSubFundsSuccess = (subFunds: SubFund[]) => ({
    type: actions.GET_SUBFUNDS_SUCCESS,
    subFunds
})
export const getSubFundsFailed = (error: string) => ({
    type: actions.GET_SUBFUNDS_FAILED,
    error
})


