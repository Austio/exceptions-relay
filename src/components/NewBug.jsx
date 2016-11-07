// @flow

import React from "react";
import Relay from "react-relay";
import CreateBugMutation from "../mutations/CreateBug.jsx";
import BatchRow from "./BatchRow.jsx";

class NewBug extends React.Component {
  _handleSubmit(e) {
    e.preventDefault();

    const onReadyStateChange = (state) => {
      if (state.done) {
        this.props.router.push("/batches");
      }
    };

    // If Relay isn't going to work to update the client side graph without a
    // node we will just update manually.
    const onSuccess = () => {
      this.props.relay.forceFetch({}, onReadyStateChange);
    };

    this.props.relay.commitUpdate(
      new CreateBugMutation({
        reference: this.refs.newBugReference.value,
        assigneeId: this.refs.newBugDeveloper.value,
        batchId: this.refs.newBugBatch.value,
      }), { onSuccess }
    );
  }

  render() {
    return (
      <form className="year" onSubmit={this._handleSubmit.bind(this)}>
        <fieldset className="form-group">
          <label htmlFor="reference">Reference</label>
          <input id="reference" ref="newBugReference" required type="url" className="form-control" />
          <small className="text-muted">Pivotal Tracker or Bugsnag link</small>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="developer">Assignee</label>
          <select required ref="newBugDeveloper" className="form-control form-control-lg" id="developer">
            <optgroup label="Assignees">
              {this.props.query.developers.edges.filter(e => e.node.isAssignee).map(edge =>
                <option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>
              )}
            </optgroup>
            <optgroup label="Other">
              {this.props.query.developers.edges.filter(e => !e.node.isAssignee).map(edge =>
                <option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>
              )}
            </optgroup>
          </select>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="batch">Batch</label>
          <select required ref="newBugBatch" className="form-control form-control-lg" id="batch">
            {this.props.query.batches.edges.map(edge =>
              <BatchRow batch={edge.node} key={edge.node.id} />
            )}
          </select>
        </fieldset>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

NewBug.propTypes = {
  query: React.PropTypes.any,
  router: React.PropTypes.any,
  relay: React.PropTypes.any
};

export default Relay.createContainer(NewBug, {
  initialVariables: {
    first: 100
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        batches(first: $first) {
          edges {
            node {
              id
              startDate
            }
          },
        }
        developers(first: $first, orderBy: { direction: ASC, field: NAME }) {
          edges {
            node {
              id
              name
              isAssignee
            }
          },
        }
      }
    `,
  },
});


