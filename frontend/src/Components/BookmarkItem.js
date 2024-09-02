import React from 'react';
import { useRemoveBookmark } from '../Hooks/useRemoveBookmark';

const BookmarkItem = ({ manga, setrefetchTrigger }) => {
    const { handleRemoveBookmark } = useRemoveBookmark(setrefetchTrigger);
  
    return (
      <div className="search-result-item">
        <a className="search-result-link" href={manga.mangaURL} target="_blank" rel="noopener noreferrer">
          <h2 className="search-results-title">{manga.title || 'No title available'}</h2>
        </a>
        <div className="search-results-content">
          <a href={manga.mangaURL} target="_blank" rel="noopener noreferrer">
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
            <button className="remove-bookmark-button" onClick={() => handleRemoveBookmark(manga)}>Remove</button>
          </div>
        </div>
      </div>
    );
  };

  export { BookmarkItem };