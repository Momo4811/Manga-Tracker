import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const { mangaTitle } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `http://localhost:${process.env.PORT || 4000}/search/${mangaTitle}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Network response was not ok');
        }
        setSearchResults(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchResults();
  }, [mangaTitle]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!searchResults.length) {
    return <div>No search results found.</div>;
  }

  return (
    <div>
      <AdvancedSearchFilter onFilterChange={(filters) => {
        const results = searchResults.filter(result => {
          return (
            (filters.keyword === '' || result.title.toLowerCase().includes(filters.keyword.toLowerCase())) &&
            (filters.genre === '' || result.genres?.includes(filters.genre))
          );
        });
        setSearchResults(results);
      }} />
      <div className="search-results">
        {searchResults.map((result, index) => (
          <SearchResultItem key={index} result={result} />
        ))}
      </div>
    </div>
  );
};

export { SearchResultsPage };