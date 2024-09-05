const handleReadNext = async (manga, userID, setRefetchTrigger) => {
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
        action: 'next'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }

    const data = await response.json();
    setRefetchTrigger(prev => !prev);
    window.open(data.chapterURL, '_blank');
  } catch (error) {
    console.error('Error reading next chapter:', error);
    alert(error.message || 'Error reading next chapter');
  }
};

export { handleReadNext };