
import { useState, useEffect } from 'react';

const useSearchManga = (mangaTitle) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const fetchResults = async () => {
      const url = `http://localhost:${process.env.PORT || 4000}/search/${mangaTitle}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
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

    fetchResults();
  }, [mangaTitle]);

  return { searchResults, error };
};

export { useSearchManga };