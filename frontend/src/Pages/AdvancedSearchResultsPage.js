import React from 'react';
import { useLocation } from 'react-router-dom';
import { AdvancedSearchFilter } from '../Components/AdvancedSearchFilters';
import { handleAddBookmark } from '../Utilities/handleAddBookmark';
import { useAdvancedSearch } from '../Hooks/useAdvancedSearch';
import { useAuth } from '../Contexts/AuthContext'; // Import useAuth
import './SearchResultsPage.css'; // Import CSS for styling

const SearchResultItem = ({ manga }) => {
  const { isAuthenticated, userID } = useAuth(); // Get isAuthenticated and userID from AuthContext

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
          <p><strong>Latest Chapter:</strong> {manga.latestChapter?.chapterTitle || 'N/A'}</p>
          <p><strong>Release Date:</strong> {manga.latestChapter?.releaseDate || 'N/A'}</p>
          <button className="bookmark-button" onClick={() => handleAddBookmark(manga, userID, isAuthenticated)}>Bookmark</button>
        </div>
      </div>
    </div>
  );
};

const AdvancedSearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchURL = searchParams.toString();

  const { searchResults, error } = useAdvancedSearch(searchURL);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className={"search-results-page"}>
      <AdvancedSearchFilter />
      <div className="search-results">
        {searchResults.map((manga, index) => (
          <SearchResultItem key={index} manga={manga} />
        ))}
      </div>
    </div>
  );
};

export { AdvancedSearchResultsPage };