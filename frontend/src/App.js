import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from './Components/NavigationBar';
import { NavigationBarRoutes } from './NavigationBarRoutes';
import { AuthProvider } from './Contexts/AuthContext';
import { ScrollToTopButton } from './Components';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <NavigationBarRoutes />
        <ScrollToTopButton />
      </Router>
    </AuthProvider>
  );
};

export default App;