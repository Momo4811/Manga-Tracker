const { fetchAndParseMangaPage, extractChapters } = require('./parseUtils');

// Function to extract essential manga details
const extractEssentials = ($) => {
  const mangaPanel = $('div.panel-story-info');
  const officialTitle = mangaPanel.find('h1').text().trim();
  const mangaStatus = $('body > div.body-site > div.container.container-main > div.container-main-left > div.panel-story-info > div.story-info-right > table > tbody > tr:nth-child(3) > td.table-value').text().trim();
  const latestChapter = $('ul.row-content-chapter');
  const chapterTitle = latestChapter.find('a.chapter-name.text-nowrap').first().text().trim();
  const releaseDate = latestChapter.find('span.chapter-time.text-nowrap').first().text().trim();
  const mangaImage = mangaPanel.find('img.img-loading').attr('src');

  return {
    officialTitle,
    mangaStatus,
    chapterTitle,
    releaseDate,
    mangaImage
  };
};


// Function to get the next chapter
const getCurrentChapterIndex = (chapters, lastChapterRead) => {
    const lastReadIndex = chapters.findIndex(chapter => chapter.chapterTitle === lastChapterRead.chapterTitle);
    if (lastReadIndex === -1) {
      return null; // No next chapter found
    }
    return lastReadIndex
  };

// Function to calculate updates since last read
const calculateUpdatesSinceRead = (lastChapterRead, chapters) => {
    if (!lastChapterRead) {
      return "Never been read ◝(ᵔᵕᵔ)◜";
    }
  
    const lastReadTitle = lastChapterRead.chapterTitle;
    const lastReadIndex = chapters.findIndex(chapter => chapter.chapterTitle === lastReadTitle);
  
    if (lastReadIndex === -1) {
      return "Last read chapter not found";
    }
  
    const unseenChapters = lastReadIndex;
    if (unseenChapters > 0) {
      return `${unseenChapters} chapters left`;
    } else {
      return "All caught up (ᴗ_ ᴗ。)";
    }
  };
// Function to get bookmark information
const getBookmarkInformation = async (bookmarks) => {
  const mangaPromises = bookmarks.map(async (bookmark) => {
    const $ = await fetchAndParseMangaPage(bookmark.mangaURL);
    const essentials = extractEssentials($);
    const chapters = extractChapters($);
    const updatesSinceRead = calculateUpdatesSinceRead(bookmark.lastChapterRead, chapters);

    return {
      mangaURL: bookmark.mangaURL,
      title: essentials.officialTitle,
      mangaStatus: essentials.mangaStatus,
      imageLink: essentials.mangaImage,
      updatesSinceRead: updatesSinceRead,
      latestChapter: {
        chapterTitle: essentials.chapterTitle,
        releaseDate: essentials.releaseDate
      },
      lastChapterRead: bookmark.lastChapterRead,
    };
  });

  const mangasFound = await Promise.all(mangaPromises);
  return mangasFound;
};

// Function to get manga information based on URLs
const getMangaInformation = async (mangaURLS) => {
  if (mangaURLS.length === 0) {
    return { message: `No results found` };
  }
  const mangaPromises = mangaURLS.map(async (mangaURL) => {
    const $ = await fetchAndParseMangaPage(mangaURL);
    const essentials = extractEssentials($);
    const mangaPanel = $('div.panel-story-info');
    const alternateTitles = mangaPanel.find('h2').text().trim();
    const genres = mangaPanel.find('a.a-h').map((i, el) => $(el).text()).get().slice(1);

    return {
      mangaURL: mangaURL,
      title: essentials.officialTitle,
      alternateTitles: alternateTitles,
      genres: genres,
      mangaStatus: essentials.mangaStatus,
      imageLink: essentials.mangaImage,
      latestChapter: {
        chapterTitle: essentials.chapterTitle,
        releaseDate: essentials.releaseDate
      }
    };
  });

  const mangasFound = await Promise.all(mangaPromises);
  return mangasFound;
};

module.exports = { getCurrentChapterIndex, getBookmarkInformation, getMangaInformation, extractEssentials, calculateUpdatesSinceRead };