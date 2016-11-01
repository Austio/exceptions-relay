// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import routes from './routes';

const token = "749601018f4c3a01b7a4808a0033f402080267dc";

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:4000/graphql', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
);

ReactDOM.render(
  <Router
    history={browserHistory}
    routes={routes}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  />,
  document.getElementById('root')
);
