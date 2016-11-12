import Relay from "react-relay";

export default class UpdateBug extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { updateBug }`;
  }

  getVariables() {
    return {
      id: this.props.id,
      completed: this.props.completed
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on updateBugPayload {
        viewer
        bug
      }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        viewer: this.props.viewer.id,
      },
    }, {
      type: "FIELDS_CHANGE",
      fieldIDs: {
        bug: this.props.id,
      },
    }];
  }
}
