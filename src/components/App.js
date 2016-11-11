// @flow

import React from "react";
import { IndexLink, Link } from "react-router";

class App extends React.Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="header clearfix">
              <ul className="nav nav-pills float-xs-right">
                <li className="nav-item">
                  <IndexLink to="/" className="nav-link" activeClassName="active">
                    Developers
                  </IndexLink>
                </li>
                <li className="nav-item">
                  <Link to="/batches" className="nav-link" activeClassName="active">
                    Bugs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/bugs/new" className="nav-link" activeClassName="active">
                    New Bug
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/batches/new" className="nav-link" activeClassName="active">
                    New Batch
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/developers/new" className="nav-link" activeClassName="active">
                    New Developer
                  </Link>
                </li>
              </ul>
            <h3 className="text-muted">Exceptions</h3>
          </div>

          {this.props.children}
        </div>
        <footer className="footer">
          <div className="container">
            <ul className="nav nav-inline float-xs-left">
              <i className="text-muted fa fa-bug fa-lg"></i>
            </ul>
            <ul className="nav nav-inline float-xs-right">
              <li className="nav-item">
                <a href="https://dox-exceptions-api.herokuapp.com/graphql">GraphiQL</a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/doximity/exceptions-graphql">Server</a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/doximity/exceptions-relay">Client</a>
              </li>
            </ul>
          </div>
        </footer>
      </section>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any
};

export default App;
