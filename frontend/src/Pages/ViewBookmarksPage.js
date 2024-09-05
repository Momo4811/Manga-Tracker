import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { BookmarkItem } from '../Components/BookmarkItem';
import { useFetchBookmarks } from '../Hooks/useFetchBookmarks';
import './ViewBookmarksPage.css'; // Import CSS for styling

const ViewBookmarksPage = () => {
  const { isAuthenticated, userID } = useAuth();
  const [refetchTrigger, setrefetchTrigger] = useState(false);

  const { searchResults, error } = useFetchBookmarks(userID, isAuthenticated, refetchTrigger);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="search-results">
        {searchResults.map((manga) => (
          <BookmarkItem 
            manga={manga} 
            setrefetchTrigger={setrefetchTrigger} />
        ))}
      </div>
    </div>
  );
};

export { ViewBookmarksPage };