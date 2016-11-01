// @flow

import React from 'react';
import Relay from 'react-relay';

export default class App extends React.Component {
  render() {
    return (
      <div>
      <hr/>
      <a href="https://github.com/login/oauth/authorize?client_id=ad70b2582fbfec6425b7&scope=read:org" className="btn btn-primary">
        <span className="fa fa-github fa-lg" aria-hidden="true"></span>
        Sign in with GitHub
      </a>
      </div>
    );
  }
}
