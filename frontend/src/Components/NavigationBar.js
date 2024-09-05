import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';
import { LoginRegisterPopup } from './LoginRegisterPopup';
import { useAuth } from '../Contexts/AuthContext';

const NavigationBar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (searchText.trim()) {
      const customEncode = (str) => {
        return encodeURIComponent(str.trim()).replace(/%20/g, '_');
      };
      
      handleClearSearch();
      navigate(`/search/${customEncode(searchText)}`);
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
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

      <div className="navbar-search">
        <button className="search-button" onClick={handleSearchSubmit}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search..." 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {searchText && (
          <FontAwesomeIcon icon={faTimes} className="clear-icon" onClick={handleClearSearch} />
        )}
      </div>

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