import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBarRoutes } from '../Navigation/NavigationBarRoutes';
import { SearchBar } from './SearchBar';

const NavigationBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleSearchSubmit = async () => {
    const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT || 4000}/scrape`;

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
      setSearchResults(data);
      setSearchText('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

        <SearchBar 
          searchText={searchText} 
          setSearchText={setSearchText} 
          handleClearSearch={handleClearSearch} 
          handleSearchSubmit={handleSearchSubmit} 
        />
      </nav>
      <NavigationBarRoutes />
      {searchResults && (
        <div className="search-results">
          <h2>{searchResults.title}</h2>
          <img src={searchResults.imageLink} alt={searchResults.title} />
          <p>Alternate Titles: {searchResults.alternateTitles}</p>
          <p>Genres: {searchResults.genres.join(', ')}</p>
          <p>Latest Chapter: {searchResults.latestChapter.chapterNumber}</p>
          <p>Release Date: {searchResults.latestChapter.releaseDate}</p>
        </div>
      )}
    </Router>
  );
};

export { NavigationBar };