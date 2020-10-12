import { actions } from './constants'
import { Fund, FundName, SubFunClassesOfFund, SubFund } from 'apiTypes'

export const getFunds = (keyword?: string) => ({
  type: actions.GET_FUNDS,
  keyword,
})

export const getFundsSuccess = (funds: FundName[] | null) => ({
  type: actions.GET_FUNDS_SUCCESS,
  funds,
})
export const getFundsFailed = (error: string) => ({
  type: actions.GET_FUNDS_FAILED,
  error,
})

export const getFundsByClass = (id?: string) => ({
  type: actions.GET_FUNDS_BY_CLASS,
  id,
})

export const getFundsByClassSuccess = (funds: Fund[] | null) => ({
  type: actions.GET_FUNDS_BY_CLASS_SUCCESS,
  funds,
})
export const getFundsByClassFailed = (error: string) => ({
  type: actions.GET_FUNDS_BY_CLASS_FAILED,
  error,
})

export const getSubFunds = (id: string) => ({
  type: actions.GET_SUBFUNDS,
  id,
})

export const getSubFundsSuccess = (subFunds: SubFund[] | null) => ({
  type: actions.GET_SUBFUNDS_SUCCESS,
  subFunds,
})
export const getSubFundsFailed = (error: string) => ({
  type: actions.GET_SUBFUNDS_FAILED,
  error,
})

export const getSubFundsClasses = (id: string) => ({
  type: actions.GET_CLASSES_BY_FUNDSUBFUNDID,
  id,
})

export const getSubFundsClassesSuccess = (
  classes: SubFunClassesOfFund | null
) => ({
  type: actions.GET_CLASSES_BY_FUNDSUBFUNDID_SUCCESS,
  classes,
})
export const getSubFundsClassesFailed = (error: string) => ({
  type: actions.GET_CLASSES_BY_FUNDSUBFUNDID_FAILED,
  error,
})
