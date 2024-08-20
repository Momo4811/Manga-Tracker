const axios = require('axios');
const cheerio = require('cheerio');

const fetchUrl = async (url) => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error(`Failed to load page ${url}`);
  }
  return response;
};

const findMangaUrl = async (mangaTitle) => {
  const searchUrl = `https://manganato.com/search/story/${mangaTitle.replace(' ', '_')}`;
  const response = await fetchUrl(searchUrl);

  const $ = cheerio.load(response.data);
  const mangaFound = $('a.item-img.bookmark_check').first();

  if (!mangaFound.length) {
    throw new Error(`No manga found called ${mangaTitle}`);
  }

  const mangaUrl = mangaFound.attr('href');
  return mangaUrl;
};

const getMangaInformation = async (mangaTitle) => {
  const mangaUrl = await findMangaUrl(mangaTitle);
  const response = await fetchUrl(mangaUrl);

  const $ = cheerio.load(response.data);
  const mangaPanel = $('div.panel-story-info');

  const officialTitle = mangaPanel.find('h1').text().trim();
  const alternateTitles = mangaPanel.find('h2').text().trim();

  const genres = mangaPanel.find('a.a-h').map((i, el) => $(el).text()).get().slice(1);

  const latestChapter = $('ul.row-content-chapter');
  const chapterNumber = latestChapter.find('a.chapter-name.text-nowrap').first().text().trim();
  const releaseDate = latestChapter.find('span.chapter-time.text-nowrap').first().text().trim();

  const mangaImage = mangaPanel.find('img.img-loading').attr('src');

  const mangaInformation = {
    title: officialTitle,
    alternateTitles: alternateTitles,
    genres: genres,
    imageLink: mangaImage,
    latestChapter: {
      chapterNumber: chapterNumber,
      releaseDate: releaseDate
    }
  };

  return mangaInformation;
};

module.exports = { getMangaInformation };