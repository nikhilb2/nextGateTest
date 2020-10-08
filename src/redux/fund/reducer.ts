import { actions, FundState, GetFundsAction, GetFundsSuccessAction, GetFundsFailedAction } from './constants'

const initialState: FundState = {
    gettingFunds: false,
    funds: null,
    getFundsError: null
}

const fundReducer = (
    state = initialState,
    action: GetFundsAction
): FundState => {
    switch (action.type) {
        case actions.GET_FUNDS:
            return Object.assign({}, state, {
                gettingFunds: true,
                getFundsError: null
            })
        case actions.GET_FUNDS_SUCCESS:
        return Object.assign({}, state, {
            gettingFunds: true,
            funds: (action as GetFundsSuccessAction).funds,
            getFundsError: null
        }) 
        case actions.GET_FUNDS_FAILED:
        return Object.assign({}, state, {
            gettingFunds: true,
            //funds: (action as GetFundsSuccessAction).funds,
            getFundsError: (action as GetFundsFailedAction).error
        })
        default: 
            return state
    }
}

export default fundReducer