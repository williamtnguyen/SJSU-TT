import React from 'react';
import logo from '../assets/images/thetatau.png';

class Header extends React.Component {
  render() {
    return (
      <section id="header" className="home-background">
        <div className="inner">
          <img id="logo-vector" src={logo} alt="Logo" />
          <h1>
            {' '}
            <strong>Theta Tau</strong>
          </h1>
          <p>
            <b>Co-ed Professional Engineering Fraternity | SJSU Chapter</b>
          </p>
          <div id="extend-height" />
          <ul className="actions">
            <li>
              <a href="rush" className="button scrolly">
                Rush
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Header;
