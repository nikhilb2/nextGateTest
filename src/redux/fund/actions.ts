import { actions } from './constants'
import { Fund } from '../../apiTypes'

export const getFunds = () => {
    type: actions.GET_FUNDS
}

export const getFundsSuccess = (funds: Fund[]) => {
    type: actions.GET_FUNDS_SUCCESS,
    funds
}
export const getFundsFailed = (error: string) => {
    type: actions.GET_FUNDS_FAILED,
    error
}