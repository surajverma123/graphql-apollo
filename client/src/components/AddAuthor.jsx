import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { addAuthorMutation, getAuthorQuery } from '../queries/queries';

class AddAuthor extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { addAuthorMutation } = this.props;
    const { name, age} = this.state;
    addAuthorMutation({
      variables: {
        name: name,
        age: parseInt(age),
      },
      refetchQueries: [{ query: getAuthorQuery }]
    });
    this.setState({
      name: '',
      age: 0
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { name, age } = this.state;
    return (
      <div>
        <h1>Add a new Author</h1>
        <form id="add-book" onSubmit={this.handleSubmit}>
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
  graphql(addAuthorMutation,  {name: 'addAuthorMutation'})
) (AddAuthor);
