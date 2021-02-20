import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { UserProvider } from './contexts/UserContext';

import NavigationBar from './components/NavigationBar';
import Landing from './pages/landing';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <NavigationBar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </UserProvider>
    </Router>
  );
};

export default App;
