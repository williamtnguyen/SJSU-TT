import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
//import Navbar from 'react-bootstrap/Navbar';
//import Nav from 'react-bootstrap/Nav';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import firebase, { auth, provider } from '../services/firebase.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }
  login() {
    auth.signInWithPopup(provider).then((result) => {
      this.setState({
          user: result.user
      })
    })
  }
  logout() {
    auth.signOut().then((result) => {
      this.setState({
        user: null
      })
    })
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user})
      }
    })
  }

  render() {
    let authButton = this.state.user ?
      <GatsbyLink onClick={this.logout}>Log Out</GatsbyLink> :
      <GatsbyLink onClick={this.login}>Log In</GatsbyLink>
    let userInfo = this.state.user ?
      <GatsbyLink> {this.state.user.email} </GatsbyLink> :
      null
    
    return (
      
      <Navbar
        expand="lg"
        variant = "dark"
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
