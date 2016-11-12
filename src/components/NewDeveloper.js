// @flow

import React from "react";
import Relay from "react-relay";
import CreateDeveloperMutation from "../mutations/CreateDeveloper";

class NewDeveloper extends React.Component {
  _handleSubmit(e) {
    e.preventDefault();

    const onSuccess = () => {
      this.props.router.push("/");
    };

    this.props.relay.commitUpdate(
      new CreateDeveloperMutation({
        name: this.refs.newDeveloperName.value,
        githubUsername: this.refs.newDeveloperGithubUsername.value,
        assignorId: this.refs.newDeveloperAssignor.value,
        teamId: this.refs.newDeveloperTeam.value,
        viewer: this.props.viewer
      }), { onSuccess }
    );
  }

  render() {
    return (
      <form className="year" onSubmit={this._handleSubmit.bind(this)}>
        <fieldset className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" required type="text" className="form-control" ref="newDeveloperName" />
          <small className="text-muted">Full name</small>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="githubUsername">GitHub Username</label>
          <input id="githubUsername" required type="text" className="form-control" ref="newDeveloperGithubUsername" />
          <small className="text-muted">Links authenticated users to developers</small>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="assignor">Assignor</label>
          <select required ref="newDeveloperAssignor" className="form-control form-control-lg" id="assignor">
            {this.props.viewer.query.developers.edges.map(edge =>
              <option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>
            )}
          </select>
          <small className="text-muted">The person ultimately responsible for making sure a bug is assigned</small>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="team">Team</label>
          <select required ref="newDeveloperTeam" className="form-control form-control-lg" id="team">
            {this.props.viewer.query.teams.edges.map(edge =>
              <option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>
            )}
          </select>
          <small className="text-muted">The team the developer belongs to</small>
        </fieldset>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

NewDeveloper.propTypes = {
  viewer: React.PropTypes.any,
  router: React.PropTypes.any,
  relay: React.PropTypes.any
};

export default Relay.createContainer(NewDeveloper, {
  initialVariables: {
    first: 100
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Developer {
        id
        query {
          teams(first: $first, orderBy: { direction: ASC, field: NAME }) {
            edges {
              node {
                id
                name
              }
            }
          }
          developers(first: $first, orderBy: { direction: ASC, field: NAME }) {
            edges {
              node {
                id
                name
              }
            },
          }
        }
      }
    `,
  },
});

