require('dotenv').config({ path: '../../../mongo.env' });
const express = require('express');
const axios = require('axios');

const { getMangaInformation, findMangaURLS, fetchURL, extractTotalPages } = require('../webScrapeFunctions.js');
const port = process.env.PORT || 4000;

const router = express.Router();

router.post('/extract', async (req, res) => {
  const { searchURL } = req.body;
  console.log('search URL:', searchURL);

  try {
    const mangaURLSFound = await findMangaURLS(searchURL);
    
    if (!mangaURLSFound.length) {
      throw new Error('No results found');
    }

    const mangasFound = await getMangaInformation(mangaURLSFound);

    if (mangasFound.message) {
      throw new Error(mangasFound.message); // Return 404 if no results are found
    }

    const totalPages = await extractTotalPages(searchURL);
    console.log('Total pages:', totalPages);

    res.json({ mangasFound, totalPages });
  } catch (error) {
    console.error('Error fetching advanced search results:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;