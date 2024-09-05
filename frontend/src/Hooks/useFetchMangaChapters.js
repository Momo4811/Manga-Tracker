import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchMangaChapters = (isAuthenticated, mangaURL) => {
  const [mangaInfo, setMangaInfo] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/home');
      return;
    }

    const fetchMangaInfo = async () => {
      try {
        const response = await fetch(`http://localhost:${process.env.PORT || 4000}/bookmarks/viewChapters`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mangaURL: mangaURL
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch manga information');
        }
        setMangaInfo(data.mangaInfo);
        setChapters(data.chapters);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMangaInfo();
  }, [isAuthenticated, mangaURL, navigate]);

  return { mangaInfo, chapters, error };
};

export { useFetchMangaChapters };