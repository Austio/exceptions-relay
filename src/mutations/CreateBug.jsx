import Relay from "react-relay";

export default class CreateBug extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createBug }`;
  }

  getVariables() {
    return {
      reference: this.props.reference,
      assigneeId: this.props.assigneeId,
      batchId: this.props.batchId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on createBugPayload {
        bug
      }
    `;
  }

  getConfigs() {
    return [{
      type: "RANGE_ADD",
      connectionName: "bugs",
      edgeName: "bugEdge",
      rangeBehaviors: {
        "": "append",
      }
    }];
  }
}
