import Relay from "react-relay";

export default class CreateAccessTokenMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { updateBug }`;
  }

  getVariables() {
    return { id: this.props.id, completed: this.props.completed };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on updateBugPayload {
        bug
        batch
        assignee
      }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        bug: this.props.id,
        batch: this.props.batchId,
        assignee: this.props.assigneeId,
      },
    }];
  }
}
