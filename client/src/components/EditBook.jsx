import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  getAuthorQuery,
  addBookMutation,
  getBooksQuery,
  updateBookMutation,
  getBookQuery
} from '../queries/queries';

class EditBook extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: '',
      genre: '',
      authorId: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBookState = this.updateBookState.bind(this);

  }

  componentWillReceiveProps({ data: { book } }) {
    if (book) {
      this.updateBookState(book);
    }
  }

  updateBookState(data) {
    const id = data.author.id
    const obj = {
      id: data.id,
      name: data.name,
      genre: data.genre,
      authorId: id,
    };
    this.setState(obj)
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { updateBookMutation, bookId } = this.props;
    const { name, genre, authorId } = this.state;

    updateBookMutation({
      variables: {
        id: bookId,
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

  displayAuthors() {
    const { getAuthorQuery } = this.props;
    if (getAuthorQuery.loading) {
      return (<option disabled>Loading authors</option>);
    } else {
      return getAuthorQuery.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      });
    }
  }

  render() {
    const {
      name,
      genre,
      authorId
    } = this.state;
    return (
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
          <select name="authorId" value={authorId} onChange={this.handleChange}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(updateBookMutation, { name: 'updateBookMutation' }),
  graphql(getBookQuery, {
    options: (props) => {
      return {
        variables: {
          id: props.bookId
        }
      }
    }
  })
)(EditBook);
