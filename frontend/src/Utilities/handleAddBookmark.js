const handleAddBookmark = async (manga, userID, isAuthenticated) => {
  if (!isAuthenticated) {
    alert('Please log in to add a bookmark');
    return;
  }

  try {
    const url = `http://localhost:${process.env.PORT || 4000}/bookmarks/addBookmark`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID,
        mangaBookmark: {
          mangaURL: manga.mangaURL,
          lastChapterRead: null
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }

    const data = await response.json();
    alert(data.message || 'Bookmark added successfully');
  } catch (error) {
    console.error('Error adding bookmark:', error);
    alert(error.message || 'Error adding bookmark');
  }
};

export { handleAddBookmark };