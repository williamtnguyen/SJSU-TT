import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { UserProvider } from './contexts/UserContext';

import NavigationBar from './components/NavigationBar';
import Landing from './pages/landing';
import Login from './pages/login';
import About from './pages/about';
import Brothers from './pages/brothers';
import Rush from './pages/rush';
import Dashboard from './pages/dashboard';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <NavigationBar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/brothers" component={Brothers} />
        <Route exact path="/rush" component={Rush} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Footer />
      </UserProvider>
    </Router>
  );
};

export default App;
