import React from 'react';

// eslint-disable-next-line arrow-body-style
const Footer = () => {
  return (
    <section id="footer">
      <ul className="icons">
        <li>
          <a
            href="https://www.facebook.com/ThetaTauSJ/"
            className="icon alt fa-facebook"
          >
            <span className="label">Facebook</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/sjsuthetatau/"
            className="icon alt fa-instagram"
          >
            <span className="label">Instagram</span>
          </a>
        </li>
        {/* <li>
          <a href="/" className="icon alt fa-github">
            <span className="label">GitHub</span>
          </a>
        </li> */}
        <li>
          <a
            href="mailto:sjsuthetatau@gmail.com"
            className="icon alt fa-envelope"
          >
            <span className="label">Email</span>
          </a>
        </li>
      </ul>
      <ul className="copyright">
        <small>
          <p>
            "Whatsoever thy hand findeth to do, do it with thy might;..."
            --Ecclesiastes 9:10
          </p>
        </small>
        ΘT @ SJSU
        <li>Made with ❤ by Webmaster Committee</li>
        <li>&copy; 2021</li>
      </ul>
    </section>
  );
};

export default Footer;
