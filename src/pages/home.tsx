import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState, AppDispatch } from 'configureStore'

import { getFunds } from 'redux/fund/actions'




const mapStateToProps = (state: RootState) => ({
    funds: state.fundReducer.funds
  })
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getFunds: () => dispatch(getFunds())
  })
  
  const connector = connect(mapStateToProps, mapDispatchToProps)
  

  type PropsFromRedux = ConnectedProps<typeof connector> 
  
  type Props = PropsFromRedux & {

  }
const Home = (props: Props) => {
    const { getFunds } = props
    
    useEffect(() => {
        getFunds()
    }, [getFunds])
    return(
        <div>
            <p>
                welcome to home screen
            </p>
        </div>
    )
}


export default connector(Home)