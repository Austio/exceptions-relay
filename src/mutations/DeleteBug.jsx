import Relay from "react-relay";

export default class CreateAccessTokenMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { deleteBug }`;
  }

  getVariables() {
    return { id: this.props.id, };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on deleteBugPayload {
        batch
        assignee
      }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        batch: this.props.batchId,
        assignee: this.props.assigneeId
      },
    }];
  }
}

