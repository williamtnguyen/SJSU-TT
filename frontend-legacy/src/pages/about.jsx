/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import CompanyCarousel from '../components/CompanyCarousel';

import 'bootstrap/dist/css/bootstrap.css';
import aboutStyles from './about.module.scss';

class About extends React.Component {
  render() {
    const siteTitle = 'Theta Tau | SJSU';
    const { data } = this.props;
    const {
      logo,
      pledgeEventPic,
      brotherhood1,
      brotherhood2,
      brotherhood3,
      service1,
      service2,
      service3,
    } = data;

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
              <div className="col-lg-6 col-md-12 d-flex align-items-md-center order-2 order-lg-1">
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
              <div className="col-lg-5 col-md-12 order-1 order-lg-2">
                <div className={aboutStyles.spinning__logo}>
                  <Img
                    fluid={logo.childImageSharp.fluid}
                    alt="history-pic"
                    style={{
                      width: '50%',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row left-text about-block justify-content-md-center">
              <div className="col-lg-5 col-md-12 d-flex align-items-md-center">
                <Img
                  fluid={pledgeEventPic.childImageSharp.fluid}
                  alt="history-pic"
                  className="image fit history"
                />
              </div>
              <div className="col-lg-6 col-md-12 d-flex align-items-md-center">
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

          <div className="row main style2 special about-block d-flex justify-content-start">
            <div className="col-md-8 d-flex justify-content-start">
              <div className={aboutStyles.pillar__container}>
                <header className="major">
                  <h2>
                    <b>Brotherhood</b>
                  </h2>
                </header>
                <p>
                  Theta Tau facilitates an environment for like-minded
                  individuals to grow professionally & personally, build
                  life-long connections, and find community in their craft. From
                  exciting rush events, to an immersive pledge process, to
                  big-littles & fams, Theta Tau at SJSU continues to bring
                  engineers of same and different disciplines together.
                </p>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className={aboutStyles.pillar__container}>
                <div className="row justify-content-center">
                  <div className="col-lg-4">
                    <Img
                      fluid={brotherhood1.childImageSharp.fluid}
                      alt="history-pic"
                      className="image fit"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Img
                      fluid={brotherhood2.childImageSharp.fluid}
                      alt="history-pic"
                      className="image fit"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Img
                      fluid={brotherhood3.childImageSharp.fluid}
                      alt="history-pic"
                      className="image fit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pl-5 pl-md-0 about-block d-flex justify-content-start">
            <div className="col-md-8 d-flex justify-content-start">
              <div className={aboutStyles.pillar__container}>
                <header className="major">
                  <h2>
                    <b>Professionalism</b>
                  </h2>
                </header>
                <p>
                  Theta Tau at SJSU strives to put its members in the best
                  position achieve their professional goals. Our members help
                  eachother professionally through resume workshops,
                  mock-interview preparation, and mentorship. Our organization
                  has alumni and active members with industry experience at some
                  pretty amazing companies:
                </p>
              </div>
            </div>
            <div className="col-12 mt-5">
              <div className={aboutStyles.pillar__container}>
                <div className={aboutStyles.job__carousel}>
                  <CompanyCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row main style2 special about-block d-flex justify-content-start mb-0">
          <div className="col-md-8 d-flex justify-content-start">
            <div className={aboutStyles.pillar__container}>
              <header className="major">
                <h2>
                  <b>Community Service</b>
                </h2>
              </header>
              <p>
                We love to get together and give back. As engineers, we believe
                that it is important in our profession to have a sense of
                empathy for our community. Our passion for community service
                also ultimately strengthens our brotherhood.
              </p>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className={aboutStyles.pillar__container}>
              <div className="row justify-content-center">
                <div className="col-lg-4">
                  <Img
                    fluid={service1.childImageSharp.fluid}
                    alt="history-pic"
                    className="image fit"
                  />
                </div>
                <div className="col-lg-4">
                  <Img
                    fluid={service2.childImageSharp.fluid}
                    alt="history-pic"
                    className="image fit"
                  />
                </div>
                <div className="col-lg-4">
                  <Img
                    fluid={service3.childImageSharp.fluid}
                    alt="history-pic"
                    className="image fit"
                  />
                </div>
              </div>
            </div>
          </div>
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
    pledgeEventPic: file(relativePath: { eq: "pledge-event-cropped.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    brotherhood1: file(relativePath: { eq: "about-brotherhood1.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    brotherhood2: file(relativePath: { eq: "about-brotherhood2.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    brotherhood3: file(relativePath: { eq: "about-brotherhood3.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    service1: file(relativePath: { eq: "about-service1.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    service2: file(relativePath: { eq: "about-service2.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    service3: file(relativePath: { eq: "about-service3.jpg" }) {
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
    pledgeEventPic: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    brotherhood1: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    brotherhood2: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    brotherhood3: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    service1: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    service2: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    service3: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default About;
