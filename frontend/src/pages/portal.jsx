import React from 'react';
import { Router } from '@reach/router';

import Sample from './portal_pages/sample';
import Register from './portal_pages/register';

// eslint-disable-next-line arrow-body-style
const Portal = () => {
  return (
    <Router basepath="/portal">
      <Sample exact path="/sample" />
      <Sample exact path="/sample/:resultsAmount" />
      <Register exact path="/register" />
    </Router>
  );
};

export default Portal;
