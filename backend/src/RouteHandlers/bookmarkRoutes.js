const express = require('express');
const User = require('../Schema/userSchema').User;
const { getBookmarkInformation } = require('../webScrapeFunctions');

const router = express.Router();

router.post('/fetchBookmarks', async (req, res) => {
  const { userID } = req.body;
  console.log('Fetching bookmarks for user', userID);

  try {
    // Fetch the user's bookmarks from the database
    const user = await User.findById(userID);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Fetch manga information for each bookmark
    const mangasFound = await getBookmarkInformation(user.bookmarks);
    res.json(mangasFound);
    console.log('Bookmarks fetched successfully');
  } catch (error) {
    console.error('Error fetching user bookmarks:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/addBookmark', async (req, res) => {
  const { userID, mangaBookmark } = req.body;
  console.log('Adding bookmark', mangaBookmark, 'to user', userID);

  try {
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
  } catch (error) {
    console.error('Error fetching user bookmarks', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/deleteBookmark', async (req, res) => {
  const { userID, mangaURL } = req.body;
  console.log('Deleting bookmark', mangaURL, 'from user', userID);

  try {
    // Use the $pull operator to remove the bookmark from the bookmarks array
    const result = await User.updateOne(
      { _id: userID },
      { $pull: { bookmarks: { mangaURL: mangaURL } } }
    );

    if (result.nModified === 0) {
      throw new Error('User not found or bookmark not present');
    } else {
      res.json({ message: 'Bookmark deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting user bookmark:', error);
    res.status(500).json({ error: error.message });
  }
});

const { extractChapters, fetchAndParseMangaPage, getCurrentChapterIndex } = require('../webScrapeFunctions');

// Route to handle reading chapters (both continue and next)
router.put('/readChapter', async (req, res) => {
  const { userID, mangaURL, action } = req.body; // action can be 'continue' or 'next'

  try {
    const user = await User.findById(userID);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bookmark = user.bookmarks.find(b => b.mangaURL === mangaURL);
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    // Fetch and parse the manga page
    const $ = await fetchAndParseMangaPage(mangaURL);
    const chapters = extractChapters($);

    let requestedChapter;
    if (!bookmark.lastChapterRead) {
      // If the user has never read the manga before, start from the first chapter
      requestedChapter = chapters[chapters.length - 1];
    } else {
      const currentChapterIndex = getCurrentChapterIndex(chapters, bookmark.lastChapterRead);
      requestedChapter = chapters[currentChapterIndex];
      if (action === 'next' && requestedChapter) {
        requestedChapter = chapters[currentChapterIndex - 1];
      }
    }

    if (!requestedChapter) {
      return res.status(404).json({ error: 'No more chapters available' });
    }

    // Update the lastChapterRead field in the bookmarks array
    const result = await User.updateOne(
      { _id: userID, 'bookmarks.mangaURL': mangaURL },
      { $set: { 'bookmarks.$.lastChapterRead': requestedChapter } }
    );

    if (result.nModified === 0) {
      throw new Error('Bookmark not found or chapter not updated');
    }

    res.json({ chapterURL: requestedChapter.chapterURL });
  } catch (error) {
    console.error('Error reading chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;