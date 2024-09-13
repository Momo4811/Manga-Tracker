import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { AdvancedSearchBar, Pagination } from '../../Components';
import { handleAddBookmark } from '../../Utilities/handleAddBookmark';
import { useSearchManga } from '../../Hooks/useSearchManga';
import { useAuth } from '../../Contexts/AuthContext'; // Import useAuth

import './SearchResultsPage.css'; // Import CSS for styling
import { Loading } from '../../Components';

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

const SearchResultsPage = ({ searchType }) => {
  const { mangaTitle } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(1);


  const regularURL = `https://manganato.com/search/story/${mangaTitle}?page=${page}`;
  const advancedURL = `https://manganato.com/advanced_search?${searchParams.toString()}&page=${page}`;
  const searchURL = searchType === 'advanced' ? advancedURL : regularURL;

  const { searchResults, totalPages, error } = useSearchManga(searchURL, page);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    searchParams.set('page', newPage);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if(!searchResults) {
    return <Loading />
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="search-results-page">
          <AdvancedSearchBar />
          <div className="search-results">
            {searchResults.map((manga, index) => (
              <SearchResultItem key={index} manga={manga} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
    </div>
  );
};

export { SearchResultsPage };