import React from 'react';
import carouselStyles from '../styles/components/company-carousel.module.scss';

// Company logos
import amazon from '../images/company-logos/amazon.png';
import amplitude from '../images/company-logos/amplitude.svg';
import appliedMaterials from '../images/company-logos/appliedmaterials.png';
import cisco from '../images/company-logos/cisco.png';
import google from '../images/company-logos/google.png';
import ibm from '../images/company-logos/ibm.png';
import intel from '../images/company-logos/intel.png';
import lime from '../images/company-logos/lime.png';
import linkedin from '../images/company-logos/linkedin.png';
import mccarthy from '../images/company-logos/mccarthy.png';
import microsoft from '../images/company-logos/microsoft.png';
import nasa from '../images/company-logos/nasa.png';
import paypal from '../images/company-logos/paypal.png';
import sap from '../images/company-logos/sap.png';
import ul from '../images/company-logos/ul.png';
import youtube from '../images/company-logos/youtube.png';

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
