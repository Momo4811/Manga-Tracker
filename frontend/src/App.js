import React from 'react';
import { NavigationBar } from './Components/NavigationBar';
import { NavigationBarRoutes } from './Navigation/NavigationBarRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <NavigationBarRoutes />
    </Router>
  );
};

export default App;