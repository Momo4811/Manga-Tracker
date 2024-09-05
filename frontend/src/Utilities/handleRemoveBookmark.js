const handleRemoveBookmark = async (manga, setRefetchTrigger, userID) => {
  try {
    const url = `http://localhost:${process.env.PORT || 4000}/bookmarks/deleteBookmark`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID,
        mangaURL: manga.mangaURL
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }

    const data = await response.json();
    alert(data.message || 'Bookmark removed successfully');
    setRefetchTrigger(prev => !prev);
  } catch (error) {
    console.error('Error removing bookmark:', error);
    alert(error.message || 'Error removing bookmark');
  }
};

export { handleRemoveBookmark };