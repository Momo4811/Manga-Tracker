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

const findMangaURLS = async (mangaTitle) => {
  const searchUrl = `https://manganato.com/search/story/${mangaTitle.replace(' ', '_')}`;
  const response = await fetchURL(searchUrl);

  const $ = cheerio.load(response.data);
  const mangasFound = $('a.item-img.bookmark_check');

  if (!mangasFound.length) {
    return []; // Return an empty array instead of throwing an error
  }

  const mangaURLS = mangasFound.map((i, el) => $(el).attr('href')).get();
  return mangaURLS;
};

module.exports = { fetchURL, findMangaURLS };