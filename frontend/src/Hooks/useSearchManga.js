
import { useState, useEffect } from 'react';

const useSearchManga = (searchURL, page) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setError(null);
    const fetchResults = async () => {
      const backendURL = `http://localhost:${process.env.PORT || 4000}/search/extract`;

      try {
        const response = await fetch(backendURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchURL }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Network response was not ok');
        }
        setSearchResults(data.mangasFound);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchResults();
  }, [searchURL, page]);

  return { searchResults, totalPages, error };
};

export { useSearchManga };