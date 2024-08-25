import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import { SearchBar } from './SearchBar';

const NavigationBar = () => {
  const [searchText, setSearchText] = useState('');

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

      <SearchBar 
        searchText={searchText} 
        setSearchText={setSearchText} 
        handleClearSearch={handleClearSearch} 
      />
    </nav>
  );
};

export { NavigationBar };