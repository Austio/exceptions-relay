import Relay from "react-relay";

class CreateBatch extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createBatch }`;
  }

  getVariables() {
    return {
      startDate: this.props.startDate,
      termId: this.props.termId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on createBatchPayload {
        batch
      }
    `;
  }

  getConfigs() {
    return [{
      type: "RANGE_ADD",
      connectionName: "batches",
      edgeName: "batchEdge",
      rangeBehaviors: {
        "": "append",
      }
    }];
  }
}

export default CreateBatch;
