import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Landing from './pages/landing';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Route exact path="/" component={Landing} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
