import { useEffect, useState } from 'react';

const useFetchMangaPanels = (mangaURL, chapterURL) => {
  const [panels, setPanels] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPanelsAndChapters = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.PORT || 4000}/manga/fetchPanels`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mangaURL, chapterURL }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch manga panels');
        }
        setPanels(data.panels);
        setChapters(data.chapters.reverse());
        setCurrentChapterIndex(data.chapters.findIndex(chapter => chapter.chapterURL === chapterURL));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPanelsAndChapters();
  }, [mangaURL, chapterURL]);

  return { panels, chapters, currentChapterIndex, error };
};

export { useFetchMangaPanels };