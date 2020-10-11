import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RootState, AppDispatch } from 'configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { getSubFunds } from 'redux/fund/actions'
import theme from 'theme'
import { makeStyles } from '@material-ui/core'
import Bcrumbs from 'components/common/breadcrumbs'
import SubFundTable from 'components/common/SubFundsTable'

const mapStateToProps = (state: RootState) => ({
  subFunds: state.fundReducer.subFunds,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getSubFunds: (id: string) => dispatch(getSubFunds(id)),
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

const Subfund = (props: Props) => {
  const { getSubFunds, subFunds } = props
  const classes = useStyles()
  const { fundid, subfundid } = useParams<Params>()
  console.log(fundid)
  console.log(subFunds)
  useEffect(() => {
    if (fundid) {
      getSubFunds(fundid)
    }
  }, [getSubFunds])

  return (
    <div className={classes.container}>
      <div>
        <Bcrumbs
          data={[
            {
              name: 'Home',
              route: '/',
            },
          ]}
          last={subFunds ? subFunds[0].name : ''}
        />
        <SubFundTable
          data={subFunds ? subFunds[0] : subFunds}
          className={classes.table}
          title={subFunds ? subFunds[0].name : ''}
        />
      </div>
    </div>
  )
}

export default connector(Subfund)
