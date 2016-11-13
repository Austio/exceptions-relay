// @flow

import React from "react";
import Relay from "react-relay";
import CreateBugMutation from "../mutations/CreateBug";

class NewBug extends React.Component {
  _handleSubmit(e) {
    e.preventDefault();

    const onSuccess = () => {
      this.props.router.push("/batches");
    };

    this.props.relay.commitUpdate(
      new CreateBugMutation({
        reference: this.refs.newBugReference.value,
        assigneeId: this.refs.newBugDeveloper.value,
        teamId: this.refs.newBugTeam.value,
        batchId: this.refs.newBugBatch.value,
        viewer: this.props.viewer,
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
          <label htmlFor="team">Team</label>
          <select required ref="newBugTeam" className="form-control form-control-lg" id="team">
            {this.props.viewer.query.teams.edges.map(edge =>
              <option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>
            )}
          </select>
          <small className="text-muted">Team designation is required</small>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="developer">Assignee</label>
          <select ref="newBugDeveloper" className="form-control form-control-lg" id="developer">
            <option />
            <optgroup label="Assignees">
              {this.props.viewer.query.developers.edges.filter(e => e.node.isAssignee).map(edge =>
                <option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>
              )}
            </optgroup>
            <optgroup label="Other">
              {this.props.viewer.query.developers.edges.filter(e => !e.node.isAssignee).map(edge =>
                <option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>
              )}
            </optgroup>
          </select>
          <small className="text-muted">Assignee designation is optional but recommended</small>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="batch">Batch</label>
          <select ref="newBugBatch" className="form-control form-control-lg" id="batch">
            <option />
            {this.props.viewer.query.batches.edges.map(edge =>
              <option value={edge.node.id} key={edge.node.id}>{edge.node.startDate.toLocaleString("en-US", { day: "numeric", month: "short", hour: "numeric" })}</option>
            )}
          </select>
          <small className="text-muted">Omitting will make the bug available for assignment as early as the next batch</small>
        </fieldset>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

NewBug.propTypes = {
  viewer: React.PropTypes.any,
  router: React.PropTypes.any,
  relay: React.PropTypes.any
};

export default Relay.createContainer(NewBug, {
  initialVariables: {
    first: 100
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Developer {
        id
        query {
          batches(first: $first) {
            edges {
              node {
                id
                startDate
              }
            },
          },
          teams(first: $first, orderBy: { direction: ASC, field: NAME }) {
            edges {
              node {
                id
                name
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
      }
    `,
  },
});
