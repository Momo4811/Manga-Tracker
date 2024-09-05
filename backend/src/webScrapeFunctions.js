const { fetchURL, findMangaURLS } = require('./Utilities/fetchUtils');
const { fetchAndParseMangaPage, extractChapters } = require('./Utilities/parseUtils');
const { getCurrentChapterIndex, getBookmarkInformation, getMangaInformation } = require('./Utilities/mangaUtils');

module.exports = {
  fetchURL,
  findMangaURLS,
  fetchAndParseMangaPage,
  extractChapters,
  getCurrentChapterIndex,
  getBookmarkInformation,
  getMangaInformation
};