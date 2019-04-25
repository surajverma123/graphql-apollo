import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
   books {
     name
     id
   }   
  }
`;

const getAuthorQuery = gql`
  {
   authors {
     name
     id
   }   
  }
`;

const getSingleAuthorQuery = gql`
query($id: ID!){
    author(id: $id) {
      name
      age
    }
  }
`;

const addBookMutation = gql`
  mutation($name:String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

const deleteBookMutation = gql`
  mutation($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

const deleteAuthorMutation = gql`
  mutation($id: ID!) {
    deleteAuthor(id:  $id) {
      id
    }
  }
`;

const updateBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!, $id: ID!) {
    updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          id
          name
        }
      }
    }
  }
`;

export {
  getBooksQuery,
  getAuthorQuery,
  addBookMutation,
  getBookQuery,
  updateBookMutation,
  addAuthorMutation,
  deleteBookMutation,
  deleteAuthorMutation,
  getSingleAuthorQuery,
}