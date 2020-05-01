import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Header = () => (
  <StaticQuery
    query={graphql`
  query {
    logo: file(relativePath: { eq: "thetatau.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  },
`}
    render={(data) => (
      <section id="header" className="home-background">
        <div className="inner">
          <Img
            fluid={data.logo.childImageSharp.fluid}
            alt="Theta Tau Logo"
            style={{
              margin: 'auto',
              width: '17%',
              minWidth: '100px'
            }}
          />
          <h1>
            <strong>Theta Tau</strong>
          </h1>
          <h5>Co-ed Professional Engineering Fraternity | SJSU Chapter</h5>
          <div id="extend-height" />
          <ul className="">
            <li />
          </ul>
        </div>
      </section>
    )}
  />
);


export default Header;
