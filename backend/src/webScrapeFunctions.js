const axios = require('axios');
const cheerio = require('cheerio');

const fetchURL = async (url) => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error(`Failed to load page ${url}`);
  }
  return response;
};

const findMangaURLS = async (mangaTitle) => {
  const searchUrl = `https://manganato.com/search/story/${mangaTitle.replace(' ', '_')}`;
  const response = await fetchURL(searchUrl);

  const $ = cheerio.load(response.data);
  const mangasFound = $('a.item-img.bookmark_check');

  if (!mangasFound.length) {
    throw new Error(`No results found on search of: ${mangaTitle}`);
  }

  const mangaURLS = mangasFound.map((i, el) => $(el).attr('href')).get();
  return mangaURLS;
};

const getMangaInformation = async (mangaTitle) => {
  const mangaURLS = await findMangaURLS(mangaTitle);

  const mangaPromises = mangaURLS.map(async (mangaURL) => {
    const response = await fetchURL(mangaURL);

    const $ = cheerio.load(response.data);
    const mangaPanel = $('div.panel-story-info');

    const officialTitle = mangaPanel.find('h1').text().trim();
    const alternateTitles = mangaPanel.find('h2').text().trim();

    const genres = mangaPanel.find('a.a-h').map((i, el) => $(el).text()).get().slice(1);

    const latestChapter = $('ul.row-content-chapter');
    const chapterNumber = latestChapter.find('a.chapter-name.text-nowrap').first().text().trim();
    const releaseDate = latestChapter.find('span.chapter-time.text-nowrap').first().text().trim();

    const mangaImage = mangaPanel.find('img.img-loading').attr('src');

    return {
      title: officialTitle,
      alternateTitles: alternateTitles,
      genres: genres,
      imageLink: mangaImage,
      latestChapter: {
        chapterNumber: chapterNumber,
        releaseDate: releaseDate
      }
    };
  });

  const mangasFound = await Promise.all(mangaPromises);
  return mangasFound;
};

module.exports = { getMangaInformation };