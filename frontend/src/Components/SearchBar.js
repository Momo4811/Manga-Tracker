import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'; // Assuming you have a CSS file for styling

const SearchBar = ({ searchText, setSearchText, handleClearSearch, handleSearchSubmit }) => {
  return (
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
      />
      {searchText && (
        <FontAwesomeIcon icon={faTimes} className="clear-icon" onClick={handleClearSearch} />
      )}
    </div>
  );
};

export { SearchBar };