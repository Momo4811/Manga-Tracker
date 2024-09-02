const express = require('express');
const User = require('../Schema/userSchema').User;
const { getMangaInformation } = require('../webScrapeFunctions');

const router = express.Router();
// axios.default.baseURL = `http://localhost:${port}`;

router.post('/fetchBookmarks', async (req, res) => {
  const { userID } = req.body;
  console.log('Fetching bookmarks for user', userID);

  try {
    // Fetch the user's bookmarks from the database
    const user = await User.findById(userID);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Fetch manga information for each mangaURL
    const mangaURLs = user.bookmarks.map(bookmark => bookmark.mangaURL);
    const mangasFound = await getMangaInformation(mangaURLs);

    res.json(mangasFound);
  } catch (error) {
    console.error('Error fetching user bookmarks:', error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/addBookmark', async(req, res) => {
  const {userID, mangaBookmark} = req.body;
  console.log('Adding bookmark', mangaBookmark, 'to user', userID);


  try{
    const result = await User.updateOne(
      { _id: userID },
      { $push: { bookmarks: mangaBookmark } }
    );
  
    if (result.nModified === 0) {
      throw new Error('User not found or bookmark not present');
    } else {
      console.log('Bookmark added successfully');
      res.json({ message: 'Bookmark added successfully' });
    }
  }
  
  catch(error){
    console.error('Error fetching user bookmarks', error)
    res.status(500).json({ error: error.message })
  }

});

router.delete('/deleteBookmark', async(req, res) => {
  const { userID, mangaURL } = req.body;
  console.log('Deleting bookmark', mangaURL, 'from user', userID);

  try {
    // Use the $pull operator to remove the bookmark from the bookmarks array
    const result = await User.updateOne(
      { _id: userID },
      { $pull: { bookmarks: {mangaURL: mangaURL } } }
    );

    if (result.nModified === 0) {
      throw new Error('User not found or bookmark not present');
    } else {
      res.json({ message: 'Bookmark deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting user bookmark:', error);
    res.status(500).json({ error: error.message });
}});

module.exports = router;