const { fetchURL, findMangaURLS } = require('./Utilities/fetchUtils');
const { fetchAndParseMangaPage, extractChapters, extractTotalPages, extractMangaPanels } = require('./Utilities/parseUtils');
const { getCurrentChapterIndex, getBookmarkInformation, getMangaInformation, extractEssentials } = require('./Utilities/mangaUtils');

module.exports = {
  fetchURL,
  findMangaURLS,
  fetchAndParseMangaPage,
  extractChapters,
  getCurrentChapterIndex,
  getBookmarkInformation,
  getMangaInformation,
  extractTotalPages,
  extractMangaPanels,
  extractEssentials
};