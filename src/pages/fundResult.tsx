import Bcrumbs from 'components/common/breadcrumbs'
import React, { useCallback, useEffect, useState } from 'react'
import { RootState, AppDispatch } from 'configureStore'
import { connect, ConnectedProps } from 'react-redux'
import {
  getFundsByClass,
  getSubFunds,
  getSubFundsClasses,
} from 'redux/fund/actions'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import theme from 'theme'
import Table from 'components/common/resultTable'
import { Fund, SortType } from 'apiTypes'

const mapStateToProps = (state: RootState) => ({
  subFunds: state.fundReducer.subFunds,
  subFundClasses: state.fundReducer.subFundClasses,
  fundsByClass: state.fundReducer.fundsByClass,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getSubFunds: (id: string) => dispatch(getSubFunds(id)),
  getSubFundsClasses: (id: string) => dispatch(getSubFundsClasses(id)),
  getFundsByClass: (id: string) => dispatch(getFundsByClass(id)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

type Params = {
  fundid: string
  subfundid: string
  classid: string
}

const useStyles = makeStyles({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
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
      maxWidth: '80%',
    },
  },
})

const SubfundClasses = (props: Props) => {
  const {
    subFunds,
    getSubFunds,
    getSubFundsClasses,
    subFundClasses,
    getFundsByClass,
    fundsByClass,
  } = props
  const { fundid, subfundid, classid } = useParams<Params>()
  const classes = useStyles()

  useEffect(() => {
    if (fundid) {
      if (!subFunds) {
        getSubFunds(fundid)
      }
    }
  }, [fundid, getSubFunds, subFunds])

  useEffect(() => {
    if (subfundid && fundid) {
      if (!subFundClasses) {
        getSubFundsClasses(fundid + '-' + subfundid)
      }
    }
  }, [subfundid, fundid, getSubFundsClasses, subFundClasses])

  useEffect(() => {
    if (subfundid && fundid && classid) {
      getFundsByClass(fundid + '-' + subfundid + '-' + classid)
    }
  }, [subfundid, fundid, classid, getFundsByClass])

  const [sortedData, setSortedData] = useState<Fund[] | null>(null)
  const [dateOrder, setDateOrder] = useState<number>(1)
  const [reportOrder, setReportOrder] = useState<number>(1)
  const [alertOrder, setAlertOrder] = useState<number>(1)
  const [currentSort, setCurrentSort] = useState<SortType>('date')

  const sortFunds = useCallback(
    (type: SortType, order: number) => {
      if (!fundsByClass) {
        return
      }
      let data: Fund[] = [...fundsByClass]
      data = data.sort((a: Fund, b: Fund) => {
        if (a[type] > b[type]) {
          return order
        }
        if (a[type] < b[type]) {
          return -order
        }
        return 0
      })
      if (type === 'date') {
        setDateOrder(order)
      }
      if (type === 'nb_alerts') {
        setAlertOrder(order)
      }
      if (type === 'report_status') {
        setReportOrder(order)
      }
      setCurrentSort(type)
      setSortedData(data)
    },
    [fundsByClass]
  )

  useEffect(() => {
    if (fundsByClass) {
      sortFunds('date', 1)
    }
  }, [fundsByClass, sortFunds])

  return (
    <div className={classes.container}>
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
          {
            name: subFundClasses ? subFundClasses.subFund : '',
            route: `/fund/${fundid}/${subfundid}`,
          },
        ]}
        last={fundsByClass ? fundsByClass[0].class : ''}
      />
      <Table
        className={classes.table}
        data={sortedData}
        dateOrder={dateOrder}
        sortFunds={(type: SortType, order: number) => sortFunds(type, order)}
        currentSort={currentSort}
        reportOrder={reportOrder}
        alertOrder={alertOrder}
      />
    </div>
  )
}

export default connector(SubfundClasses)
