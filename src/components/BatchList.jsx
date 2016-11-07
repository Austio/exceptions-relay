// @flow

import React from "react";
import Relay from "react-relay";
import Batch from "./Batch.jsx";
import { Link } from "react-router";

class BatchList extends React.Component {
  get nextPageClass() {
    if (this.props.query.batches.pageInfo.hasNextPage) {
      return "page-item";
    } else {
      return "page-item disabled";
    }
  }
  render() {
    return (
      <section>
        {this.props.query.batches.edges.map(edge =>
          <Batch batch={edge.node} key= {edge.node.id} />
        )}
        <nav aria-label="Page navigation">
          <ul className="pagination float-xs-right">
            <li className={this.nextPageClass}>
              <Link to={{ pathname: "batches", query: { after: this.props.query.batches.pageInfo.endCursor } }} className="page-link">Older</Link>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

BatchList.propTypes = {
  query: React.PropTypes.any
};

export default Relay.createContainer(BatchList, {
  initialVariables: {
    after: null
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        batches(first: 1, after: $after) {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              id
              startDate
              bugs(first: 100, orderBy: { field: CREATED_AT, direction: ASC }) {
                totalCount
                edges {
                  node {
                    id
                    assignor {
                      name
                    }
                    assignee {
                      name
                    }
                    reference
                    completedAt
                  }
                }
              }
            }
          },
        }
      }
    `,
  },
});
