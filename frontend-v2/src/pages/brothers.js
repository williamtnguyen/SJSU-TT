import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Menu, Dropdown, Button, Row, Col, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import brotherStyles from '../styles/pages/brothers.module.scss';

import CURR_PLEDGE_CLASS from '../util/curr-pledge-class';
import brothersBanner from '../images/brothers-banner.jpg';

const Brothers = (props) => {
  const [isFetching, setIsFetching] = useState(true);
  const [brothers, setBrothers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Actives');

  useEffect(() => {
    fetchBrothers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history.location]);

  const fetchBrothers = async () => {
    setIsFetching(true);
    const tab = parseQueryParameter();
    const apiResponse = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/${tab}`
    );
    setBrothers(apiResponse.data);
    setIsFetching(false);
  };

  const parseQueryParameter = () => {
    if (!window.location.search) {
      window.history.replaceState(
        null,
        null,
        `${window.location.origin}${window.location.pathname}?tab=actives`
      );
      return 'actives';
    }
    const tab = new URLSearchParams(window.location.search).get('tab');
    if (tab !== 'actives' && tab !== 'alumni') {
      window.history.replaceState(
        null,
        null,
        `${window.location.origin}${window.location.pathname}?tab=actives`
      );
      return 'actives';
    }
    setSelectedTab(tab === 'actives' ? 'Actives' : 'Alumni');
    return tab;
  };

  return (
    <>
      <Helmet>
        <title>Theta Tau | Brothers</title>
        <meta
          name="description"
          content="Meet the active and alumni brothers of Theta Tau at SJSU!"
        />
      </Helmet>

      <div className={brotherStyles.root}>
        <div className={brotherStyles.banner}>
          <img src={brothersBanner} alt="brothers-banner" />
          <div className={brotherStyles.banner__overlay} />
          <div className={brotherStyles.banner__text}>
            <div className="container">
              <h1>Meet the Brothers</h1>
            </div>
          </div>
        </div>
        <div className={brotherStyles.headshots__grid__container}>
          <div className="container">
            <div className={brotherStyles.dropdown__container}>
              <Dropdown overlay={DropDownMenu(selectedTab)}>
                <Button
                  shape="round"
                  className={brotherStyles.dropdown__button}
                >
                  {selectedTab} <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            {isFetching ? (
              <div className={brotherStyles.spinner__container}>
                <Spin size="large" />
              </div>
            ) : (
              <Row gutter={[32, 32]}>
                {brothers.map(
                  (brother) =>
                    brother.imagePath &&
                    brother.pledgeClass !== CURR_PLEDGE_CLASS && (
                      // eslint-disable-next-line no-underscore-dangle
                      <Col xs={24} md={6} key={brother._id}>
                        <div className={brotherStyles.card__container}>
                          <div
                            className={
                              brotherStyles.brother__headshot__container
                            }
                          >
                            <img
                              className={brotherStyles.brother__headshot}
                              src={`${process.env.REACT_APP_HEADSHOT_S3_BUCKET_URL}/${brother.imagePath}`}
                              alt="brother-headshot"
                            />
                          </div>
                          <div className={brotherStyles.card__overlay} />
                          <div className={brotherStyles.card__info}>
                            <div className={brotherStyles.card__info__item}>
                              <h3>Major:</h3>
                              <span>{brother.major}</span>
                            </div>
                            <div className={brotherStyles.card__info__item}>
                              <h3>Graduating Year:</h3>
                              <span>{brother.graduatingYear}</span>
                            </div>
                            <div className={brotherStyles.card__info__item}>
                              <h3>Class:</h3>
                              <span>{brother.pledgeClass}</span>
                            </div>
                            <div className={brotherStyles.card__info__item}>
                              <h3>Position:</h3>
                              <span>{brother.position}</span>
                            </div>
                            {brother.biography !== '' && (
                              <div className={brotherStyles.card__info__item}>
                                <h3>Bio:</h3>
                                <span>{brother.biography}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <h2 className={brotherStyles.brother__name}>
                          {brother.name}
                        </h2>
                      </Col>
                    )
                )}
              </Row>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const DropDownMenu = (selectedTab) => {
  return (
    <Menu>
      <Menu.Item key="1">
        <Link
          to={`/brothers?tab=${
            selectedTab === 'Actives' ? 'alumni' : 'actives'
          }`}
        >
          {selectedTab === 'Actives' ? 'Alumni' : 'Actives'}
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(Brothers);
