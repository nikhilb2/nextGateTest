import Bcrumbs from "components/common/breadcrumbs"
import React, { useEffect } from "react"
import { RootState, AppDispatch } from 'configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { getSubFunds } from "redux/fund/actions"
import { useParams } from 'react-router-dom'
import { makeStyles } from "@material-ui/core"
import theme from 'theme'
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
  })
  

const SubfundClasses = (props: Props) => {
    const { subFunds, getSubFunds } = props
    const { fundid } = useParams<Params>()
    const classes = useStyles()
    useEffect(() => {
        if (fundid) {
            if (!subFunds) {
                getSubFunds(fundid)
            }
        }
      }, [getSubFunds])
    

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
          last={'soon'}
        />
            coming soon
        </div>
    )
}

export default connector(SubfundClasses)