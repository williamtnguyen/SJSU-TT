/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

import 'bootstrap/dist/css/bootstrap.css';

class About extends React.Component {
  render() {
    const siteTitle = 'Theta Tau | SJSU';
    const { data } = this.props;
    const { history, pledgeEventPic } = data;

    return (
      <section>
        <Helmet title={siteTitle} />
        <NavBar />
        <section id="header" className="about-background">
          <h1>
            <strong>About Us</strong>
          </h1>
          <p>
            <b>Theta Tau SJSU Colony</b>
          </p>
        </section>
        <div className="about">
          <section className="main style1 special">
            <div className="row left-text about-block justify-content-md-center">
              <div className="col-lg-6 col-md-1 d-flex align-items-md-center order-2 order-lg-1">
                <div>
                  <header className="major">
                    <h2>
                      <b>Fraternity History</b>
                    </h2>
                  </header>
                  <p className="history-text">
                    Founded at the University of Minnesota in 1904, Theta Tau is
                    the nation's oldest and foremost fraternity for engineers.
                    With emphasis on quality and a strong fraternal bond, the
                    fraternity has chapters only at ABET accredited schools.
                    Theta Tau has initiated over 30,000 members, and carefully
                    follows a program in the selection and development of its
                    members that stresses the importance of high professional
                    ethics and exemplary practices. Within each chapter, the
                    fraternity stimulates professional activity and social
                    compatibility; provides a framework for group participation
                    in campus, community, engineering, and fraternity affairs;
                    and promotes lasting friendships - a lifetime of brotherhood
                    in an engineering environment. Through visitation from
                    national officers and other alumni, the stability of each
                    chapter is maintained. Guidance and publications are also
                    provided by the Central Office to help manage the chapter in
                    a professional manner. Through national conferences and
                    conventions, there is an annual opportunity to connect with
                    fraternity brothers from chapters across the nation. We are
                    always looking for motivated, ambitious, and energetic
                    engineering students that are interested in building
                    friendships, improving their professional lives, and
                    becoming the strong foundation upon which the fraternity is
                    built. Are you the person we are looking for?
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-1 d-flex align-items-md-center order-1 order-lg-2">
                <Img
                  fluid={history.childImageSharp.fluid}
                  alt="history-pic"
                  className="image fit"
                />
              </div>
            </div>

            <div className="row left-text about-block justify-content-md-center">
              <div className="col-lg-5 col-md-1 d-flex align-items-md-center">
                <Img
                  fluid={pledgeEventPic.childImageSharp.fluid}
                  alt="history-pic"
                  className="image fit history"
                />
              </div>
              <div className="col-lg-6 col-md-1 d-flex align-items-md-center">
                <div>
                  <header className="major">
                    <h2>
                      <b>Chapter History</b>
                    </h2>
                  </header>
                  <p className="history-text">
                    In spring of 2018, Mark Muendelein met a handful of brothers
                    from the Epsilon Delta chapter of Theta Tau chartered at UC
                    San Diego. Muendelein had realized that his community and
                    his career were destined for two different directions. In an
                    attempt to bridge this gap, Mundelein decided to enlist
                    friends, peers, colleagues, and mentors to being a chapter
                    of Theta Tau at San Jose State University. At the end of the
                    summer, after having spoken slew of connections, Muendelein
                    held the first general meeting of what would later become
                    the organization Silicon Valley Engineers of San Jose State
                    University. The first couple meetings were set to establish
                    publicity plans and member selection criteria, as well as
                    establish leadership roles within the organization. As the
                    fall semester progressed, word about this interest group for
                    Theta Tau spread. Students on campus learned of Silicon
                    Valley Engineers through the professional, community
                    service, and brotherhood events that organization hosted.
                    All of these events, meetings, gatherings, connections, and
                    relationships have been brought about as a result of
                    establishing the Silicon Valley Engineers and shown to be
                    the foundation of an influential group of students. These
                    are students who challenge and nurture each other while
                    striving to inspire both life and passion in those who seek
                    it in the field of engineering.
                  </p>
                </div>
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
    history: file(relativePath: { eq: "history.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    pledgeEventPic: file(relativePath: { eq: "pledge-event-cropped.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

About.propTypes = {
  data: PropTypes.shape({
    logo: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    pledgeEventPic: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default About;
