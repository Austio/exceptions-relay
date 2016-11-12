import Relay from "react-relay";

export default class CreateBug extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createBug }`;
  }

  getVariables() {
    return {
      reference: this.props.reference,
      assigneeId: this.props.assigneeId,
      teamId: this.props.teamId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on createBugPayload {
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
