// @flow

import React from "react";
import { IndexRoute, Route } from "react-router";
import App from "./components/App.jsx";
import BatchList from "./components/BatchList.jsx";
import Bug from "./components/Bug.jsx";
import Callback from "./components/Callback.jsx";
import Developer from "./components/Developer.jsx";
import DeveloperList from "./components/DeveloperList.jsx";
import Login from "./components/Login.jsx";
import NewBatch from "./components/NewBatch.jsx";
import NewBug from "./components/NewBug.jsx";
import NewDeveloper from "./components/NewDeveloper.jsx";
import NodeQuery from "./queries/NodeQuery";
import RootQuery from "./queries/RootQuery";

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

export default (
  <Route
    path="/"
    component={App}
  >
    <IndexRoute
      component={DeveloperList}
      queries={RootQuery}
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
      queries={RootQuery}
      onEnter={requireAuth}
      prepareParams={prepareBatchListParams}
    />
    <Route
      path="developers/new"
      component={NewDeveloper}
      queries={RootQuery}
      onEnter={requireAuth}
    />
    <Route
      path="batches/new"
      component={NewBatch}
      queries={RootQuery}
      onEnter={requireAuth}
    />
    <Route
      path="bugs/new"
      component={NewBug}
      queries={RootQuery}
      onEnter={requireAuth}
    />
    <Route
      path="bugs/:id"
      component={Bug}
      queries={NodeQuery}
      onEnter={requireAuth}
    />
    <Route
      path="developers/:id"
      component={Developer}
      queries={NodeQuery}
      onEnter={requireAuth}
    />
  </Route>
);
