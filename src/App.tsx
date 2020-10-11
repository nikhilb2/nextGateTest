import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import Home from 'pages/home'
import SubFund from 'pages/subFund'
import Header from 'components/headers/header'

const App = () => {
  return (
    <>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/fund/:fundid/:subfundid" component={SubFund} />
    </>
  )
}

export default withRouter(App)
