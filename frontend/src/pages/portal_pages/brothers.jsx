import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from '../../assets/images/thetatau.png';
import brothersStyles from './brothers.module.scss';

const Brothers = () => {
  const [brothers, setBrothers] = useState({ actives: [], alumni: [] });

  useEffect(() => {
    fetchBrothers();
  }, []);

  const fetchBrothers = async () => {
    const apiResponse = await axios.get('/api/brothers/');
    setBrothers(apiResponse.data);
  };

  return (
    <div>
      <section id="header" className="brothers-background">
        <div className="inner">
          <img id="logo-vector" src={logo} alt="Logo" />
          <h1>
            <strong>Meet the Brothers</strong>
          </h1>
          <p>
            <b>Theta Tau SJSU Colony</b>
          </p>
          <div id="extend-height" />
        </div>
      </section>

      <div className={brothersStyles.root}>
        <section className="main">
          <div className="container">
            <header className="major">
              <h2>Active Brothers</h2>
            </header>
            <div className="row">
              {brothers.actives.map(
                (brother) =>
                  brother.imagePath && (
                    // eslint-disable-next-line no-underscore-dangle
                    <div className="col-md-3" key={brother._id}>
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
                            <h6>Graduating Class:</h6>
                            <span>{brother.graduatingYear}</span>
                          </div>
                          <div className={brothersStyles.card__info__item}>
                            <h6>Pledge Class:</h6>
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
