// frontend/src/Components/SearchResultItem/SearchResultItem.js

import React from 'react';
import { useAuth } from '../../Contexts/AuthContext'; // Import useAuth
import { handleAddBookmark } from '../../Utilities/handleAddBookmark';
import './SearchResultItem.css'; // Import CSS for styling

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

export { SearchResultItem };