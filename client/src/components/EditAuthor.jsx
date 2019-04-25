import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getSingleAuthorQuery }  from '../queries/queries';

class EditAuthor extends Component {
  constructor() {
    super();
    this.state= {
      name:'',
      age: 0,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps===================>>>>>>>>>", nextProps);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:  e.target.value,
    });
  }

  handleSubmit() {
    console.log("Submit========================>>>>>>>>>>>");
  }

  render() {
    console.log("PROPS RENDER", this.props)
    const { name, age } = this.state;
    return (
      <div>
        <h3>Edit Existing Author</h3>
          <form id="edit-author" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>Author name:</label>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name}
              />
            </div>
            <div className="field">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                onChange={this.handleChange}
                value={age}
              />
            </div>
            <button>+</button>
          </form>
      </div>
    )
  }
}

export default compose(
  graphql(getSingleAuthorQuery, { name: 'getSingleAuthorQuery'})
)(EditAuthor);