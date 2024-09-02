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
    return []; // Return an empty array instead of throwing an error
  }

  const mangaURLS = mangasFound.map((i, el) => $(el).attr('href')).get();
  return mangaURLS;
};

const getMangaInformation = async (mangaURLS) => {
  
  if (mangaURLS.length === 0) {
    return { message: `No results found for: ${mangaTitle}` }; // Return a message if no results are found
  }
  const mangaPromises = mangaURLS.map(async (mangaURL) => {
    const response = await fetchURL(mangaURL);

    const $ = cheerio.load(response.data);
    const mangaPanel = $('div.panel-story-info');

    const officialTitle = mangaPanel.find('h1').text().trim();
    const alternateTitles = mangaPanel.find('h2').text().trim();
    const mangaStatus = $('body > div.body-site > div.container.container-main > div.container-main-left > div.panel-story-info > div.story-info-right > table > tbody > tr:nth-child(3) > td.table-value').text().trim();
    

    const genres = mangaPanel.find('a.a-h').map((i, el) => $(el).text()).get().slice(1);

    const latestChapter = $('ul.row-content-chapter');
    const chapterNumber = latestChapter.find('a.chapter-name.text-nowrap').first().text().trim();
    const releaseDate = latestChapter.find('span.chapter-time.text-nowrap').first().text().trim();

    const mangaImage = mangaPanel.find('img.img-loading').attr('src');

    return {
      mangaURL: mangaURL,
      title: officialTitle,
      alternateTitles: alternateTitles,
      genres: genres,
      mangaStatus: mangaStatus,
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

module.exports = { findMangaURLS, getMangaInformation };