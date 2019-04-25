import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { addBookMutation } = this.props;
    const { name, genre, authorId} = this.state;
    addBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({
      name: '',
      genre: '',
      authorId: ''
    });
  }

  displayAuthors () {
    const { getAuthorQuery } = this.props;
    if (getAuthorQuery.loading) {
      return( <option disabled>Loading authors</option> );
    } else {
      return getAuthorQuery.authors.map(author => {
        return( <option key={ author.id } value={author.id}>{ author.name }</option> );
      });
    }
  }

  render(){
    const {
      name,
      genre,
      authorId
    } = this.state;
    return(
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={name}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            onChange={this.handleChange}
            value={genre}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="authorId" value ={authorId} onChange={this.handleChange}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorQuery, {name: "getAuthorQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(BookList);
