/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Layout from '../components/Layout';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import brotherhood from '../assets/images/brotherhood.jpg';
import professional from '../assets/images/professional.jpg';
import community from '../assets/images/rush-tabling-cropped.jpg';
import mark from '../assets/images/mark.jpg';
import pledgeEventPic from '../assets/images/pledge-event-cropped.png';

class Homepage extends React.Component {
  render() {
    const siteTitle = 'Theta Tau | SJSU';

    return (
      <Layout>
        <Helmet title={siteTitle} />
        <div id="page-wrapper">
          <section className="main style1">
            <Container>
              <Col>
                <Row>
                  <Col md={7} sm={12}>
                    <header className="major">
                      <h2>About Theta Tau</h2>
                    </header>
                    <p>
                    Theta Tau is the largest and oldest Co-ed Engineering
                    Fraternity in the United States. The purpose of Theta Tau is
                    to develop and maintain a high standard of professional
                    interest among its members, and to unite them in a strong bond
                    of fraternal fellowship.
                    </p>
                  </Col>
                  <Col md={5} sm={12}>
                    <span className="image fit">
                      {' '}
                      <img src={pledgeEventPic} alt="" />
                    </span>
                  </Col>
                </Row>
              </Col>
            </Container>
            {/* <div className="grid-wrapper">
              <div className="col-6">
                <header className="major">
                  <h2>About Theta Tau</h2>
                </header>
                <p>
                  Theta Tau is the largest and oldest Co-ed Engineering
                  Fraternity in the United States. The purpose of Theta Tau is
                  to develop and maintain a high standard of professional
                  interest among its members, and to unite them in a strong bond
                  of fraternal fellowship.
                </p>
              </div>
              <div className="col-6">
                <span className="image fit">
                  <img src={pledgeEventPic} alt="" />
                </span>
              </div>
            </div> */}
          </section>

          <section id="two" className="main style2">
            <Container>
              <Col>
                <Row>
                  <Col md={5} sm={12}>
                    <span className="image fit">
                      {' '}
                      <img src={mark} alt="" />
                    </span>
                  </Col>
                  <Col md={7} sm={12}>
                    <header className="major">
                      <h2>A Message From Our Founding Regent</h2>
                    </header>
                    <p>
                      "Hi, I’m Mark and I started a chapter of Theta Tau here at
                      SJSU because I’m a firm believer in building things that
                      matter. Theta Tau is a professional engineering fraternity
                      that combines two of the things that I think matter most:
                      career and community. Come check us out!"
                    </p>
                    <p> ~ Mark Muendelein, Mechanical Engineering '19</p>
                  </Col>
                </Row>
              </Col>
            </Container>
          </section>

          <section id="three" className="main style1 special">
            <Container>
              <header className="major">
                <h2>Our 3 Pillars</h2>
              </header>
              <p>
                The purpose of Theta Tau is to develop and maintain a high
                standard of professional interest amongst its members, and to
                unite them in a strong bond of fraternal fellowship.
              </p>
              <Row>
                <Col sm={4}>
                  <span className="image fit">
                    <img className="pillars-pic" src={brotherhood} alt="" />
                  </span>
                  <h3>Brotherhood</h3>
                  <p>
                    We forge lifelong bonds of fraternal friendship, a journey
                    that develops and delivers a network of lasting personal and
                    professional relationships. We foster an inviting, safe, and
                    social environment in which our members become lifelong
                    friends.
                  </p>
                  <ul className="actions">
                    <li>

                      {/* <a href="/" className="button">
                        More
                      </a> */}
                    </li>
                  </ul>
                </Col>
                <Col sm={4}>
                  <span className="image fit">
                    <img className="pillars-pic" src={professional} alt="" />
                  </span>
                  <h3>Professionalism</h3>
                  <p>
                    We develop and nurture engineers with strong communication,
                    problem-solving, collaboration, and leadership skills that
                    we demonstrate in our profession, our community, and in our
                    lives.
                  </p>
                  <ul className="actions">
                    <li>
                      {/* <a href="/" className="button">
                        More
                      </a> */}
                    </li>
                  </ul>
                </Col>
                <Col sm={4}>
                  <span className="image fit">
                    <img className="pillars-pic" src={community} alt="" />
                  </span>
                  <h3>Community Service</h3>
                  <p>
                    We are known for our service to our college, university and
                    the larger community. Our service projects create a unifying
                    environment for learning and personal growth for our
                    members.
                  </p>
                  <ul className="actions">
                    <li>
                      {/* <a href="/" className="button">
                        More
                      </a> */}
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </section>

          <section id="four" className="main style2 special">
            <div className="container">
              <header className="major">
                <h2>Interested in joining?</h2>
              </header>
              <p>
                <b>Check us out at Rush every semester!</b>
              </p>
              <ul className="actions uniform">
                <li>
                  {/* <a href="/" className="button special">
                    Subscribe
                  </a>
                </li>
                <li>
                  <a href="/rush" className="button">

                    Rush Fall 2019
                  </a> */}
                </li>
              </ul>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default Homepage;
