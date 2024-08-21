require('dotenv').config({ path: '../../../mongo.env' });
const express = require('express');
const axios = require('axios');

const { getMangaInformation } = require('../webScrapeFunctions.js');
const port = process.env.PORT || 4000;


const router = express.Router();
axios.defaults.baseURL = `http://localhost:${port}`;

/*
    Route to scrape manga information from manganato.com
    Expects a JSON object with a title key
    Returns a JSON object with the manga information
*/
router.post('/scrape', async (req, res) => {
  console.log('Received request:', req.body); // Add this line to log the request body

  const { title: mangaTitle } = req.body;

  if (!mangaTitle) {
    return res.status(400).json({ error: 'No manga title provided' });
  }

  try {
    const mangasFound = await getMangaInformation(mangaTitle);
    res.json(mangasFound);

    console.log(mangasFound)
  } catch (error) {
    console.error('Error fetching manga information:', error); // Add this line to log errors
    res.status(500).json({ error: error.message });
  }
});

router.get('/test', (req, res) => {
  res.send('Test route is working!');
});

module.exports = router;