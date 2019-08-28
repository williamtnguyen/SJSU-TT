/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavBar from '../components/NavBar';
import logo from '../assets/images/thetatau.png';
import Footer from '../components/Footer';
import pic02 from '../assets/images/pic02.jpg';
import pic04 from '../assets/images/pic04.jpg';

import intelTour from '../assets/images/intel.png';
import pledgeEventPic from '../assets/images/pledge-event-cropped.png';

// Headshots of Founding Fathers
import ari from '../assets/images/headshots/aris.jpg';
import mark from '../assets/images/headshots/mark.jpg';
import darpan from '../assets/images/headshots/darpan.jpg';
import james from '../assets/images/headshots/james.jpg';
import serena from '../assets/images/headshots/serena.jpg';
import pancho from '../assets/images/headshots/pancho.jpg';
import sophia from '../assets/images/headshots/sophia.jpg';
import eriny from '../assets/images/headshots/eriny.jpg';
import erinb from '../assets/images/headshots/erinb.jpg';
import jeson from '../assets/images/headshots/jeson.jpg';
import domingo from '../assets/images/headshots/domingo.jpg';
import emerson from '../assets/images/headshots/emerson.jpg';
import anthony from '../assets/images/headshots/anthony.jpg';
import meng from '../assets/images/headshots/meng.jpg';
import ada from '../assets/images/headshots/ada.jpg';
import eric from '../assets/images/headshots/eric.jpg';
import andrew from '../assets/images/headshots/andrewp.jpg';
import aby from '../assets/images/headshots/aby.jpg';
import binh from '../assets/images/headshots/binh.jpg';
import patricia from '../assets/images/headshots/patricia.jpg';
import brianna from '../assets/images/headshots/brianna.jpg';
import sarah from '../assets/images/headshots/sarah.jpg';
import austin from '../assets/images/headshots/austin.jpg';
import jameson from '../assets/images/headshots/jameson.jpg';
import isaiah from '../assets/images/headshots/isaiah.jpg';
import cameron from '../assets/images/headshots/cameron.jpg';
import gordon from '../assets/images/headshots/gordon.jpg';
import maan from '../assets/images/headshots/maan.jpg';

// Headshots of Alpha Class

import jon from '../assets/images/headshots/jon.jpg';
import john from '../assets/images/headshots/john.jpg';
import priscilla from '../assets/images/headshots/priscilla.jpg';
import klin from '../assets/images/headshots/klin.jpg';
import liz from '../assets/images/headshots/liz.jpg';
import antonio from '../assets/images/headshots/antonio.jpg';
import jeanelle from '../assets/images/headshots/jeanelle.jpg';
import klam from '../assets/images/headshots/klam.jpg';
import kchu from '../assets/images/headshots/kchu.jpg';
import nick from '../assets/images/headshots/nick.jpg';
import raul from '../assets/images/headshots/raul.jpg';
import esther from '../assets/images/headshots/esther.jpg';

class Brothers extends React.Component {
  render() {
    const siteTitle = 'Theta Tau | SJSU';

    return (
      <section>
        <Helmet title={siteTitle} />
        <NavBar />
        <section id="header" className="brothers-background">
          <div className="inner">
            <img id="logo-vector" src={logo} alt="Logo" />
            <h1>
              {' '}
              <strong>Meet the Brothers</strong>
            </h1>
            <p><b>Theta Tau SJSU Colony</b></p>
            <div id="extend-height" />
          </div>
        </section>

        <div className="brothers">


          <section id="three" className="main style1 special">
            <Container>
              <header className="major">
                <h2>Active Brothers</h2>
              </header>
              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={darpan} alt="" />
                  </span>
                  <p>
                    Darpan Goyal
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={jon} alt="" />
                  </span>
                  <p>
                    Jonathan Wong
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={pancho} alt="" />
                  </span>
                  <p>
                    Francisco Sanchez
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={eriny} alt="" />
                  </span>
                  <p>
                    Erin Yang
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>


              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={antonio} alt="" />
                  </span>
                  <p>
                    Antonio Cervantes
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={priscilla} alt="" />
                  </span>
                  <p>
                    Priscilla Ng
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={liz} alt="" />
                  </span>
                  <p>
                    Elizabeth Huang
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={klin} alt="" />
                  </span>
                  <p>
                    Kevin Lin
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>


              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={ada} alt="" />
                  </span>
                  <p>
                    Ada La
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={meng} alt="" />
                  </span>
                  <p>
                    Meng Lo
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={cameron} alt="" />
                  </span>
                  <p>
                    Cameron Lofy
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={austin} alt="" />
                  </span>
                  <p>
                    Austin McNiff
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>

              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={jeanelle} alt="" />
                  </span>
                  <p>
                    Jeanelle Bentajado
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={klam} alt="" />
                  </span>
                  <p>
                    Kevin Lam
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={maan} alt="" />
                  </span>
                  <p>
                    Maan Singh
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={gordon} alt="" />
                  </span>
                  <p>
                    Gordon Ly
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>


              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={jameson} alt="" />
                  </span>
                  <p>
                    Jameson Au
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={raul} alt="" />
                  </span>
                  <p>
                    Raul Gonzalez
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={brianna} alt="" />
                  </span>
                  <p>
                    Brianna Felix
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={patricia} alt="" />
                  </span>
                  <p>
                    Patricia Dela Cruz
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>


              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={john} alt="" />
                  </span>
                  <p>
                    John Tran
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={nick} alt="" />
                  </span>
                  <p>
                    Nicholas Ong
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={sarah} alt="" />
                  </span>
                  <p>
                    Sarah Lau
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={kchu} alt="" />
                  </span>
                  <p>
                    Kevin Chu
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>

            </Container>

            {/* ALUMNI  */}
            <Container>
              <header className="major">
                <h2>Alumni</h2>
              </header>
              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={mark} alt="" />
                  </span>
                  <p>
                    Mark Muendelein
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={james} alt="" />
                  </span>
                  <p>
                    James-Jimenez
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={serena} alt="" />
                  </span>
                  <p>
                    Serena Pascual
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={ari} alt="" />
                  </span>
                  <p>
                    Ari Koumis
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>


              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={sophia} alt="" />
                  </span>
                  <p>
                    Sophia Tan
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={jeson} alt="" />
                  </span>
                  <p>
                    Jeson Retumalta
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={anthony} alt="" />
                  </span>
                  <p>
                    Anthony Pun
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={emerson} alt="" />
                  </span>
                  <p>
                    Emerson Ye
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>


              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={erinb} alt="" />
                  </span>
                  <p>
                    Erin Bui
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={domingo} alt="" />
                  </span>
                  <p>
                    Domingo Castro
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={andrew} alt="" />
                  </span>
                  <p>
                    Andrew Phan
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={binh} alt="" />
                  </span>
                  <p>
                    Binh Do
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>


              <Row>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={isaiah} alt="" />
                  </span>
                  <p>
                    Isaih Gosiengfiao
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={aby} alt="" />
                  </span>
                  <p>
                    Aby Samuel
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={eric} alt="" />
                  </span>
                  <p>
                    Eric Tong
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
                <Col sm={3}>
                  <span className="image fit">
                    <img className="pillars-pic" src={esther} alt="" />
                  </span>
                  <p>
                    Esther Kuan
                  </p>
                  <ul className="actions">
                    <li />
                  </ul>
                </Col>
              </Row>

            </Container>
          </section>


        </div>
        <Footer />
      </section>

    );
  }
}

export default Brothers;
