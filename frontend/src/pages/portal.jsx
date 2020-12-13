import React, { useEffect } from 'react';
import { Router } from '@reach/router';

import Sample from './portal_pages/sample';
import Register from './portal_pages/register';
import Login from './portal_pages/login';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from './portal_pages/dashboard';

import persistLogin from '../util/persist-login';

const Portal = () => {
  useEffect(() => {
    // Checks localStorage for JWT and ensures authorized users can visit PrivateRoutes
    persistLogin();
  }, []);

  return (
    <Router basepath="/portal">
      <Sample exact path="/sample" />
      <Sample exact path="/sample/:resultsAmount" />
      <Login exact path="/login" />
      <PrivateRoute exact path="/register" component={Register} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
    </Router>
  );
};

export default Portal;
