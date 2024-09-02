import { useAuth } from '../Contexts/AuthContext';

const useRemoveBookmark = (setRefetch) => {
  const { isAuthenticated, userID } = useAuth();

  const handleRemoveBookmark = async (manga) => {
    if (!isAuthenticated) {
      alert('Please log in to remove a bookmark');
      return;
    }

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
      setRefetch(prev => !prev); // Trigger refetch
    } catch (error) {
      console.error('Error removing bookmark:', error);
      alert(error.message || 'Error removing bookmark');
    }
  };

  return { handleRemoveBookmark };
};

export { useRemoveBookmark };