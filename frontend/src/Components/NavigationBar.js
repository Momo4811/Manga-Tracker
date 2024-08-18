import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBarRoutes } from '../Navigation/NavigationBarRoutes';

const NavigationBar = () => {
  return (
    <Router>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/view-bookmarks" className="navbar-link">View Bookmarks</Link>
          </li>
          <li className="navbar-item">
            <Link to="/add-bookmark" className="navbar-link">Add Bookmark</Link>
          </li>
        </ul>
      </nav>
      <NavigationBarRoutes />
    </Router>
  );
};

export { NavigationBar };