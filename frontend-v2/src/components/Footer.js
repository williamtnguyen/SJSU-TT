import React from 'react';
import thetaTauCrest from '../images/theta-tau-crest-white.png';
import footerStyles from '../styles/components/footer.module.scss';

const Footer = () => {
  return (
    <div className={footerStyles.root}>
      <div className={footerStyles.footer__logo}>
        <img
          src={thetaTauCrest}
          alt="theta-tau-crest"
          id={footerStyles.footer__crest}
        />
        <h1 id={footerStyles.footer__main}>
          Theta Tau<span id={footerStyles.sjsu__text}> | SJSU</span>
        </h1>
      </div>
      <p>
        "Whatsoever thy hand findeth to do, do it with thy might..."
        —Ecclesiastes 9:10
      </p>
    </div>
  );
};

export default Footer;
