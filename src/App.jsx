import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import GlobalStyle from './view/globalCss';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

//Pages
import Home from './view/home';
import Overview from './view/overview';
import Profile from './view/profile';
import Login from './view/login';
import Register from './view/register';

const PrivateRoute = ({component: Component, ...rest}) => {

  const isAuth = useSelector(state => state.user.userLogin);

  return (
      <Route {...rest} render={props => (
          isAuth ?
            <Component {...props} />
          : <Redirect to="/login" />
      )} 
      />
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <GlobalStyle />
          <Switch>
            <PrivateRoute exact path = '/' component = {Home} />
            <PrivateRoute exact path = '/overview' component = {Overview} />
            <PrivateRoute exact path = '/profile' component = {Profile} />
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/register' component = {Register} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;