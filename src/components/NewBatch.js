// @flow

import React from "react";
import Relay from "react-relay";
import CreateBatchMutation from "../mutations/CreateBatch";

class NewBatch extends React.Component {
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
      new CreateBatchMutation({
        startDate: this.refs.newBatchStartDate.value,
        termId: this.refs.newBatchTermId.value,
      }), { onSuccess }
    );
  }

  render() {
    return (
      <form className="year" onSubmit={this._handleSubmit.bind(this)}>
        <fieldset className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input id="startDate" required ref="newBatchStartDate" type="date" className="form-control" />
          <small className="text-muted">Date corresponding to the new batch</small>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="term">Term</label>
          <select required ref="newBatchTermId" className="form-control form-control-lg" id="term">
            {this.props.query.terms.edges.map(edge =>
              <option value={edge.node.id} key={edge.node.id}>{edge.node.year}</option>
            )}
          </select>
          <small className="text-muted">Explicitly maps groups of batches</small>
        </fieldset>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

NewBatch.propTypes = {
  query: React.PropTypes.any,
  router: React.PropTypes.any,
  relay: React.PropTypes.any
};

export default Relay.createContainer(NewBatch, {
  initialVariables: {
    first: 100
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        batches(first: 1) {
          edges {
            node {
              id
            }
          }
        }
        terms(first: $first) {
          edges {
            node {
              id
              year
            }
          },
        }
      }
    `,
  },
});
