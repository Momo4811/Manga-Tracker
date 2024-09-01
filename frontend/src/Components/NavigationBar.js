import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import { SearchBar } from './SearchBar';
import { LoginRegisterPopup } from './LoginRegisterPopup';

const NavigationBar = () => {
  const [searchText, setSearchText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state

  const handleClearSearch = () => {
    setSearchText('');
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); 
  };


  return (
    <nav className="navbar">
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

      <SearchBar 
        searchText={searchText} 
        setSearchText={setSearchText} 
        handleClearSearch={handleClearSearch} 
      />

      <div className="auth-buttons">
        {isAuthenticated ? (
          <button className="auth-button" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="auth-button" onClick={togglePopup}>Login/Register</button>
        )}
      </div>

      {isPopupOpen && <LoginRegisterPopup togglePopup={togglePopup} setIsAuthenticated={setIsAuthenticated} />}
    </nav>
  );
};

export { NavigationBar };