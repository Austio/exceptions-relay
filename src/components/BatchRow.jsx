// @flow

import React from "react";

class BatchRow extends React.Component {
  get startDate() {
    const options = { day: "numeric", month: "numeric", year: "numeric" };

    if (this.props.batch.startDate) {
      const date = new Date(this.props.batch.startDate);
      return date.toLocaleString("en-US", options);
    } else {
      return null;
    }
  }
  render() {
    return (
      <option value={this.props.batch.id}>{this.startDate}</option>
    );
  }
}

BatchRow.propTypes = {
  batch: React.PropTypes.any
};

export default BatchRow;
