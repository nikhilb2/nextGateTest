import React from 'react';


import configureStore from './configureStore'
import { Provider } from 'react-redux'
import Home from 'pages/home'
const store = configureStore()




const App = () => {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
