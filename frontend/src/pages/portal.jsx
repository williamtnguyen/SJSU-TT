import React from 'react';
import { Router } from '@reach/router';

// Redux global state
import { Provider } from 'react-redux';
import store from '../redux/store';

import Sample from './portal_pages/sample';
import Register from './portal_pages/register';
import Login from './portal_pages/login';

const Portal = () => {
  return (
    <Provider store={store}>
      <Router basepath="/portal">
        <Sample exact path="/sample" />
        <Sample exact path="/sample/:resultsAmount" />
        <Register exact path="/register" />
        <Login exact path="/login" />
      </Router>
    </Provider>
  );
};

export default Portal;
