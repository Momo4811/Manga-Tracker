import { useState, useEffect } from 'react';

const useFetchBookmarks = (userID, isAuthenticated, refetchTrigger, bookmarks) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const fetchBookmarks = async () => {
      const url = `http://localhost:${process.env.PORT || 4000}/bookmarks/fetchBookmarks`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: userID
          })
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

    fetchBookmarks();
  }, [isAuthenticated, refetchTrigger, bookmarks]);

  return { searchResults, error };
};

export { useFetchBookmarks };