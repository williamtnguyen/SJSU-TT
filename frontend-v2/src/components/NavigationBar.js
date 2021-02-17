import React from 'react';
import { Link } from 'react-router-dom';
import thetaTauCrest from '../images/theta-tau-crest-black.png';
import navigationStyles from '../styles/components/navigation-bar.module.scss';

const NavigationBar = () => {
  return (
    <div className={`${navigationStyles.root} container`}>
      <div>
        <Link to="/" className={navigationStyles.link}>
          <div className={navigationStyles.nav__logo}>
            <img
              src={thetaTauCrest}
              alt="theta-tau-crest"
              id={navigationStyles.nav__crest}
            />
            <h1 id={navigationStyles.nav__main}>
              Theta Tau<span id={navigationStyles.sjsu__text}> | SJSU</span>
            </h1>
          </div>
        </Link>
      </div>
      <div className={navigationStyles.nav__items}>
        <Link to="/about" className={navigationStyles.link}>
          <h1>About</h1>
        </Link>
        <Link to="/brothers" className={navigationStyles.link}>
          <h1>Brothers</h1>
        </Link>
        <Link to="/rush" className={navigationStyles.link}>
          <h1>Rush</h1>
        </Link>
        <Link to="/dashboard" className={navigationStyles.link}>
          <h1>Dashboard</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
