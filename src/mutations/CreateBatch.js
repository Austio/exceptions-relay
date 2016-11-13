import Relay from "react-relay";

class CreateBatch extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createBatch }`;
  }

  getVariables() {
    return {
      startDate: this.props.startDate,
      termId: this.props.termId,
      bugs: this.props.bugs,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on createBatchPayload {
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

export default CreateBatch;
