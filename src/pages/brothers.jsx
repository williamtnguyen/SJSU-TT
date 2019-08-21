import React from 'react';
import Helmet from 'react-helmet';
import NavBar from '../components/NavBar';
import logo from '../assets/images/thetatau.png';
import Footer from '../components/Footer';
import pic02 from '../assets/images/pic02.jpg';

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
            {/* <p>
              <b>Theta Tau Chapter</b>
            </p> */}
            <div id="extend-height" />
          </div>
        </section>

        <div className="brothers">
          <section className="main style1 special">
            <div className="grid-wrapper">
              <div className="col-12">
                <header className="major">
                  <h2>Active Brothers</h2>
                </header>
                <p>
                  The purpose of Theta Tau is to develop and maintain a high
                  standard of professional interest amongst its members, and to
                  unite them in a strong bond of fraternal fellowship.
                </p>
              </div>

              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>
                <p>Mark Muendelein</p>
              </div>

              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>

              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>
              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>
            </div>

            <div className="grid-wrapper">
              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>

              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>

              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>
              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>
            </div>

            <div className="grid-wrapper">
              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>

              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>

              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>
              <div className="col-3">
                <span className="image fit">
                  <img src={pic02} alt="" />
                </span>

                <p>fasdfasdf.</p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </section>
    );
  }
}

export default Brothers;
