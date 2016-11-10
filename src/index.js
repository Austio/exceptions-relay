// @flow

import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";
import { Router, browserHistory, applyRouterMiddleware } from "react-router";
import useRelay from "react-router-relay";
import "./index.css";
import routes from "./routes";

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer("https://dox-exceptions-api.herokuapp.com/graphql", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  })
);

ReactDOM.render(
  React.createElement(Router, {
    history: browserHistory,
    routes,
    render: applyRouterMiddleware(useRelay),
    environment: Relay.Store,
  }),
  document.getElementById("root")
);
