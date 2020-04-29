/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn } from "../services/auth";
import { linkLoginRequest } from '../services/auth.js';
import {Collapse} from 'react-bootstrap';

class Login extends React.Component {
  
  /* Handles login form*/
  state = {
    email: "",
    submitted : false
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    linkLoginRequest(this.state.email);
    this.setState({
      submitted: true,
    })

    
  }
  


  render() {
    const siteTitle = 'Theta Tau | SJSU';
    const {
      logo
    } = this.props.data;

    return (
      <section>
        <Helmet title={siteTitle} />
        <NavBar />
        <section id="header" className="about-background">
          <Img
            fluid={logo.childImageSharp.fluid}
            alt="Theta Tau Logo"
            style={{
              margin: 'auto',
              width: '17%',
              minWidth: '100px'
            }}
          />
          <h1>
            <strong>One Click Login</strong>
          </h1>

          <p>
            <b>Into the Theta Tau SJSU Colony</b>
          </p>


          
        </section>
        <div className="login">
          <section className="main style1 special">
            <div className="grid-wrapper left-text">
              <div>
                <Collapse in={!this.state.submitted}>
                <form name = "loginForm" onSubmit={this.handleSubmit}>
                  <label>
                    <h3>Email</h3>
                  </label>
                  <br></br>
                  <label>
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <br></br>
                  <label>
                  <button type="submit">Send Me A Login Link</button>
                  </label>
                </form>
                </Collapse>
                
                <Collapse in={this.state.submitted}>
                  <a>A link to login was sent to your email address</a>
                
                </Collapse>
              </div>
            </div>

            
          </section>
        </div>

        <Footer />
      </section>
    );
  }
}

export const query = graphql`
  query {
    logo: file(relativePath: { eq: "thetatau.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Login;

