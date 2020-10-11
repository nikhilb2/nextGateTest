import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Loading from 'components/common/loading'
import Home from 'pages/home'
import SubFund from 'pages/subFund'
import SubfundClasses from 'pages/subFundClasses'
import FundResult from 'pages/fundResult'
import Header from 'components/headers/header'
import { makeStyles } from '@material-ui/core'
import theme from 'theme'
import { MuiThemeProvider } from '@material-ui/core/styles';
const useStyles = makeStyles({
  heeaderDiv: {
    marginTop: theme.spacing(6),
  },
  loading: {
    position: 'absolute',
    bottom: 0
    
  }
})

const App = () => {
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <div className={classes.heeaderDiv} />
      <Route exact path="/" component={Home} />
      <Route exact path="/fund/:fundid" component={SubFund} />
      <Route exact path="/fund/:fundid/:subfundid" component={SubfundClasses} />
      <Route
        exact
        path="/fund/:fundid/:subfundid/:classid"
        component={FundResult}
      />
        <Loading className={classes.loading} />
    </MuiThemeProvider>
  )
}

export default withRouter(App)
