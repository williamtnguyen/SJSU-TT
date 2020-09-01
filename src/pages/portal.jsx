import React from 'react';
import { Router } from '@reach/router';

import Sample from './portal_pages/sample';

// eslint-disable-next-line arrow-body-style
const Portal = () => {
  return (
    <Router basepath="/portal">
      <Sample exact path="/sample/:resultsAmount" />
      <Sample exact path="/sample/" />
    </Router>
  );
};

export default Portal;
