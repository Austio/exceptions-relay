// @flow

import React from "react";
import Relay from "react-relay";
import CreateAccessTokenMutation from "../mutations/CreateAccessToken.jsx";

class DeveloperList extends React.Component {
  render() {
    return (
      <h6 className="year">Loading</h6>
    );
  }
  componentDidMount() {
    const code = this.props.location.query.code;

    const onSuccess = (response) => {
      const token = response.createAccessToken.accessToken;
      localStorage.token = token.accessToken;
      window.location = "/";
    };

    Relay.Store.commitUpdate(
      new CreateAccessTokenMutation({ code }),
      { onSuccess }
    );
  }
}

DeveloperList.propTypes = {
  location: React.PropTypes.any,
};

export default DeveloperList;
