import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <section id="footer">
        <ul className="icons">
          {/* <li>
            <a href="/" className="icon alt fa-twitter">
              <span className="label">Twitter</span>
            </a>
          </li> */}
          <li>
            <a
              href="https://www.facebook.com/ThetaTauSJ/"
              className="icon alt fa-facebook"
            >
              <span className="label">Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/sjsuthetatau/" className="icon alt fa-instagram">
              <span className="label">Instagram</span>
            </a>
          </li>
          {/* <li>
            <a href="/" className="icon alt fa-github">
              <span className="label">GitHub</span>
            </a>
          </li> */}
          <li>
            <a href="mailto:sjsuthetatau@gmail.com" className="icon alt fa-envelope">
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
          &copy; 2020 | ΘT @ SJSU
          <li>Made with ❤ by Jonathan Wong & John Tran</li>
        </ul>
      </section>
    );
  }
}

export default Footer;
