/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

class familytree extends React.Component {
  render() {
    const siteTitle = 'Theta Tau | SJSU';
    const {
      logo
    } = this.props.data;
    return (
      <section>
        <Helmet title={siteTitle} />
        <NavBar />
        <section id="header">
          <Img
            fluid={logo.childImageSharp.fluid}
            alt="Theta Tau Logo"
            style={{
					  margin: 'auto',
					  width: '17%',
					  minWidth: '50px'
            }}
          />
          <h1>
            <strong>Family Tree</strong>
          </h1>
          <p>
            <b>Theta Tau SJSU Colony</b>
          </p>
        </section>
        <div className="about">

          <section className="main style1 special">
            <div className="grid-wrapper left-text">
              <div className="col-3" />
              <div className="col-12">
                <header className="major">
                  <h2>
                    <b>Gear Family</b>
                  </h2>
                </header>
                <div className="col-6">
                  <div className="tree">
                    <ul>
                      <li>
                    <a href="#">Emerson Ye</a>
                    <ul>
                    <li>
                    <a href="#">Jonathan Wong</a>
                    <ul>
                    <li><a href="#">William Nguyen</a></li>
                    <li>
                    <a href="#">Jan Rodriguez</a>
                    <ul>
                    <li>
                    <a href="#">Alexander Ong</a>
                  </li>
                  </ul>
                  </li>
                    <li><a href="#">Daniel Suh</a></li>
                  </ul>
                  </li>
                  </ul>
                  </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-3" />

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

export default familytree;
