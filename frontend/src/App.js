import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from './Components';
import { NavigationBarRoutes } from './NavigationBarRoutes';

import { AuthProvider } from './Contexts/AuthContext';
import { AdvancedSearchProvider } from './Contexts/AdvancedSearchContext';

import { ScrollToTopButton } from './Components';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AdvancedSearchProvider>
          <NavigationBar />
          <NavigationBarRoutes />
          <ScrollToTopButton />
        </AdvancedSearchProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;