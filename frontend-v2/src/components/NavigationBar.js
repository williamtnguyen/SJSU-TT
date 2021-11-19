import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { UserContext } from '../contexts/UserContext';
import thetaTauCrest from '../images/theta-tau-crest-black.png';
import navigationStyles from '../styles/components/navigation-bar.module.scss';

const NavigationBar = () => {
  const { isAuthenticated, user } = useContext(UserContext);
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);

  return (
    <>
      <div className={`${navigationStyles.root}`}>
        <div className={`${navigationStyles.nav__container} container`}>
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
            <Link to="/brothers?tab=actives" className={navigationStyles.link}>
              <h1>Brothers</h1>
            </Link>
            <Link to="/rush" className={navigationStyles.link}>
              <h1>Rush</h1>
            </Link>
            <Link to="/dashboard" className={navigationStyles.link}>
              {isAuthenticated ? (
                <div className={navigationStyles.avatar}>
                  <UserOutlined className={navigationStyles.user__icon} />
                  <h1>{user.name.split(' ')[0]}</h1>
                </div>
              ) : (
                <h1>Dashboard</h1>
              )}
            </Link>
          </div>

          <div className={navigationStyles.mobile__nav__items}>
            <Button
              icon={<MenuOutlined />}
              onClick={() => setIsMobileMenuExpanded(!isMobileMenuExpanded)}
              className={navigationStyles.mobile__menu__button}
            />
          </div>
        </div>
      </div>

      <div
        className={navigationStyles.expanded__menu}
        style={{ display: isMobileMenuExpanded ? 'block' : 'none' }}
      >
        <div
          className={`${navigationStyles.expanded__menu__content} container`}
        >
          <Link to="/about" className={navigationStyles.link}>
            <h1>About</h1>
          </Link>
          <Link to="/brothers?tab=actives" className={navigationStyles.link}>
            <h1>Brothers</h1>
          </Link>
          <Link to="/rush" className={navigationStyles.link}>
            <h1>Rush</h1>
          </Link>
          <Link to="/dashboard" className={navigationStyles.link}>
            {isAuthenticated ? (
              <div className={navigationStyles.avatar}>
                <UserOutlined className={navigationStyles.user__icon} />
                <h1>{user.name.split(' ')[0]}</h1>
              </div>
            ) : (
              <h1>Dashboard</h1>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
