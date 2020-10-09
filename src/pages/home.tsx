import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState, AppDispatch } from 'configureStore'
import { getFunds } from 'redux/fund/actions'
import Header from 'components/headers/header'
import Title from 'components/common/title'
import { makeStyles } from '@material-ui/core/styles'
import theme from 'theme'
import { Box } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1,
        minHeight: '100vh'
    }
})

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
    const classes  = useStyles()
    const { getFunds } = props
    
    useEffect(() => {
        getFunds()
    }, [getFunds])
    return(
        <Box
         className={classes.root}>
            <Header />
            <Title title="Test project: Sample data CRUD"  />
        </Box>
    )
}


export default connector(Home)