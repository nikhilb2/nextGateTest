import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState, AppDispatch } from 'configureStore'
import { getFunds, getFundsByClass, getMoreFunds } from 'redux/fund/actions'
import Header from 'components/headers/header'
import Title from 'components/common/title'
import { makeStyles } from '@material-ui/core/styles'
import theme from 'theme'
import { Box, CssBaseline } from '@material-ui/core'
import Searchbox from 'components/common/searchbox'
import Table from 'components/common/table'
import InfiniteScrollComponent from 'components/common/infiniteScroll'
import { FundName } from 'apiTypes'
import FundDetails from 'components/common/fundDetails'

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
    funds: state.fundReducer.funds,
    fundsByClass: state.fundReducer.fundsByClass
  })
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getFunds: (keyword?: string) => dispatch(getFunds(keyword)),
    getMoreFunds: () => dispatch(getMoreFunds()),
    getFundsByClass: (id: string) => dispatch(getFundsByClass(id))
  })
  
  const connector = connect(mapStateToProps, mapDispatchToProps)
  

  type PropsFromRedux = ConnectedProps<typeof connector> 
  
  type Props = PropsFromRedux & {

  }
const Home = (props: Props) => {
    const classes  = useStyles()
    const { getFunds, funds, getMoreFunds, getFundsByClass, fundsByClass } = props
    
    const [ selectedFund, selectFund] = useState<FundName | null>(null)
    
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
                <Searchbox onChange={(text) => getFunds(text) }  />
            </Box>
            </Box>
            {!selectedFund ? 
                <Table className={classes.table} funds={funds} onSelect={(item: FundName)  => selectFund(item)} />
                : 
                <FundDetails data={selectedFund} onClassSelect={(id: string) => getFundsByClass(id)} />
            }
            {fundsByClass?.map(fund => <div key={fund.id}>
                <p>
                    {fund.name}
                </p> 
                  <p>
                    {fund.id}
                </p>
                <p>
                    {fund.date}
                </p>
                <p>
                    {fund.class}
                </p>
                <p>
                    {fund.fundid}
                </p>
                <p>
                    {fund.subfund}
                </p>
                <p>
                    {fund.nb_alerts}
                </p>
                <p>
                    {fund.report_status}
                </p>
            </div>)}
        </Box>
    )
}


export default connector(Home)