// @flow

import React from "react";
import { Link } from "react-router";

class BugRow extends React.Component {
  get date() {
    const options = { day: "numeric", month: "short", hour: "numeric" };

    if (this.props.bug.completedAt) {
      const date = new Date(this.props.bug.completedAt);
      return date.toLocaleString("en-US", options);
    } else {
      return null;
    }
  }
  render() {
    return (
      <tr>
        <th scope="row"><Link to={`/bugs/${this.props.bug.id}`}>{this.props.bug.id}</Link></th>
        <td><Link to={`/developers/${this.props.bug.assignor.id}`}>{this.props.bug.assignor.name}</Link></td>
        <td><Link to={`/developers/${this.props.bug.assignee.id}`}>{this.props.bug.assignee.name}</Link></td>
        <td><a href={this.props.bug.reference}>{this.props.bug.reference}</a></td>
        <td>{this.date}</td>
      </tr>
    );
  }
}

BugRow.propTypes = {
  bug: React.PropTypes.any
};

export default BugRow;
