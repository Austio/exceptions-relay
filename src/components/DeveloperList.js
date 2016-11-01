// @flow

import React from 'react';
import Relay from 'react-relay';

class DeveloperList extends React.Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Assignor</th>
            <th>Developer</th>
            <th>Completed</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Last bug</th>
          </tr>
        </thead>
        <tbody>
          {this.props.developers.edges.map(edge =>
            <tr key={edge.node.id}>
              <td>{edge.node.name}</td>
              <td>{edge.node.assignor.name}</td>
              <td>{edge.node.completedBugs.totalCount}</td>
              <td>{edge.node.bugs.totalCount}</td>
              <td>95%</td>
              <td>Today</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Relay.createContainer(DeveloperList, {
  fragments: {
    developers: () => Relay.QL`
      fragment on DeveloperConnection {
          edges {
            node {
              id
              name
              assignor {
                name
              }
              bugs {
                totalCount
              }
              completedBugs: bugs(isCompleted: true) {
                totalCount
              }
              lastBug: bugs(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
                edges {
                  node {
                    createdAt
                  }
                }
              }
          },
        }
      }
    `,
  },
});

