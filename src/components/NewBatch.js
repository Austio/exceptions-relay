// @flow

import React from "react";
import Relay from "react-relay";
import CreateBatchMutation from "../mutations/CreateBatch";

class NewBatch extends React.Component {
  constructor(props) {
    super(props);
    this.newBugs = [];
  }

  _handleSubmit(e) {
    e.preventDefault();

    const onSuccess = () => {
      this.props.router.push("/batches");
    };

    this.props.relay.commitUpdate(
      new CreateBatchMutation({
        startDate: this.refs.newBatchStartDate.value,
        termId: this.refs.newBatchTermId.value,
        viewer: this.props.viewer,
        bugs: this.newBugs.map(bugInput => {
          return { id: bugInput.id, assigneeId: bugInput.input.value };
        }),
      }), { onSuccess }
    );
  }

  render() {
    return (
      <form className="year" onSubmit={this._handleSubmit.bind(this)}>
        <fieldset className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input id="startDate" required ref="newBatchStartDate" type="date" className="form-control" />
          <small className="text-muted">Date corresponding to the new batch</small>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="term">Term</label>
          <select required ref="newBatchTermId" className="form-control form-control-lg" id="term">
            {this.props.viewer.query.terms.edges.map(edge =>
              <option value={edge.node.id} key={edge.node.id}>{edge.node.year}</option>
            )}
          </select>
          <small className="text-muted">Explicitly maps groups of batches</small>
        </fieldset>
        {this.props.viewer.query.bugs.edges.map(edge =>
          <section key={edge.node.id}>
            <fieldset className="form-group row">
              <label className="col-xs-2 col-form-label">Assignor</label>
              <div className="col-xs-10">
                <p className="form-control-static mb-0">{edge.node.assignor.name}</p>
              </div>
            </fieldset>
            <fieldset className="form-group row">
              <label className="col-xs-2 col-form-label">Team</label>
              <div className="col-xs-10">
                <p className="form-control-static mb-0">{edge.node.team.name}</p>
              </div>
            </fieldset>
            <fieldset className="form-group row">
              <label className="col-xs-2 col-form-label" htmlFor="assignee">Assignee</label>
              <div className="col-xs-10">
                <select required ref={(input) => this.newBugs.push({ id: edge.node.id, input: input })} defaultValue={edge.node.assignee && edge.node.assignee.id} className="form-control" id="assignee">
                  <optgroup label="Team Members">
                    {this.props.viewer.query.developers.edges.filter(developer => developer.node.team.id === edge.node.team.id).map(developerEdge =>
                      <option value={developerEdge.node.id} key={developerEdge.node.id}>{developerEdge.node.name}</option>
                    )}
                  </optgroup>
                  <optgroup label="Others">
                    {this.props.viewer.query.developers.edges.filter(developer => developer.node.team.id !== edge.node.team.id).map(developerEdge =>
                      <option value={developerEdge.node.id} key={developerEdge.node.id}>{developerEdge.node.name}</option>
                    )}
                  </optgroup>
                </select>
              </div>
            </fieldset>
            <fieldset className="form-group row">
              <label className="col-xs-2 col-form-label">Reference</label>
              <div className="col-xs-10">
                <p className="form-control-static mb-0">{edge.node.reference}</p>
              </div>
            </fieldset>
          </section>
        )}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

NewBatch.propTypes = {
  viewer: React.PropTypes.any,
  router: React.PropTypes.any,
  relay: React.PropTypes.any,
};

export default Relay.createContainer(NewBatch, {
  initialVariables: {
    first: 100,
    unassigned: true,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Developer {
        id
        query {
          developers(first: $first, orderBy: { field: NAME, direction: ASC }) {
            edges {
              node {
                id
                name
                team {
                  id
                  name
                }
              }
            }
          }
          bugs(first: $first, unassigned: $unassigned) {
            edges {
              node {
                id
                assignor {
                  id
                  name
                }
                assignee {
                  id
                }
                team {
                  id
                  name
                }
                reference
              }
            }
          }
          terms(first: $first) {
            edges {
              node {
                id
                year
              }
            },
          }
        }
      }
    `,
  },
});
