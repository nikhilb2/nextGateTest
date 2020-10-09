import { Fund, FundName } from 'apiTypes'
import { actions, FundState, GetFundsAction, GetFundsSuccessAction, GetFundsFailedAction, GetMoreFundsSuccessAction, GetFundsActionTypes, GetMoreFundsFailedAction, GetFundsByClassSuccessAction, GetFundsByClassFailedAction } from './constants'

const initialState: FundState = {
    gettingFunds: false,
    funds: null,
    getFundsError: null,
    skip: 0,
    getMoreFundsError: null,
    keyword: null,
    gettingFundsByClass: false,
    fundsByClass: null,
    getFundsByClassError: null
}

const fundReducer = (
    state = initialState,
    action: GetFundsActionTypes
): FundState => {
    switch (action.type) {
        case actions.GET_FUNDS:
            return Object.assign({}, state, {

                gettingFunds: true,
                getFundsError: null
            })
        case actions.GET_FUNDS_SUCCESS:
        return Object.assign({}, state, {
            gettingFunds: false,
            funds: (action as GetFundsSuccessAction).funds,
            getFundsError: null
        }) 
        case actions.GET_FUNDS_FAILED:
        return Object.assign({}, state, {
            gettingFunds: false,
            //funds: (action as GetFundsSuccessAction).funds,
            getFundsError: (action as GetFundsFailedAction).error
        })
        case actions.GET_FUNDS_BY_CLASS: {
            return Object.assign({}, state, {
                gettingFundsByClass: true,
                getFundsByClassError: null
            })
        }
        case actions.GET_FUNDS_BY_CLASS_SUCCESS: {
            return Object.assign({}, state, {
                gettingFundsByClass: false,
                getFundsByClassError: null,
                fundsByClass: (action as GetFundsByClassSuccessAction).funds
            })
        }
        case actions.GET_FUNDS_BY_CLASS_FAILED: {
            return Object.assign({}, state, {
                gettingFundsByClass: false,
                getFundsByClassError: (action as GetFundsByClassFailedAction).error
            })
        }




        /*
        case actions.GET_MORE_FUNDS:
            return Object.assign({}, state, {
                gettingFunds: true,
                getMoreFundsError: null
            })
        case actions.GET_MORE_FUNDS_SUCCESS:
            let oldFunds: FundName[] = []
            const newFunds: FundName[] | null | undefined= (action as GetMoreFundsSuccessAction).funds
            if (state.funds) {
                oldFunds = [...state.funds]
                oldFunds.push(...newFunds)
            }
            console.log('oldFunds');
            console.log(oldFunds);
            console.log(oldFunds);
            
            return Object.assign({}, state, {
                gettingFunds: false,
                getMoreFundsError: null,
                funds: oldFunds,
                skip: state.skip + 20
            })
        case actions.GET_MORE_FUNDS_FAILED:
            return Object.assign({}, state, {
                gettingFunds: false,
                getMoreFundsError:  (action as GetMoreFundsFailedAction).error
            })
            */
        default: 
            return state
    }
}

export default fundReducer