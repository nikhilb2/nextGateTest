import { Fund } from 'apiTypes'
import { actions, FundState, GetFundsAction, GetFundsSuccessAction, GetFundsFailedAction, GetMoreFundsSuccessAction, GetFundsActionTypes, GetMoreFundsFailedAction } from './constants'

const initialState: FundState = {
    gettingFunds: false,
    funds: null,
    getFundsError: null,
    skip: 0,
    getMoreFundsError: null,
    keyword: null
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
        case actions.GET_MORE_FUNDS:
            return Object.assign({}, state, {
                gettingFunds: true,
                getMoreFundsError: null
            })
        case actions.GET_MORE_FUNDS_SUCCESS:
            let oldFunds: Fund[] = []
            const newFunds: Fund[] | null | undefined= (action as GetMoreFundsSuccessAction).funds
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
        default: 
            return state
    }
}

export default fundReducer