import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Assuming you have a CSS file for styling

const SearchBar = ({ searchText, setSearchText, handleClearSearch }) => {
  const navigate = useNavigate();

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
        onKeyDown={handleKeyDown}
      />
      {searchText && (
        <FontAwesomeIcon icon={faTimes} className="clear-icon" onClick={handleClearSearch} />
      )}
    </div>
  );
};

export { SearchBar };