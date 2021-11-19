import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import CoverCarousel from '../components/CoverCarousel';

import aboutThetaTau from '../images/pledge-event-cropped.jpg';
import brotherhoodIcon from '../images/brotherhood-icon.png';
import professionalismIcon from '../images/professionalism-icon.png';
import communityServiceIcon from '../images/community-service-icon.png';
import interestedInJoiningCover from '../images/interested-joining-cover.jpg';

import landingStyles from '../styles/pages/landing.module.scss';

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>Theta Tau | SJSU</title>
        <meta
          name="description"
          content="Theta Tau is a co-ed Engineering Fraternity here at San Jose State. The purpose of Theta Tau is to develop and maintain a high standard of professional interest among its members, and to unite them in a strong bond of fraternal fellowship."
        />
      </Helmet>

      <CoverCarousel />

      <div className={landingStyles.about__block}>
        <div className="container">
          <Row gutter={32} className={landingStyles.about__row}>
            <Col md={12}>
              <h1>About Theta Tau</h1>
              <p>
                Theta Tau is a co-ed Engineering Fraternity here at San Jose
                State. The purpose of Theta Tau is to develop and maintain a
                high standard of professional interest among its members, and to
                unite them in a strong bond of fraternal fellowship.
              </p>
            </Col>
            <Col md={10}>
              <div className={landingStyles.about__picture}>
                <img src={aboutThetaTau} alt="about-theta-tau" />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className={landingStyles.pillars__block}>
        <div className="container">
          <h1>Our 3 Pillars</h1>
          <Row gutter={32} className={landingStyles.pillars__row}>
            <Col sm={24} md={7} className={landingStyles.pillars__col}>
              <div className={landingStyles.pillar__picture}>
                <img src={brotherhoodIcon} alt="brotherhood-icon" />
              </div>
              <h2>Brotherhood</h2>
              <p>
                We forge lifelong bonds of fraternal friendship, a journey that
                develops a network of lasting personal and professional
                relationships. We foster an inviting, safe, and social
                environment in which our members become lifelong friends.
              </p>
            </Col>
            <Col sm={24} md={7} className={landingStyles.pillars__col}>
              <div className={landingStyles.pillar__picture}>
                <img src={professionalismIcon} alt="professionalism-icon" />
              </div>
              <h2>Professionalism</h2>
              <p>
                We develop and nurture engineers with strong communication,
                problem-solving, collaboration, and leadership skills that we
                demonstrate in our profession, our community, and in our lives.
              </p>
            </Col>
            <Col sm={24} md={7} className={landingStyles.pillars__col}>
              <div className={landingStyles.pillar__picture}>
                <img src={communityServiceIcon} alt="community-service-icon" />
              </div>
              <h2>Community Service</h2>
              <p>
                We are known for our service to our college, university and the
                larger community. Our service projects create a unifying
                environment for learning and personal growth for our members.
              </p>
            </Col>
          </Row>
        </div>
      </div>

      <div className={landingStyles.joining__block}>
        <div className={landingStyles.joining__cover__picture}>
          <img src={interestedInJoiningCover} alt="homies-chillin" />
        </div>
        <div className={landingStyles.joining__overlay} />
        <div className={landingStyles.joining__text}>
          <h1>Interested in joining?</h1>
          <p>Learn more about us at rush!</p>
          <p>Contact us! thetatau.sjsu@gmail.com</p>
          <div className="social-container">
            <a href="https://www.instagram.com/sjsuthetatau/?hl=en" className="insta social">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
