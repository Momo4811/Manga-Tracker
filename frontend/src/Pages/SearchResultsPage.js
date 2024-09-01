import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AdvancedSearchFilter } from '../Components/AdvancedSearchFilters';
import './SearchResultsPage.css'; // Import CSS for styling

const SearchResultItem = ({ result: manga }) => {

  const handleBookmark = () => {
    // Add your bookmark logic here
    console.log(`Bookmarking manga: ${manga.title}`);
  };

  return (
    <div className="search-result-item">
      <a className="search-result-link" href={manga.mangaURL}>
        <h2 className="search-results-title">{manga.title || 'No title available'}</h2>
      </a>
      <div className="search-results-content">
        <a href={manga.mangaURL}>
        <img 
          className="search-results-image" 
          src={manga.imageLink || 'default-image.jpg'} 
          alt={manga.title || 'No title available'} 
        />
        </a>
        <div className="search-results-info">
          <p><strong>Alternate Titles:</strong> {manga.alternateTitles || 'N/A'}</p>
          <p><strong>Genres:</strong> {manga.genres?.join(', ') || 'N/A'}</p>
          <p><strong>Status:</strong> {manga.mangaStatus || 'N/A'}</p>
          <p><strong>Latest Chapter:</strong> {manga.latestChapter?.chapterNumber || 'N/A'}</p>
          <p><strong>Release Date:</strong> {manga.latestChapter?.releaseDate || 'N/A'}</p>
          <button className="bookmark-button" onClick={handleBookmark}>Bookmark</button>
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
    setError(null);
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

  return (
    <div>
      <AdvancedSearchFilter />
      <div className="search-results">
        {searchResults.map((result, index) => (
          <SearchResultItem key={index} result={result} />
        ))}
      </div>
    </div>
  );
};

export { SearchResultsPage };