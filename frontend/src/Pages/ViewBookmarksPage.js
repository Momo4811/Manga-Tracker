// frontend/src/Pages/ViewBookmarksPage.js
import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { BookmarkItem } from '../Components/BookmarkItem';
import { useFetchBookmarks } from '../Hooks/useFetchBookmarks';
import { FaSignInAlt } from 'react-icons/fa'; // Import an icon for better visual appeal

import './ViewBookmarksPage.css'; // Import CSS for styling

const ViewBookmarksPage = () => {
  const { isAuthenticated, userID } = useAuth();
  const [refetchTrigger, setrefetchTrigger] = useState(false);
  const [hideSeen, setHideSeen] = useState(false); // State to manage visibility of seen mangas

  const { searchResults, error } = useFetchBookmarks(userID, isAuthenticated, refetchTrigger);

  const getReadingStatus = (manga) => {
    if (manga.updatesSinceRead == "All caught up (ᴗ_ ᴗ。)") {
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
      <div className="search-results">
        {filteredResults.map((manga) => (
          <BookmarkItem 
            key={manga.mangaURL}
            manga={manga} 
            readingStatus={getReadingStatus(manga)}
            setrefetchTrigger={setrefetchTrigger} />
        ))}
      </div>
    </div>
  );
};

export { ViewBookmarksPage };