import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import firebase, { auth, provider } from '../services/firebase.js';
import {
  linkLoginRequest, checkLinkLogin, isLoggedIn, getUser
} from '../services/auth.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    // Breaks if this function is removed
  }

  logout() {
    auth.signOut().then((result) => {
      this.setState({
        user: null
      });
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }


  render() {
    if (isLoggedIn()) {
      loggedInUser = getUser();
      if (loggedInUser) {
        this.setState({
          user: result.user
        });
      }
    }
    const authButton = this.state.user
      ? <GatsbyLink onClick={this.logout}>Log Out</GatsbyLink>
      : <GatsbyLink to="/login">Log In</GatsbyLink>;
    const userInfo = this.state.user
      ? <GatsbyLink to="/brofile" state={{ id: this.state.user.uid }}>
        {this.state.user.email}
        {' '}

      </GatsbyLink>
      : null;
    // console.log(userInfo);
    return (

      <Navbar
        expand="lg"
        variant="dark"
        style={{ padding: '20px 10px', backgroundColor: '#883a3a' }}
      >
        <GatsbyLink to="/">
          <span className="navbar-brand mb-0 h1" style={{ color: 'white' }}>
            Theta Tau V2.0  | SJSU
          </span>
        </GatsbyLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Item>
              <GatsbyLink to="/">Home</GatsbyLink>
            </Nav.Item>
            <Nav.Item>
              <GatsbyLink to="/about">Who We Are</GatsbyLink>
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

            <Nav.Item>
              {authButton}
            </Nav.Item>
            <Nav.Item>
              {userInfo}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
