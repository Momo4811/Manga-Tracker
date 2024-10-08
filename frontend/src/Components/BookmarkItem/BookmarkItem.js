import React from 'react';
import { useNavigate } from 'react-router-dom';

import { handleRemoveBookmark } from '../../Utilities/handleRemoveBookmark';
import { handleContinueReading } from '../../Utilities/handleContinueReading';
import { handleReadNext } from '../../Utilities/handleReadNext';
import { useAuth } from '../../Contexts/AuthContext';

import './BookmarkItem.css';

const BookmarkItem = ({ manga, readingStatus, setrefetchTrigger }) => {
  const navigate = useNavigate();
  const { userID } = useAuth();

  const customEncode = (str) => {
    return encodeURIComponent(str.trim()).replace(/%20/g, '_');
  };

  const handleSelectManga = () => {
    navigate(`/view-manga/${customEncode(manga.title)}`, { state: { mangaURL: manga.mangaURL } })
  }

  return (
    <div className="search-result-item">
      <a className="search-result-link" onClick={handleSelectManga} target="_blank" rel="noopener noreferrer">
        <h2 className="search-results-title">{manga.title || 'No title available'}</h2>
      </a>
      <div className="search-results-content">
        <a onClick={handleSelectManga} target="_blank" rel="noopener noreferrer">
          <img
            className="search-results-image"
            src={manga.imageLink || 'default-image.jpg'}
            alt={manga.title || 'No title available'}
          />
        </a>
        <div className={`bookmark-search-results-info ${readingStatus}`}>
          <p className="unseen-text"><strong >Unseen:</strong> {manga.updatesSinceRead || 'N/A'}</p>
          <p><strong>Status:</strong> {manga.mangaStatus || 'N/A'}</p>
          <p><strong>Last Read Chapter:</strong> {manga.lastChapterRead?.chapterTitle || 'N/A'}</p>
          <br />
          <p><strong>Latest Chapter:</strong> {manga.latestChapter?.chapterTitle || 'N/A'}</p>
          <p><strong>Release Date:</strong> {manga.latestChapter?.releaseDate || 'N/A'}</p>
          <div className="bookmark-buttons">
            <div className='chapter-buttons'>
              <button className="next-chapter-button"
                onClick={() => handleReadNext(manga, userID, setrefetchTrigger)}>Read Next</button>
              <button className="continue-reading-button"
                onClick={() => handleContinueReading(manga, userID, setrefetchTrigger)}>Continue Reading</button>
              <button className="view-all-chapters"
                onClick={handleSelectManga}> View All</button>
            </div>
            <button className="remove-bookmark-button"
              onClick={() => handleRemoveBookmark(manga, setrefetchTrigger, userID)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BookmarkItem };