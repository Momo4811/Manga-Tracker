require('dotenv').config({ path: '../../../mongo.env' });
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const { getMangaInformation, findMangaURLS } = require('../webScrapeFunctions.js');
const port = process.env.PORT || 4000;


const router = express.Router();
axios.default.baseURL = `http://localhost:${port}`;

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

module.exports = router;