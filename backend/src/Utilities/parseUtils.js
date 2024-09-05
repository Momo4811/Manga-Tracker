const cheerio = require('cheerio');
const { fetchURL } = require('./fetchUtils');

// Function to fetch and parse a manga page
const fetchAndParseMangaPage = async ( mangaURL) => {
  const response = await fetchURL(mangaURL);
  return cheerio.load(response.data);
};

// Function to extract chapters from a parsed manga page
const extractChapters = ($) => {
  return $('ul.row-content-chapter a.chapter-name.text-nowrap').map((i, el) => {
    return {
      chapterTitle: $(el).text().trim(),
      chapterURL: $(el).attr('href')
    };
  }).get();
};

module.exports = { fetchAndParseMangaPage, extractChapters };