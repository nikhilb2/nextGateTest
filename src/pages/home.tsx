import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState, AppDispatch } from 'configureStore'
import { getFunds } from 'redux/fund/actions'
import Header from 'components/headers/header'
import Title from 'components/common/title'
import { makeStyles } from '@material-ui/core/styles'
import theme from 'theme'
import { Box, CssBaseline } from '@material-ui/core'
import Searchbox from 'components/common/searchbox'
import Table from 'components/common/table'

const useStyles = makeStyles({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    headerContainer: {
        backgroundColor: theme.palette.primary.main,
        overflow: 'hidden',
        width: '100vw',
        borderBottomLeftRadius: '5vw',
        paddingBottom: theme.spacing(2)
    //    borderBottomRightRadius: '10vw'
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: '70vw',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    table: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        boxShadow: 'none',
        marginTop: theme.spacing(3)
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
        <Box style={{backgroundColor: '#ffffff'}}
         >

             <Box className={classes.headerContainer}>
             <CssBaseline/>
            <Header />
            <Title title="Test project: Sample data CRUD"  />
            <Box className={classes.searchBox}>
                <Searchbox  />
            </Box>
            </Box>
            <Table className={classes.table} />
        </Box>
    )
}


export default connector(Home)