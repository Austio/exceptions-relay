// @flow

import React from "react";
import Relay from "react-relay";
import DeveloperRow from "./DeveloperRow.jsx";
import { Link } from "react-router";

class DeveloperList extends React.Component {
  render() {
    return (
      <section>
        <ul className="nav nav-pills float-xs-right year">
          <li className="nav-item">
            <Link to={{ pathname: "/", query: { year: undefined } }} className="nav-link" activeClassName="active">Cumulative</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={{ pathname: "/", query: { year: 2016 } }} activeClassName="active">2016</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={{ pathname: "/", query: { year: 2015 } }} activeClassName="active">2015</Link>
          </li>
        </ul>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Developer</th>
              <th>Team</th>
              <th>Completed</th>
              <th>Total</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {this.props.query.developers.edges.map(edge =>
              <DeveloperRow developer={edge.node} key={edge.node.id}/>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

DeveloperList.propTypes = {
  query: React.PropTypes.any
};

export default Relay.createContainer(DeveloperList, {
  initialVariables: {
    year: null,
    first: 100
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        developers(first: $first, orderBy: { direction: ASC, field: NAME }) {
          edges {
            node {
              id
              name
              team {
                name
              }
              assignor {
                id
                name
              }
              bugs(year: $year) {
                totalCount
              }
              completedBugs: bugs(isCompleted: true, year: $year) {
                totalCount
              }
            }
          },
        }
      }
    `,
  },
});

