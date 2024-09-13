import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { LoginRegisterPopup } from '../LoginRegisterPopup/LoginRegisterPopup';
import { useAuth } from '../../Contexts/AuthContext';
import './NavigationBar.css';
import { SearchBar } from '../SearchBar/SearchBar';

const NavigationBar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      
      {/* Links to different pages */}
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/view-bookmarks" className="navbar-link">View Bookmarks</Link>
        </li>
        <li className="navbar-item">
          <Link to="/add-bookmark" className="navbar-link">Add Bookmark</Link>
        </li>
      </ul>
      
        {/* Search bar */}
      <SearchBar searchText={searchText} setSearchText={setSearchText} />


      {/* Login/Register button */}
      <div className="auth-buttons">
        {isAuthenticated ? (
          <button className="auth-button" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="auth-button" onClick={togglePopup}>Login/Register</button>
        )}
      </div>

      {isPopupOpen && <LoginRegisterPopup togglePopup={togglePopup} />}
    </nav>
  );
};

export { NavigationBar };