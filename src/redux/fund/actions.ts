import { actions } from './constants'
import { Fund, FundName } from '../../apiTypes'

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