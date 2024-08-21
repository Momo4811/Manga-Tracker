import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AdvancedSearchFilter } from '../Components/AdvancedSearchFilters';
import './SearchResultsPage.css'; // Import CSS for styling
const SearchResultItem = ({ result }) => {
  return (
    <div className="search-result-item">
      <h2 className="search-results-title">{result.title || 'No title available'}</h2>
      <div className="search-results-content">
        <img 
          className="search-results-image" 
          src={result.imageLink || 'default-image.jpg'} 
          alt={result.title || 'No title available'} 
        />
        <div className="search-results-info">
          <p><strong>Alternate Titles:</strong> {result.alternateTitles || 'N/A'}</p>
          <p><strong>Genres:</strong> {result.genres?.join(', ') || 'N/A'}</p>
          <p><strong>Latest Chapter:</strong> {result.latestChapter?.chapterNumber || 'N/A'}</p>
          <p><strong>Release Date:</strong> {result.latestChapter?.releaseDate || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

SearchResultItem.propTypes = {
  result: PropTypes.object.isRequired,
};

const SearchResultsPage = () => {
  const location = useLocation();
  const { searchResults } = location.state || {};
  const [filteredResults, setFilteredResults] = useState(searchResults);

  const handleFilterChange = (filters) => {
    const results = searchResults?.filter(result => {
      return (
        (filters.keyword === '' || result.title.toLowerCase().includes(filters.keyword.toLowerCase())) &&
        (filters.genre === '' || result.genres?.includes(filters.genre))
      );
    });
    setFilteredResults(results);
  };

  if (!searchResults) {
    return <div>No search results found.</div>;
  }

  return (
    <div>
      <AdvancedSearchFilter onFilterChange={handleFilterChange} />
      <div className="search-results">
        {Object.keys(filteredResults).map((key, i) => (
          <SearchResultItem key={i} result={filteredResults[key]} />
        ))}
      </div>
    </div>
  );
};

export { SearchResultsPage };