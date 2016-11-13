// @flow

import React from "react";
import Relay from "react-relay";
import Batch from "./Batch";
import { Link } from "react-router";

class BatchList extends React.Component {
  get nextPageClass() {
    if (this.props.viewer.query.batches.pageInfo.hasNextPage) {
      return "page-item";
    } else {
      return "page-item disabled";
    }
  }
  render() {
    return (
      <section>
        {this.props.viewer.query.batches.edges.map(edge =>
          <Batch batch={edge.node} key= {edge.node.id} />
        )}
        <nav aria-label="Page navigation">
          <ul className="pagination float-xs-right">
            <li className={this.nextPageClass}>
              <Link to={{ pathname: "batches", query: { after: this.props.viewer.query.batches.pageInfo.endCursor } }} className="page-link">Older</Link>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

BatchList.propTypes = {
  viewer: React.PropTypes.any
};

export default Relay.createContainer(BatchList, {
  initialVariables: {
    after: null,
    batchLimit: 1,
    bugsLimit: 100,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Developer {
        query {
          batches(first: $batchLimit, after: $after) {
            pageInfo {
              endCursor
              hasNextPage
            }
            edges {
              node {
                id
                startDate
                bugs(first: $bugsLimit, orderBy: { field: CREATED_AT, direction: ASC }) {
                  totalCount
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
            },
          }
        }
      }
    `,
  },
});
