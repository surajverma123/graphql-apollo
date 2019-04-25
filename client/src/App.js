import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import AppRoutes from './AppRoutes';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppRoutes />
      </ApolloProvider>
    );
  }
}

export default App;
