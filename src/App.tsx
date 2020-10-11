import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import Home from 'pages/home'
import SubFund from 'pages/subFund'
import Header from 'components/headers/header'
import { makeStyles } from '@material-ui/core'
import theme from 'theme'

const useStyles = makeStyles({
  heeaderDiv: {
    marginTop: theme.spacing(6)
  }
})

const App = () => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <div className={classes.heeaderDiv} />
      <Route exact path="/" component={Home} />
      <Route path="/fund/:fundid" component={SubFund} />
    </>
  )
}

export default withRouter(App)
