import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

import { useAuth } from '../../Contexts/AuthContext';
import { useFetchBookmarks } from '../../Hooks/useFetchBookmarks';
import { Loading, BookmarkItem } from '../../Components';

import './ViewBookmarksPage.css';

const ViewBookmarksPage = () => {
  const { isAuthenticated, userID } = useAuth();
  const [refetchTrigger, setrefetchTrigger] = useState(false);
  const [hideSeen, setHideSeen] = useState(false);
  const [loading, setLoading] = useState(true); 

  const { searchResults, error } = useFetchBookmarks(userID, isAuthenticated, refetchTrigger);

  useEffect(() => {
    if (searchResults) {
      setLoading(false);
    }
  }, [searchResults]);

  const getReadingStatus = (manga) => {
    if (manga.updatesSinceRead === "All caught up (ᴗ_ ᴗ。)") {
      return 'all-read';
    } else if (manga.updatesSinceRead === "Never been read ◝(ᵔᵕᵔ)◜") {
      return 'not-read';
    } else {
      return 'partially-read';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-message-container">
        <FaSignInAlt className="login-icon" />
        <div className="login-message">Please log in to view your bookmarks.</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const filteredResults = hideSeen
    ? searchResults.filter((manga) => getReadingStatus(manga) !== 'all-read')
    : searchResults;

  return (
    <div className="view-bookmarks-page">
      <div className="hide-seen-button-container">
        <button className="hide-seen-button" onClick={() => setHideSeen(!hideSeen)}>
          {hideSeen ? 'Show All' : 'Hide Caught Up Manga'}
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="search-results">
          {filteredResults.map((manga) => (
            <BookmarkItem 
              key={manga.mangaURL}
              manga={manga} 
              readingStatus={getReadingStatus(manga)}
              setrefetchTrigger={setrefetchTrigger} />
          ))}
        </div>
      )}
    </div>
  );
};

export { ViewBookmarksPage };