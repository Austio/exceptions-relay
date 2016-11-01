// @flow

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Login from './components/Login';
import DeveloperList from './components/DeveloperList';
import AppHomeRoute from './routes/AppHomeRoute';

function requireAuth(nextState, replace) {
  if (true) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route
    path="/"
    component={App}
  >
    <IndexRoute
      component={DeveloperList}
      queries={AppHomeRoute}
      onEnter={requireAuth}
    />
    <Route
      path="login"
      component={Login}
    />
  </Route>
);
