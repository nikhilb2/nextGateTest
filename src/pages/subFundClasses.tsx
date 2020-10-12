import Bcrumbs from 'components/common/breadcrumbs'
import React, { useEffect, useState } from 'react'
import { RootState, AppDispatch } from 'configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { getSubFunds, getSubFundsClasses } from 'redux/fund/actions'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import theme from 'theme'
import Table from 'components/common/table'
import { SubFundClasses } from 'apiTypes'
const mapStateToProps = (state: RootState) => ({
  subFunds: state.fundReducer.subFunds,
  subFundClasses: state.fundReducer.subFundClasses,
  loading: state.fundReducer.loading
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getSubFunds: (id: string) => dispatch(getSubFunds(id)),
  getSubFundsClasses: (id: string) => dispatch(getSubFundsClasses(id)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

type Params = {
  fundid: string
  subfundid?: string
}

const useStyles = makeStyles({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    minHeight: '100vh'
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

const SubfundClasses = (props: Props) => {
  const { subFunds, getSubFunds, getSubFundsClasses, subFundClasses, loading } = props
  const [ filteredSubFundClasses, setFilteredSubfundClasses] = useState<SubFundClasses[] | null>(null)

  useEffect(() => {
    if (subFundClasses) {
      setFilteredSubfundClasses(subFundClasses.classes)
    }
  }, [subFundClasses])


  const filterSubFund = (keyword: string) => {
    if (subFundClasses && subFundClasses.classes) {
      const filtered = subFundClasses.classes.filter(fund => fund.name.toLowerCase().includes(keyword.toLowerCase()))
      console.log(filtered)
      setFilteredSubfundClasses(filtered)

    }
  }

  const { fundid, subfundid } = useParams<Params>()
  const classes = useStyles()
  const { push } = useHistory()
  const { pathname } = useLocation()
  useEffect(() => {
    if (fundid) {
      if (!subFunds) {
        getSubFunds(fundid)
      }
    }
  }, [getSubFunds, fundid, subFunds])

  useEffect(() => {
    if (subfundid && fundid) {
      getSubFundsClasses(fundid + '-' + subfundid)
    }
  }, [subfundid, fundid, getSubFundsClasses])

  return (
    <div className={classes.container}>
      {!loading &&
        <>
          <Bcrumbs
        data={[
          {
            name: 'Home',
            route: '/',
          },
          {
            name: subFunds ? subFunds[0].name : '',
            route: `/fund/${fundid}`,
          },
        ]}
        last={subFundClasses ? subFundClasses.subFund : ''}
      />
      <Table
        funds={filteredSubFundClasses}
        className={classes.table}
        title={
          subFundClasses
            ? `${subFundClasses.name}  -> ${subFundClasses.subFund}`
            : ' '
        }
        onSelect={(id) => push(pathname + '/' + id)}
        onSearch={(text) => filterSubFund(text)}
      />
        </>
      }
    </div>
  )
}

export default connector(SubfundClasses)
