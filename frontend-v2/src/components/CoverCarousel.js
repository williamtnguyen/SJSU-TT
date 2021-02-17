import React from 'react';
import { Carousel } from 'antd';
import carouselStyles from '../styles/components/cover-carousel.module.scss';

import carousel1 from '../images/index-carousel1.png';
import carousel2 from '../images/index-carousel2.jpg';
import carousel3 from '../images/index-carousel3.jpg';
import carousel4 from '../images/index-carousel4.jpg';
import carousel5 from '../images/index-carousel5.jpg';
import carousel6 from '../images/index-carousel6.jpg';
import thetaTauLogo from '../images/theta-tau-logo.png';

const CoverCarousel = () => {
  return (
    <div className={carouselStyles.cover__carousel}>
      <Carousel autoplay>
        <div className={carouselStyles.carousel__item}>
          <img src={carousel1} alt="brotherhood-pic" />
        </div>
        <div className={carouselStyles.carousel__item}>
          <img src={carousel2} alt="brotherhood-pic" />
        </div>
        <div className={carouselStyles.carousel__item}>
          <img src={carousel3} alt="brotherhood-pic" />
        </div>
        <div className={carouselStyles.carousel__item}>
          <img src={carousel4} alt="brotherhood-pic" />
        </div>
        <div className={carouselStyles.carousel__item}>
          <img src={carousel5} alt="brotherhood-pic" />
        </div>
        <div className={carouselStyles.carousel__item}>
          <img src={carousel6} alt="brotherhood-pic" />
        </div>
      </Carousel>
      <div className={carouselStyles.cover__overlay} />
      <div className={carouselStyles.cover__text}>
        <div className={carouselStyles.cover__header}>
          <img src={thetaTauLogo} alt="theta-tau-logo" />
          <h1>Theta Tau</h1>
        </div>
        <h3>Co-ed Professional Engineering Fraternity | SJSU Chapter</h3>
      </div>
    </div>
  );
};

export default CoverCarousel;
