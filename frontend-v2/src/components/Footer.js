import React from 'react';
import { InstagramOutlined, MailOutlined } from '@ant-design/icons';
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
      <div className={footerStyles.footer__icon__container}>
        <a href="https://www.instagram.com/sjsuthetatau/" className={footerStyles.footer__icon}>
          <InstagramOutlined />
        </a>
        <a href="mailto:thetatau.sjsu@gmail.com" className={footerStyles.footer__icon}>
          <MailOutlined />
        </a>
      </div>
    </div>
  );
};

export default Footer;
