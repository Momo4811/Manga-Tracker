const axios = require('axios');
const cheerio = require('cheerio');

// Utility function to fetch URL
const fetchURL = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error(`Error fetching URL: ${url}`, error);
    throw error;
  }
};

const findMangaURLS = async (searchURL) => {
  const response = await fetchURL(searchURL);
  const $ = cheerio.load(response.data);

  let mangasFound;
  if (searchURL.includes('advanced_search')) {
    mangasFound = $('a.genres-item-img.bookmark_check');
  } else {
    mangasFound = $('a.item-img.bookmark_check');
  }
  
  if (!mangasFound.length) {
    return []; // Return an empty array instead of throwing an error
  }

  const mangaURLS = mangasFound.map((i, el) => $(el).attr('href')).get();
  return mangaURLS;
};


module.exports = { fetchURL, findMangaURLS };