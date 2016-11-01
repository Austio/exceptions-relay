// @flow

import React from 'react';
import Relay from 'react-relay';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills float-xs-right">
              <li className="nav-item">
                <a href="/" className="nav-link active">Developers</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">Bugs</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">New Bug</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">New Batch</a>
              </li>
            </ul>
          </nav>
        </div>

        <br/>

        {this.props.children}
      </div>
    );
  }
}
