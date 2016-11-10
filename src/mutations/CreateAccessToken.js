import Relay from "react-relay";

export default class CreateAccessTokenMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createAccessToken }`;
  }

  getVariables() {
    return { code: this.props.code, };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on createAccessTokenPayload {
        accessToken { accessToken }
      }
    `;
  }

  getConfigs() {
    return [{
      type: "REQUIRED_CHILDREN",
      children: [
        Relay.QL`
        fragment on createAccessTokenPayload {
          accessToken { accessToken }
        }
        `,
      ],
    }];
  }
}
