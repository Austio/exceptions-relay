// @flow

import React from "react";
import Relay from "react-relay";
import CreateDeveloperMutation from "../mutations/CreateDeveloper.jsx";

class NewDeveloper extends React.Component {
  _handleSubmit(e) {
    e.preventDefault();

    const onReadyStateChange = (state) => {
      if (state.done) {
        this.props.router.push("/");
      }
    };

    // If Relay isn't going to work to update the client side graph without a
    // node we will just update manually.
    const onSuccess = () => {
      this.props.relay.forceFetch({}, onReadyStateChange);
    };

    this.props.relay.commitUpdate(
      new CreateDeveloperMutation({
        name: this.refs.newDeveloperName.value,
        githubUsername: this.refs.newDeveloperGithubUsername.value,
        assignorId: this.refs.newDeveloperAssignor.value,
      }), { onSuccess }
    );
  }

  render() {
    return (
      <form className="year" onSubmit={this._handleSubmit.bind(this)}>
        <fieldset className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" required type="text" className="form-control" ref="newDeveloperName" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="githubUsername">GitHub Username</label>
          <input id="githubUsername" required type="text" className="form-control" ref="newDeveloperGithubUsername" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="assignor">Assignor</label>
          <select required ref="newDeveloperAssignor" className="form-control form-control-lg" id="assignor">
            {this.props.query.developers.edges.map(edge =>
              <option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>
            )}
          </select>
        </fieldset>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

NewDeveloper.propTypes = {
  query: React.PropTypes.any,
  router: React.PropTypes.any,
  relay: React.PropTypes.any
};

export default Relay.createContainer(NewDeveloper, {
  initialVariables: {
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
            }
          },
        }
      }
    `,
  },
});

