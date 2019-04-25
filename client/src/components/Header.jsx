import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <Nav
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link> <Link to="/">BookList</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/add-book"> Add Book </Link> </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/add-author"> Add Author </Link> </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to="/authors"> Authors </Link> </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }
}

export default Header;