require('dotenv').config({ path: '../../../mongo.env' });
const express = require('express');
const axios = require('axios');

const { getMangaInformation, findMangaURLS, fetchURL } = require('../webScrapeFunctions.js');
const port = process.env.PORT || 4000;


const router = express.Router();

router.get('/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const mangaURLSFound = await findMangaURLS(title);
    const mangasFound = await getMangaInformation(mangaURLSFound);

    if (mangasFound.message) {
      throw new Error(mangasFound.message); // Return 404 if no results are found
    }

    res.json(mangasFound);
  } catch (error) {
    console.error('Error fetching manga information:', error);
    res.status(500).json({ error: error.message });
  }
});


const cheerio = require('cheerio');
router.post('/advanced-search', async (req, res) => {
  const { searchURL } = req.body;
  const url = `https://manganato.com/advanced_search?${searchURL}`;

  try {
    const response = await fetchURL(url);

    const $ = cheerio.load(response.data);
    const mangasSiteFound = $('a.genres-item-img.bookmark_check');

    if (!mangasSiteFound.length) {
      throw new Error('No results found');
    }
  
    const mangaURLSFound = mangasSiteFound.map((i, el) => $(el).attr('href')).get();
    const mangasFound = await getMangaInformation(mangaURLSFound);

    if (mangasFound.message) {
      throw new Error(mangasFound.message); // Return 404 if no results are found
    }

    res.json(mangasFound);
  } catch (error) {
    console.error('Error fetching advanced search results:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
