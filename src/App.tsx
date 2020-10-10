import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import Home from 'pages/home'

const App = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
    </>
  )
}

export default withRouter(App)
