import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './view/globalCss';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';


//Pages
import Home from './view/home';
import Overview from './view/overview';
import Profile from './view/profile';
import Login from './view/login';
import Register from './view/register';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <GlobalStyle />
          <Switch>
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/overview' component = {Overview} />
            <Route exact path = '/profile' component = {Profile} />
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/register' component = {Register} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;