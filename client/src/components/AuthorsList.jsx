import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorQuery, deleteAuthorMutation }  from '../queries/queries';
import { map } from 'lodash';

import EditAuthor from './EditAuthor';

class AuthorsList extends Component {
  constructor() {
    super();

    this.state = {
      ID: null,
      isEdit: false,
    }
  
    this.editAuthor = this.editAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  editAuthor(ID) {
    this.setState({
      isEdit: true,
      ID,
    });
  }

  deleteAuthor(ID) {
    const { deleteAuthorMutation } = this.props;
    deleteAuthorMutation({
      variables: {
        id: ID,
      },
      refetchQueries: [{ query: getAuthorQuery}]
    })
  }

  renderAuthorList() {
    const { getAuthorQuery: { loading, authors} } = this.props;
    if(loading) {
      return 'Loading.....';
    } else {
      return (
        map(authors, author => (
          <li key={author.id}>
            {author.name}
            <button onClick={() => this.editAuthor(author.id)}> Edit </button>
            <button onClick={() => this.deleteAuthor(author.id)}> Delete </button>
          </li>
        ))
      )      
    }
  } 

  render() {
    const { isEdit, ID } = this.state;
    return (
      <div>
        <h4>Authors List:</h4>
        <ul>
          {this.renderAuthorList()}
        </ul> 
        {
          isEdit && <EditAuthor authorID={ID}/>
        }
      </div>
    )
  }
}

export default compose(
  graphql(getAuthorQuery, {name: 'getAuthorQuery'}),
  graphql(deleteAuthorMutation, { name: 'deleteAuthorMutation'})
)(AuthorsList);