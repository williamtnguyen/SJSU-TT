import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import Helmet from 'react-helmet';

import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

import Sample from './portal_pages/sample';
import Brothers from './portal_pages/brothers';
import Login from './portal_pages/login';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from './portal_pages/dashboard';
import Register from './portal_pages/register';
import Edit from './portal_pages/edit';
import MeritForm from './portal_pages/merit-form';
import MeritManager from './portal_pages/merit-manager';

import persistLogin from '../util/persist-login';

/**
 * Parent component that aggregates all pages that are dynamic
 */
const Portal = () => {
  useEffect(() => {
    // Checks localStorage for JWT and ensures authorized users can visit PrivateRoutes
    persistLogin();
  }, []);

  const siteTitle = 'Theta Tau | SJSU';
  return (
    <>
      <Helmet title={siteTitle} />
      <Navbar />
      <Router basepath="/portal">
        <Sample path="/sample" />
        <Sample path="/sample/:resultsAmount" />
        <Brothers path="/brothers" />
        <Login path="/login" />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/register" component={Register} />
        <PrivateRoute path="/edit" component={Edit} />
        <PrivateRoute path="/merit-form" component={MeritForm} />
        <PrivateRoute path="/merit-manager" component={MeritManager} />
      </Router>
      <Footer />
    </>
  );
};

export default Portal;
