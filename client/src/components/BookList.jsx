import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery, deleteBookMutation } from '../queries/queries';

// componets
import BookDetails from './BookDetails';
import EditBook from './EditBook';

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      isEdit: false,
    }
    this.updateEdit = this.updateEdit.bind(this);
    this.updateSelect = this.updateSelect.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }
  

  updateSelect(ID) {
    this.setState({ selected: ID });
  }

  updateEdit(ID) {
    this.setState({ isEdit: true, selected: ID });
  }

  deleteBook(ID) {
    const { deleteBookMutation } = this.props;
    deleteBookMutation({
      variables: {
        id: ID
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  displayBooks () {
    console.log(this.props)
    const { getBooksQuery } = this.props;
    if (getBooksQuery.loading) {
      return (<div>Books are Loading....</div>)
    } else {
      return (
        getBooksQuery.books.map(book => (
          <li key={book.id}>
            {book.name}
            <button onClick={() => this.updateEdit(book.id)}> Edit </button>
            <button onClick={() => this.deleteBook(book.id)}> Delete </button>
            <button onClick={() => this.updateSelect(book.id)}> Show </button>
          </li>
        ))
      );
    }
  }

  render(){
    const { selected, isEdit } = this.state;
      return(
        <div>
          <ul id="book-list">
            {this.displayBooks()}
          </ul>
          {/* <BookDetails bookId={selected} /> */}
          {isEdit && <EditBook bookId={selected} />}
        </div>
      );
  }
}

export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery'}),
  graphql(deleteBookMutation, { name: 'deleteBookMutation'}),
)(BookList)