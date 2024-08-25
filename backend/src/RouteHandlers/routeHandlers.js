require('dotenv').config({ path: '../../../mongo.env' });
const express = require('express');
const axios = require('axios');

const { getMangaInformation } = require('../webScrapeFunctions.js');
const port = process.env.PORT || 4000;


const router = express.Router();
axios.defaults.baseURL = `http://localhost:${port}`;

router.get('/test', (req, res) => {
  res.send('Test route is working!');
});
/*
    Route to scrape manga information from manganato.com
    Expects a JSON object with a title key
    Returns a JSON object with the manga information
*/
router.post('/scrape', async (req, res) => {
  console.log('Received request:', req.body);

  const { title: mangaTitle } = req.body;

  if (!mangaTitle) {
    return res.status(400).json({ error: 'No manga title provided' });
  }

  try {
    const mangasFound = await getMangaInformation(mangaTitle);

    if (mangasFound.message) {
      return res.status(404).json({ error: mangasFound.message }); // Return 404 if no results are found
    }

    res.json(mangasFound);
    console.log(mangasFound);
  } catch (error) {
    console.error('Error fetching manga information:', error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/search/:title', async (req, res) => {
  const { title } = req.params;
  console.log('Received request:', req.params);

  if (!title) {
    return res.status(400).json({ error: 'No manga title provided' });
  }

  try {
    const mangasFound = await getMangaInformation(title);

    if (mangasFound.message) {
      return res.status(404).json({ error: mangasFound.message }); // Return 404 if no results are found
    }

    res.json(mangasFound);
    console.log(mangasFound);
  } catch (error) {
    console.error('Error fetching manga information:', error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;