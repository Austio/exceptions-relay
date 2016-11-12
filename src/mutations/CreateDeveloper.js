import Relay from "react-relay";

class CreateDeveloper extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createDeveloper }`;
  }

  getVariables() {
    return {
      name: this.props.name,
      githubUsername: this.props.githubUsername,
      assignorId: this.props.assignorId,
      teamId: this.props.teamId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on createDeveloperPayload {
        viewer
      }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        viewer: this.props.viewer.id,
      }
    }];
  }
}

export default CreateDeveloper;
