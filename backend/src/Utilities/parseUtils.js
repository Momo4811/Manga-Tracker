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

const extractTotalPages = async(searchURL) => {
  const response = await fetchURL(searchURL);
  const $ = cheerio.load(response.data);
  const lastPageLink = $('a.page-blue.page-last').attr('href');
  return lastPageLink ? parseInt(lastPageLink.match(/page=(\d+)/)[1], 10) : 1;
};

const extractMangaPanels = async (mangaURL) => {
  const response = await fetchURL(mangaURL);
  const $ = cheerio.load(response.data);

  const panels = $('div.container-chapter-reader img').map((i, el) => $(el).attr('src')).get();
  return panels;
};

module.exports = { fetchAndParseMangaPage, extractChapters, extractTotalPages, extractMangaPanels };