import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState, AppDispatch } from 'configureStore'
import {
  getFunds,
  getFundsByClass,
  getMoreFunds,
  getSubFunds,
} from 'redux/fund/actions'
import { useHistory } from 'react-router-dom'
import Title from 'components/common/title'
import { makeStyles } from '@material-ui/core/styles'
import theme from 'theme'
import { Box, CssBaseline } from '@material-ui/core'
import Searchbox from 'components/common/searchbox'
//import Table from 'components/common/table'
import Table from 'components/common/tableNew'
import { FundName, Fund, SubFund } from 'apiTypes'
import FundDetails from 'components/common/fundDetails'

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  headerContainer: {
    backgroundColor: theme.palette.primary.main,
    overflow: 'hidden',
    width: '100vw',
    borderBottomLeftRadius: '5vw',
    paddingBottom: theme.spacing(2),
    //    borderBottomRightRadius: '10vw'
  },
  searchBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: '70vw',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  table: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    boxShadow: 'none',
    marginTop: theme.spacing(3),
    marginRight: 'auto',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80%',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '60%',
    },
  },
})

const mapStateToProps = (state: RootState) => ({
  funds: state.fundReducer.funds,
  fundsByClass: state.fundReducer.fundsByClass,
  subFunds: state.fundReducer.subFunds,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getFunds: (keyword?: string) => dispatch(getFunds(keyword)),
  getMoreFunds: () => dispatch(getMoreFunds()),
  getFundsByClass: (id: string) => dispatch(getFundsByClass(id)),
  getSubFunds: (id: string) => dispatch(getSubFunds(id)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const Home = (props: Props) => {
const { push } = useHistory()
  const classes = useStyles()
  const {
    getFunds,
    funds,
    getMoreFunds,
    getFundsByClass,
    getSubFunds,
    fundsByClass,
    subFunds,
  } = props

  const [selectedFund, selectFund] = useState<FundName | null>(null)
  const [ filteredFunds, setFilteredFunds ] = useState<FundName[] | null>(null)
  const filterFunds = (keyword: string) => {
      if (funds) {
        const filtered = funds.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
        setFilteredFunds(filtered)
      }

  }

  useEffect(() => {
    getFunds()
  }, [getFunds])


  useEffect(() => {
    if (funds) {
        setFilteredFunds(funds)
    }
  }, [funds])

  return (
    <Box style={{ backgroundColor: '#ffffff' }}>
      <Box className={classes.headerContainer}>
        <CssBaseline />
        <Title title="Test project: Sample data CRUD" />
        <Box className={classes.searchBox}>
          <Searchbox onChange={(text) => filterFunds(text) } />
        </Box>
      </Box>
      {fundsByClass ? (
        fundsByClass?.map((fund) => (
          <div key={fund.id}>
            <p>{fund.name}</p>
            <p>{fund.report_status ? 'Ready' : 'Pending'}</p>
            <p>{fund.subfund}</p>
            <p>{fund.date}</p>
          </div>
        ))
      ) : !selectedFund ? (
        <Table
          className={classes.table}
          funds={filteredFunds}
          onSelect={(id: string, subfund: string) => push(`fund/${id}/${subfund}`)}
        />
      ) : subFunds ? (
        subFunds &&
        subFunds[0] &&
        Object.values(subFunds[0].classes).map((item) => (
          <div
            key={item}
            style={{ paddingLeft: 20, fontWeight: 600 }}
            onClick={() => getFundsByClass(subFunds[0].id + '-' + item)}
          >
            <p>{item}</p>
          </div>
        ))
      ) : (
        <FundDetails
          data={selectedFund}
          onClassSelect={(id: string) => getSubFunds(id)}
        />
      )}
    </Box>
  )
}

export default connector(Home)
