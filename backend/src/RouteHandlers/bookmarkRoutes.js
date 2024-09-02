const express = require('express');
const User = require('../Schema/userSchema').User;

const router = express.Router();

router.get('/fetchBookmarks', async (req, res) => {
  const {userID} = req.body;

  try{
    const user = await User.findById({ userID })
    res.json({ userBookmarks: user.bookmarks })
  }
  catch(error){
    console.error('Error fetching user bookmarks')
    res.status(500).json({ error: 'Internal server error' })
  }
});

router.post('/addBookmark', async(req, res) => {
  const {userID, mangaBookmark} = req.body;

  try{
    const result = await User.updateOne(
      { userID },
      { $push: { bookmarks: mangaBookmark } }
    );
  
    if (result.nModified === 0) {
      throw new Error('User not found or bookmark not present');
    } else {
      res.json({ message: 'Bookmark added successfully' });
    }
  }
  catch(error){
    console.error('Error fetching user bookmarks', error)
    res.status(500).json({ error: error.message })
  }

});

router.get('/deleteBookmark', async(req, res) => {
  const { userID, mangaBookmark } = req.body;

  try {
    // Use the $pull operator to remove the bookmark from the bookmarks array
    const result = await User.updateOne(
      { userID },
      { $pull: { bookmarks: mangaBookmark } }
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