import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Header from './components/Header';
import AddAuthor from './components/AddAuthor';
import AuthorsList from './components/AuthorsList';

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={BookList} />
          <Route path="/add-book" component={AddBook} />
          <Route path="/add-author" component={AddAuthor} />
          <Route path="/authors" component={AuthorsList} />
        </Switch>
      </Router>
    )
  }
}

export default AppRoutes;