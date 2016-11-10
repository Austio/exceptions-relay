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
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on createDeveloperPayload @relay(pattern: true) {
        developers
        developerEdge
      }
    `;
  }

  getConfigs() {
    return [{
      type: "RANGE_ADD",
      connectionName: "developers",
      edgeName: "developerEdge",
      rangeBehaviors: {}
    }];
  }
}

export default CreateDeveloper;
