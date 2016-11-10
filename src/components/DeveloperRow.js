// @flow

import React from "react";
import { Link } from "react-router";

class DeveloperRow extends React.Component {
  get percentColor(): string {
    if (this.percent > 80) {
      return "text-success";
    } else if (this.percent > 70) {
      return "text-warning";
    } else {
      return "text-danger";
    }
  }
  get date(): string {
    return this.props.developer.lastBug.edges.map(edge => {
      const options = { day: "numeric", month: "short", hour: "numeric" };
      const date = new Date(edge.node.createdAt);
      return date.toLocaleString("en-US", options);
    });
  }
  get percent(): number {
    if (this.props.developer.bugs.totalCount === 0) { return 0; }
    return (this.props.developer.completedBugs.totalCount / this.props.developer.bugs.totalCount) * 100;
  }
  render() {
    return (
      <tr>
        <td><Link to={`/developers/${this.props.developer.id}`}>{this.props.developer.name}</Link></td>
        <td>{this.props.developer.team.name}</td>
        <td>{this.props.developer.completedBugs.totalCount}</td>
        <td>{this.props.developer.bugs.totalCount}</td>
        <td className={this.percentColor}>{this.percent.toFixed(2) + "%"}</td>
      </tr>
    );
  }
}

DeveloperRow.propTypes = {
  developer: React.PropTypes.any
};

export default DeveloperRow;
