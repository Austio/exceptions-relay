// @flow

import React from "react";
import Relay from "react-relay";
import BugRow from "./BugRow";

class Developer extends React.Component {
  render() {
    return (
      <section>
        <h6 className="year">{this.props.node.name}</h6>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Assignor</th>
              <th>Assignee</th>
              <th>Reference</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {this.props.node.bugs.edges.map(edge =>
              <BugRow bug={edge.node} key={edge.node.id} />
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

Developer.propTypes = {
  node: React.PropTypes.any
};

export default Relay.createContainer(Developer, {
  initialVariables: {
    limit: 100
  },
  fragments: {
    node: () => Relay.QL`
      fragment on Developer {
        id
        name
        bugs(first: $limit) {
          edges {
            node {
              id
              assignor {
                id
                name
              }
              assignee {
                id
                name
              }
              reference
              completedAt
            }
          }
        }
      }
    `,
  },
});
