
import { useState, useEffect } from 'react';

const useAdvancedSearch = (searchURL) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    setError(null);
    const fetchResults = async () => {
      const url = `http://localhost:${process.env.PORT || 4000}/search/advanced-search`;

      try {
        const response = await fetch(url, {
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
        setSearchResults(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchResults();
  }, [searchURL]);

  return { searchResults, error };
};

export { useAdvancedSearch };