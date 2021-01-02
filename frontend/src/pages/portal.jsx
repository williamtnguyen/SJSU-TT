import React, { useEffect } from 'react';
import { Router } from '@reach/router';

import Sample from './portal_pages/sample';
import Login from './portal_pages/login';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from './portal_pages/dashboard';
import Register from './portal_pages/register';
import Edit from './portal_pages/edit';

import persistLogin from '../util/persist-login';

/**
 * Parent component that aggregates all pages that are dynamic
 */
const Portal = () => {
  useEffect(() => {
    // Checks localStorage for JWT and ensures authorized users can visit PrivateRoutes
    persistLogin();
  }, []);

  return (
    <Router basepath="/portal">
      <Sample path="/sample" />
      <Sample path="/sample/:resultsAmount" />
      <Login path="/login" />
      <Dashboard path="/dashboard" />
      <Register path="/register" />
      <Edit path="/edit" />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/register" component={Register} />
      <PrivateRoute path="/edit" component={Edit} />
    </Router>
  );
};

export default Portal;
