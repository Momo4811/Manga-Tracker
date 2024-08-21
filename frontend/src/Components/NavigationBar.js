import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import { SearchBar } from './SearchBar';

const NavigationBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  function handleClearSearch() {
    setSearchText('');
  };

  const handleSearchSubmit = async (event)=> {
  event.preventDefault();

  const url = `http://localhost:${process.env.PORT || 4000}/scrape`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: searchText }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setSearchText('');
    navigate('/search-results', { state: { searchResults: data } });
  } catch (error) {
    console.error('Error:', error);
  }
}

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
          handleSearchSubmit={handleSearchSubmit} 
        />
      </nav>
  );
};

export { NavigationBar };