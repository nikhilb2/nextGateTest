import Bcrumbs from "components/common/breadcrumbs"
import React, { useEffect } from "react"
import { RootState, AppDispatch } from 'configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { getSubFunds, getSubFundsClasses } from "redux/fund/actions"
import { useParams } from 'react-router-dom'
import { makeStyles } from "@material-ui/core"
import theme from 'theme'
import Table from 'components/common/table'
import { FundName, SubFundClasses } from "apiTypes"


const mapStateToProps = (state: RootState) => ({
    subFunds: state.fundReducer.subFunds,
    subFundClasses: state.fundReducer.subFundClasses
  })
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getSubFunds: (id: string) => dispatch(getSubFunds(id)),
    getSubFundsClasses: (id: string) => dispatch(getSubFundsClasses(id)) 
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
  

const SubfundClasses = (props: Props) => {
    const { subFunds, getSubFunds, getSubFundsClasses, subFundClasses } = props
    const { fundid, subfundid } = useParams<Params>()
    const classes = useStyles()
    useEffect(() => {
        if (fundid) {
            if (!subFunds) {
                getSubFunds(fundid)
            }
        }
      }, [getSubFunds])
    
    useEffect(() => {
      if (subfundid && fundid) {
        getSubFundsClasses(fundid + "-" + subfundid)
      }
    }, [subfundid, fundid])
    console.log(subFundClasses)

    return(
        <div className={classes.container}>
            <Bcrumbs           data={[
            {
              name: 'Home',
              route: '/',
            },
            {
                name: subFunds ? subFunds[0].name : '',
                route: `/fund/${subFunds ? subFunds[0].id : ''}`
            }
          ]}
          last={subFundClasses ? subFundClasses.subFund: ''}
        />
          <Table funds={subFundClasses? subFundClasses.classes :  undefined} className={classes.table} title={subFundClasses ? `${subFundClasses.name}  -> ${subFundClasses.subFund}` : " " } />
           
        </div>
    )
}

export default connector(SubfundClasses)