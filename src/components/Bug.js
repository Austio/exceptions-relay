// @flow

import React from "react";
import Relay from "react-relay";
import DeleteBugMutation from "../mutations/DeleteBug";
import UpdateBugMutation from "../mutations/UpdateBug";

class Bug extends React.Component {
  _handleCompleted() {
    const onSuccess = () => {
      this.props.router.push("/batches");
    };

    this.props.relay.commitUpdate(
      new UpdateBugMutation({
        id: this.props.node.id,
        assigneeId: this.props.node.assignee.id,
        batchId: this.props.node.batch.id,
        viewer: this.props.viewer,
        completed: true
      }), { onSuccess }
    );
  }

  _handleIncomplete() {
    const onSuccess = () => {
      this.props.router.push("/batches");
    };

    this.props.relay.commitUpdate(
      new UpdateBugMutation({
        id: this.props.node.id,
        assigneeId: this.props.node.assignee.id,
        batchId: this.props.node.batch.id,
        viewer: this.props.viewer,
        completed: false
      }), { onSuccess }
    );
  }

  _handleDelete() {
    const onSuccess = () => {
      this.props.router.push("/batches");
    };

    this.props.relay.commitUpdate(
      new DeleteBugMutation({
        id: this.props.node.id,
        batchId: this.props.node.batch.id,
        viewer: this.props.viewer,
        assigneeId: this.props.node.assignee.id,
      }), { onSuccess }
    );
  }

  render() {
    return (
      <section>
        <a href={this.props.node.reference}>
          <h6 className="year">
            {this.props.node.reference}
          </h6>
        </a>
        {this.props.node.completedAt ? (
          <button type="button" className="btn btn-danger" onClick={this._handleIncomplete.bind(this)}>Mark incomplete</button>
        ) : (
          <button type="button" className="btn btn-success" onClick={this._handleCompleted.bind(this)}>Mark as complete or in staging</button>
        )}
        {" "}
        <button type="button" className="btn btn-danger" onClick={this._handleDelete.bind(this)}>
          Destroy (invalid for whatever reason)
        </button>
      </section>
    );
  }
}

Bug.propTypes = {
  node: React.PropTypes.any,
  relay: React.PropTypes.any,
  router: React.PropTypes.any
};

export default Relay.createContainer(Bug, {
  initialVariables: {
    first: 100,
    id: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Developer {
        id
      }
    `,
    node: () => Relay.QL`
      fragment on Bug {
        id
        reference
        completedAt
        batch {
          id
        }
        assignee {
          id
        }
      }
    `,
  },
});
