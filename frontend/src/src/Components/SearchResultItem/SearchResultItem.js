import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext'; 
import { handleAddBookmark } from '../../Utilities/handleAddBookmark';

import './SearchResultItem.css'; 
const SearchResultItem = ({ manga }) => {
  const navigate = useNavigate();
  const { isAuthenticated, userID } = useAuth(); 

  
  const customEncode = (str) => {
    return encodeURIComponent(str.trim()).replace(/%20/g, '_');
  };

  const handleSelectManga = () => {
    navigate(`/view-manga/${customEncode(manga.title)}`, { state: { mangaURL: manga.mangaURL } })
  }

  return (
    <div className="search-result-item">
      <a className="search-result-link" onClick={handleSelectManga}>
        <h2 className="search-results-title">{manga.title || 'No title available'}</h2>
      </a>
      <div className="search-results-content">
        <a onClick={handleSelectManga}>
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

          <button className="bookmark-button" 
          onClick={() => handleAddBookmark(manga, userID, isAuthenticated)}>Bookmark</button>
        </div>
      </div>
    </div>
  );
};

export { SearchResultItem };