import React, { useState } from 'react';
import './HomePage.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');


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
    <div className="home-page">
      <div className="pixel-background"></div>
      <h1>Welcome to Manga Tracker</h1>
      <p>Track your favorite manga and never miss an update!</p>
      <div className="search-container">
        <input
          type="text"
          className="home-search-input"
          placeholder="Search for Manga..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="home-search-button" onClick={handleSearchSubmit}>Search</button>
      </div>
      <div className="animated-elements">
        <div className="pixel-art pixel-art-1"></div>
        <div className="pixel-art pixel-art-2"></div>
        <div className="pixel-art pixel-art-3"></div>
      </div>
    </div>
  );
};

export { HomePage }; 