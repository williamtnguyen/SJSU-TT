import React, { useState, useEffect } from 'react';
import axios from 'axios';

import brothersStyles from './brothers.module.scss';

const Brothers = () => {
  const [brothers, setBrothers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Actives');

  useEffect(() => {
    fetchBrothers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBrothers = async () => {
    const tab = parseQueryParameter();
    const apiResponse = await axios.get(`/api/brothers/${tab}`);
    setBrothers(apiResponse.data);
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
    <div>
      <section id="header" className="brothers-background">
        <div className="inner">
          <h1>
            <strong>Meet the Brothers</strong>
          </h1>
          <p>
            <b>Theta Tau SJSU Colony</b>
          </p>
        </div>
      </section>

      <div className={brothersStyles.root}>
        <section className="main">
          <div className="container">
            <header className="major">
              <h2>{selectedTab}</h2>
            </header>
            <div className="dropdown mb-5">
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-md dropdown-toggle float-right"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {selectedTab}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a
                    className="dropdown-item"
                    href={`/portal/brothers?tab=${
                      selectedTab === 'Actives' ? 'alumni' : 'actives'
                    }`}
                  >
                    {selectedTab === 'Actives' ? 'Alumni' : 'Actives'}
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              {brothers.map(
                (brother) =>
                  brother.imagePath && (
                    <div
                      className="col-xl-3 col-lg-6 col-sm-12"
                      // eslint-disable-next-line no-underscore-dangle
                      key={brother._id}
                    >
                      <div className={brothersStyles.card__container}>
                        <div
                          className={
                            brothersStyles.brother__headshot__container
                          }
                        >
                          <img
                            className={brothersStyles.brother__headshot}
                            src={`${process.env.HEADSHOT_S3_BUCKET_URL}/${brother.imagePath}`}
                            alt="brother-headshot"
                          />
                        </div>
                        <div className={brothersStyles.card__overlay} />
                        <div className={brothersStyles.card__info}>
                          <div className={brothersStyles.card__info__item}>
                            <h6>Major:</h6>
                            <span>{brother.major}</span>
                          </div>
                          <div className={brothersStyles.card__info__item}>
                            <h6>Graduating Year:</h6>
                            <span>{brother.graduatingYear}</span>
                          </div>
                          <div className={brothersStyles.card__info__item}>
                            <h6>Class:</h6>
                            <span>{brother.pledgeClass}</span>
                          </div>
                          <div className={brothersStyles.card__info__item}>
                            <h6>Position:</h6>
                            <span>{brother.position}</span>
                          </div>
                          {brother.biography !== '' && (
                            <div className={brothersStyles.card__info__item}>
                              <h6>Bio:</h6>
                              <span>{brother.biography}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <h5 className={brothersStyles.brother__name}>
                        {brother.name}
                      </h5>
                      <ul className="actions">
                        <li />
                      </ul>
                    </div>
                  )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Brothers;
