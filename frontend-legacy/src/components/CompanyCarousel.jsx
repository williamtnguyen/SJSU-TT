import React from 'react';
import carouselStyles from './CompanyCarousel.module.scss';

// Company logos
import amazon from '../assets/images/company-logos/amazon.png';
import amplitude from '../assets/images/company-logos/amplitude.svg';
import appliedMaterials from '../assets/images/company-logos/appliedmaterials.png';
import cisco from '../assets/images/company-logos/cisco.png';
import google from '../assets/images/company-logos/google.png';
import ibm from '../assets/images/company-logos/ibm.png';
import intel from '../assets/images/company-logos/intel.png';
import lime from '../assets/images/company-logos/lime.png';
import linkedin from '../assets/images/company-logos/linkedin.png';
import mccarthy from '../assets/images/company-logos/mccarthy.png';
import microsoft from '../assets/images/company-logos/microsoft.png';
import nasa from '../assets/images/company-logos/nasa.png';
import paypal from '../assets/images/company-logos/paypal.png';
import sap from '../assets/images/company-logos/sap.png';
import ul from '../assets/images/company-logos/ul.png';
import youtube from '../assets/images/company-logos/youtube.png';

const CompanyCarousel = () => {
  return (
    <div className={carouselStyles.root}>
      <img
        src={amazon}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={amplitude}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={appliedMaterials}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={cisco}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={google}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={ibm}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={intel}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={lime}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={linkedin}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={mccarthy}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={microsoft}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={nasa}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />

      <img
        src={paypal}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={sap}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={ul}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={youtube}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />

      {/* duplicates 4 infinite scrolling illusion */}
      <img
        src={amazon}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={amplitude}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={appliedMaterials}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={cisco}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={google}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={ibm}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={intel}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={lime}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={linkedin}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
      <img
        src={mccarthy}
        className={carouselStyles.company__logo}
        alt="company-logo"
      />
    </div>
  );
};

export default CompanyCarousel;
