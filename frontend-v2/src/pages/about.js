import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'antd';
import CompanyCarousel from '../components/CompanyCarousel';
import aboutStyles from '../styles/pages/about.module.scss';

import aboutBanner from '../images/about-banner.jpg';
import thetaTauLogo from '../images/theta-tau-logo.png';
import brotherhood1 from '../images/about-brotherhood1.jpg';
import brotherhood2 from '../images/about-brotherhood2.jpg';
import brotherhood3 from '../images/about-brotherhood3.jpg';
import service1 from '../images/about-service1.jpg';
import service2 from '../images/about-service2.jpg';
import service3 from '../images/about-service3.jpg';

const About = () => {
  return (
    <>
      <Helmet>
        <title>Theta Tau | About Us</title>
        <meta
          name="description"
          content="Theta Tau facilitates an environment for like-minded individuals to grow professionally & personally, build life-long connections, and find community in their craft. From exciting rush events, to an immersive pledge process, to big-littles & fams, Theta Tau at SJSU continues to bring engineers of same and different disciplines together."
        />
      </Helmet>

      <div className={aboutStyles.root}>
        <div className={aboutStyles.banner}>
          <img src={aboutBanner} alt="brothers-banner" />
          <div className={aboutStyles.banner__overlay} />
          <div className={aboutStyles.banner__text}>
            <div className="container">
              <h1>About Theta Tau</h1>
            </div>
          </div>
        </div>

        <div className={aboutStyles.chapter__history__block}>
          <div className="container">
            <Row gutter={32}>
              <Col
                sm={24}
                md={16}
                className={aboutStyles.chapter__history__text}
              >
                <h1>Canidate Chapter History</h1>
                <p>
                  In spring of 2018, Mark Muendelein met a handful of brothers
                  from the Epsilon Delta chapter of Theta Tau chartered at UC
                  San Diego. Muendelein had realized that his community and his
                  career were destined for two different directions. In an
                  attempt to bridge this gap, Mundelein decided to enlist
                  friends, peers, colleagues, and mentors to being a chapter of
                  Theta Tau at San Jose State University. At the end of the
                  summer, after having spoken slew of connections, Muendelein
                  held the first general meeting of what would later become the
                  organization Silicon Valley Engineers of San Jose State
                  University.
                </p>
                <p>
                  The first couple meetings were set to establish publicity
                  plans and member selection criteria, as well as establish
                  leadership roles within the organization. As the fall semester
                  progressed, word about this interest group for Theta Tau
                  spread. Students on campus learned of Silicon Valley Engineers
                  through the professional, community service, and brotherhood
                  events that organization hosted. All of these events,
                  meetings, gatherings, connections, and relationships have been
                  brought about as a result of establishing the Silicon Valley
                  Engineers and shown to be the foundation of an influential
                  group of students. These are students who challenge and
                  nurture each other while striving to inspire both life and
                  passion in those who seek it in the field of engineering.
                </p>
              </Col>
              <Col sm={24} md={8}>
                <div className={aboutStyles.logo__container}>
                  <img src={thetaTauLogo} alt="theta-tau-logo" />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className={aboutStyles.national__history__block}>
          <div className="container">
            <Row gutter={32}>
              <Col
                sm={24}
                md={30}
                className={aboutStyles.chapter__history__text}
              >
                <h1>Theta Tau National History</h1>
                <p>
                  Theta Tau is the oldest, largest, and foremost Fraternity for Engineers.
                  Since its founding at the University of Minnesota in 1904, over 40,000 have
                  been initiated over the years. With emphasis on quality and a strong fraternal
                  bond, the Fraternity has chapters only at ABET accredited schools and limits the
                  number of student members in any one of its chapters across the nation.
                </p>
                <h2>Purpose</h2>
                <p>
                  The purpose of Theta Tau is to develop and maintain a high standard of
                  professional interest among its members, and to unite them in a strong bond
                  of fraternal fellowship.
                  <br />
                  <br />
                  For more information, please follow the link to the National Website <a href="https://thetatau.org/" target="_blank">here</a>.
                </p>
              </Col>
            </Row>
          </div>
        </div>

        <div className={aboutStyles.brotherhood__block}>
          <div className="container">
            <Row gutter={32}>
              <Col sm={24} md={16}>
                <h1>1. Brotherhood</h1>
                <p>
                  Theta Tau facilitates an environment for like-minded
                  individuals to grow professionally & personally, build
                  life-long connections, and find community in their craft. From
                  exciting rush events, to an immersive pledge process, to
                  big-littles & fams, Theta Tau at SJSU continues to bring
                  engineers of same and different disciplines together.
                </p>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col md={8} className={aboutStyles.image__col}>
                <img
                  src={brotherhood1}
                  alt="brotherhood-pic"
                  className={aboutStyles.brotherhood__picture}
                />
              </Col>
              <Col md={8} className={aboutStyles.image__col}>
                <img
                  src={brotherhood2}
                  alt="brotherhood-pic"
                  className={aboutStyles.brotherhood__picture}
                />
              </Col>
              <Col md={8} className={aboutStyles.image__col}>
                <img
                  src={brotherhood3}
                  alt="brotherhood-pic"
                  className={aboutStyles.brotherhood__picture}
                />
              </Col>
            </Row>
          </div>
        </div>

        <div className={aboutStyles.professionalism__block}>
          <div className="container">
            <Row gutter={32}>
              <Col sm={24} md={16}>
                <h1>2. Professionalism</h1>
                <p>
                  Theta Tau at SJSU strives to put its members in the best
                  position to achieve their professional goals. Our members help
                  eachother professionally through resume workshops,
                  mock-interview preparation, and mentorship. Our organization
                  has alumni and active members with industry experience at some
                  pretty amazing companies:
                </p>
              </Col>
            </Row>
            <div className={aboutStyles.job__carousel}>
              <CompanyCarousel />
            </div>
          </div>
        </div>

        <div className={aboutStyles.community__service__block}>
          <div className="container">
            <Row gutter={32}>
              <Col sm={24} md={16}>
                <h1>3. Community Service</h1>
                <p>
                  We love to get together and give back. As engineers, we
                  believe that it is important in our profession to have a sense
                  of empathy for our community. Our passion for community
                  service also ultimately strengthens our brotherhood.
                </p>
              </Col>
            </Row>

            <Row gutter={32}>
              <Col md={8} className={aboutStyles.image__col}>
                <img
                  src={service1}
                  alt="brotherhood-pic"
                  className={aboutStyles.service__picture}
                />
              </Col>
              <Col md={8} className={aboutStyles.image__col}>
                <img
                  src={service2}
                  alt="brotherhood-pic"
                  className={aboutStyles.service__picture}
                />
              </Col>
              <Col md={8} className={aboutStyles.image__col}>
                <img
                  src={service3}
                  alt="brotherhood-pic"
                  className={aboutStyles.service__picture}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
