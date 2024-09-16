const handleContinueReading = async (manga, userID, setrefetchTrigger) => {
  try {
    const url = `http://localhost:${process.env.PORT || 4000}/bookmarks/readChapter`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID,
        mangaURL: manga.mangaURL,
        action: 'continue'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }

    const data = await response.json();
    setrefetchTrigger(prev => !prev);
    window.open(data.chapterURL, '_blank');
  } catch (error) {
    console.error('Error continuing reading:', error);
    alert(error.message || 'Error continuing reading');
  }
};

export { handleContinueReading };