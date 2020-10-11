import React, { useEffect } from 'react'
import {
    useParams
  } from "react-router-dom";
  import { RootState, AppDispatch } from 'configureStore'
  import { connect, ConnectedProps } from 'react-redux'
  import {
    getSubFunds,
  } from 'redux/fund/actions'
  import theme from 'theme'
import { makeStyles } from '@material-ui/core';
import Bcrumbs from 'components/common/breadcrumbs';

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
          padding: theme.spacing(2)
      }
  })

const Subfund = (props: Props) => {
    const { getSubFunds, subFunds } = props
    const classes = useStyles()
    const { fundid, subfundid } = useParams<Params>()
    console.log(fundid);
    console.log(subFunds);
    useEffect(() => {
        if (fundid) {
            getSubFunds(fundid)
        }
    }, [getSubFunds])

    return(
        <div className={classes.container}>
            <div>
                <Bcrumbs data={[{
                    name: 'Home',
                    route: '/'
                }]} last={subFunds ? subFunds[0].name : ''} />
            </div>
        </div>
    )
}

export default connector(Subfund)