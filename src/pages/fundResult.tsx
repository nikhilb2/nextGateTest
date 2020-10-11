import Bcrumbs from "components/common/breadcrumbs"
import React, { useEffect } from "react"
import { RootState, AppDispatch } from 'configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { getFundsByClass, getSubFunds, getSubFundsClasses } from "redux/fund/actions"
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { makeStyles } from "@material-ui/core"
import theme from 'theme'
import Table from 'components/common/table'
import { FundName, SubFundClasses } from "apiTypes"


const mapStateToProps = (state: RootState) => ({
    subFunds: state.fundReducer.subFunds,
    subFundClasses: state.fundReducer.subFundClasses,
    fundsByClass: state.fundReducer.fundsByClass
  })
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getSubFunds: (id: string) => dispatch(getSubFunds(id)),
    getSubFundsClasses: (id: string) => dispatch(getSubFundsClasses(id)) ,
    getFundsByClass: (id: string) => dispatch(getFundsByClass(id))
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
      maxWidth: '60%',
    },
  },
  })
  

const SubfundClasses = (props: Props) => {
    const { subFunds, getSubFunds, getSubFundsClasses, subFundClasses, getFundsByClass, fundsByClass } = props
    const { fundid, subfundid, classid } = useParams<Params>()
    const classes = useStyles()
    const { push } = useHistory()
    const { pathname } = useLocation()
    useEffect(() => {
        if (fundid) {
            if (!subFunds) {
                getSubFunds(fundid)
            }
        }
      }, [getSubFunds])
    
    useEffect(() => {
      if (subfundid && fundid) {
          if (!subFundClasses) {
            getSubFundsClasses(fundid + "-" + subfundid)
          }
        
      }
    }, [subfundid, fundid])
    console.log(fundsByClass)


    useEffect(() => {
        if (subfundid && fundid && classid) {
            getFundsByClass(fundid + "-" + subfundid + "-" + classid)
        }
    }, [subfundid, fundid, classid])

    return(
        <div className={classes.container}>
            <Bcrumbs           data={[
            {
              name: 'Home',
              route: '/',
            },
            {
                name: subFunds ? subFunds[0].name : '',
                route: `/fund/${fundid}`
            },
            {
                name: subFundClasses ? subFundClasses.subFund: '',
                route: `/fund/${fundid}/${subfundid}`
            }
          ]}
          last='Soon'
        />
          
           
        </div>
    )
}

export default connector(SubfundClasses)