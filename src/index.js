// @flow

import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";
import { IndexRoute, Route, Router, browserHistory, applyRouterMiddleware } from "react-router";
import useRelay from "react-router-relay";
import App from "./components/App";
import BatchList from "./components/BatchList";
import Bug from "./components/Bug";
import Callback from "./components/Callback";
import Developer from "./components/Developer";
import DeveloperList from "./components/DeveloperList";
import Login from "./components/Login";
import NewBatch from "./components/NewBatch";
import NewBug from "./components/NewBug";
import NewDeveloper from "./components/NewDeveloper";
import ViewerQueries from "./queries/ViewerQueries";
import NodeQueries from "./queries/NodeQueries";
import BothQueries from "./queries/BothQueries";
import "./index.css";

function requireAuth(nextState, replace) {
  if (!localStorage.token) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function prepareDeveloperListParams(params, { location }) {
  const { year } = location.query;

  return Object.assign({}, params, {
    year: (year && parseInt(year, 10)) || null,
    limit: 100,
  });
}

function prepareBatchListParams(params, { location }) {
  const { after } = location.query;

  return Object.assign({}, params, { after: after || null });
}


Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  })
);

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route
      path="/"
      component={App}
    >
      <IndexRoute
        component={DeveloperList}
        queries={ViewerQueries}
        onEnter={requireAuth}
        prepareParams={prepareDeveloperListParams}
      />
      <Route
        path="login"
        component={Login}
      />
      <Route
        path="callback"
        component={Callback}
      />
      <Route
        path="batches"
        component={BatchList}
        queries={ViewerQueries}
        onEnter={requireAuth}
        prepareParams={prepareBatchListParams}
      />
      <Route
        path="developers/new"
        component={NewDeveloper}
        queries={ViewerQueries}
        onEnter={requireAuth}
      />
      <Route
        path="batches/new"
        component={NewBatch}
        queries={ViewerQueries}
        onEnter={requireAuth}
      />
      <Route
        path="bugs/new"
        component={NewBug}
        queries={ViewerQueries}
        onEnter={requireAuth}
      />
      <Route
        path="bugs/:id"
        component={Bug}
        queries={BothQueries}
        onEnter={requireAuth}
      />
      <Route
        path="developers/:id"
        component={Developer}
        queries={NodeQueries}
        onEnter={requireAuth}
      />
    </Route>
  </Router>,
  document.getElementById("root")
);

