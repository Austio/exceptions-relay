// @flow

import React from "react";
import BugRow from "./BugRow";

class Batch extends React.Component {
  get startDate() {
    const options = { day: "numeric", month: "numeric", year: "numeric" };

    if (this.props.batch.startDate) {
      const date = new Date(this.props.batch.startDate);
      return date.toLocaleString("en-US", options);
    } else {
      return null;
    }
  }
  get totalCompleted() {
    return this.props.batch.bugs.edges.filter(edge => edge.node.completedAt).length;
  }
  get total() {
    return this.props.batch.bugs.edges.length;
  }
  get progressColor() {
    const percent = (this.totalCompleted / this.total) * 100;

    if (percent > 80) {
      return "progress progress-success";
    } else if (this.percent > 70) {
      return "progress progress-warning";
    } else {
      return "progress progress-danger";
    }
  }
  get percentColor() {
    const percent = (this.totalCompleted / this.total) * 100;

    if (percent > 80) {
      return "year text-success text-xs-right";
    } else if (this.percent > 70) {
      return "year text-warning text-xs-right";
    } else {
      return "year text-danger text-xs-right";
    }
  }
  get percent() {
    if (this.total === 0) {
      return (0).toFixed(2);
    }

    return ((this.totalCompleted / this.total) * 100).toFixed(2);
  }
  render() {
    return (
      <section>
        <div className="row">
          <div className="col-sm-6">
            <h6 className="year">{this.startDate}</h6>
          </div>

          <div className="col-sm-6">
            <h6 className={this.percentColor}>{this.percent}%</h6>
          </div>
        </div>
        <progress className={this.progressColor} value={this.totalCompleted} max={this.total}></progress>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Assignor</th>
              <th>Assignee</th>
              <th>Reference</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {this.props.batch.bugs.edges.map(edge =>
              <BugRow bug={edge.node} key={edge.node.id} />
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

Batch.propTypes = {
  batch: React.PropTypes.any
};

export default Batch;
