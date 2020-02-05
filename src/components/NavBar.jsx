import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavBar extends React.Component {
  render() {
    return (
      <Navbar
        expand="lg"
        style={{ padding: '20px 10px', backgroundColor: '#883a3a' }}
      >
        <GatsbyLink to="/">
          <span className="navbar-brand mb-0 h1" style={{ color: 'white' }}>
            Theta Tau | SJSU
          </span>
        </GatsbyLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Item>
              <GatsbyLink to="/">Home</GatsbyLink>
            </Nav.Item>
            <Nav.Item>
              <GatsbyLink to="/about">About</GatsbyLink>
            </Nav.Item>
            <Nav.Item>
              <GatsbyLink to="/brothers">Brothers</GatsbyLink>
            </Nav.Item>
            <Nav.Item>
              <GatsbyLink to="/rush">Rush</GatsbyLink>
            </Nav.Item>
            <Nav.Item>
              <a href="https://forms.gle/vpZQPmBSQcVA2MeJ8">Apply</a>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
