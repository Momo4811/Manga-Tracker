const express = require('express');
const router = express.Router();

const { extractChapters, fetchAndParseMangaPage, extractEssentials } = require('../webScrapeFunctions');


// Extract manga information and chapters
router.post('/viewChapters', async (req, res) => {
  const { mangaURL } = req.body;

  try {
    const $ = await fetchAndParseMangaPage(mangaURL);
    const essentials = extractEssentials($);
    const mangaPanel = $('div.panel-story-info');

    const mangaInfo = {
      officialTitle: essentials.officialTitle,
      alternateTitles: mangaPanel.find('h2').text().trim(),
      genres: mangaPanel.find('a.a-h').map((i, el) => $(el).text()).get().slice(1),
      description: mangaPanel.find('div.panel-story-info-description').children('h3').remove().end().text().trim(),
      mangaStatus: essentials.mangaStatus,
      latestChapter: {
        chapterTitle: essentials.chapterTitle,
        releaseDate: essentials.releaseDate
      },
      mangaImage: essentials.mangaImage
    };
    const chapters = extractChapters($);

    res.json({ mangaInfo, chapters });
    console.log('Manga chapters fetched successfully');
  } catch (error) {
    console.error('Error fetching manga information:', error);
    res.status(500).json({ error: error.message });
  }
});

const { extractMangaPanels } = require('../Utilities/parseUtils');


// Extract manga panels
router.post('/fetchPanels', async (req, res) => {
  const { mangaURL, chapterURL } = req.body;

  try {
    const panels = await extractMangaPanels(chapterURL);
    const $ = await fetchAndParseMangaPage(mangaURL);
    const chapters = extractChapters($);

    if (!panels.length) {
      return res.status(404).json({ error: 'No panels found' });
    }

    // Proxy the image URLs through the backend
    const proxiedPanels = panels.map(panelURL => {
      return `http://localhost:${process.env.PORT || 4000}/manga/proxy-image?url=${encodeURIComponent(panelURL)}`;
    });

    res.json({ panels: proxiedPanels, chapters });
    console.log('Manga panels fetched successfully');
  } catch (error) {
    console.error('Error fetching manga panels:', error);
    res.status(500).json({ error: 'Failed to fetch manga panels' });
  }
});


const axios = require('axios');

// Add a new route to handle image proxying
const MAX_RETRIES = 3;

const fetchImageWithRetry = async (url, retries = MAX_RETRIES) => {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 OPR/113.0.0.0',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://chapmanganato.to/',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Opera";v="113", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        // Add other necessary headers here
      }
    });
    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${MAX_RETRIES - retries + 1})`);
      return fetchImageWithRetry(url, retries - 1);
    } else {
      throw error;
    }
  }
};

router.get('/proxy-image', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await fetchImageWithRetry(url);
    const contentType = response.headers['content-type'];
    res.set('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

router.put('/updateLastRead', async (req, res) => {
  const { userID, mangaURL, chapterIndex } = req.body;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bookmark = user.bookmarks.find(bookmark => bookmark.mangaURL === mangaURL);
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    const $ = await fetchAndParseMangaPage(mangaURL);
    const chapters = extractChapters($);
    const lastReadChapter = bookmark.lastChapterRead;

    let lastReadIndex = -1;
    if (lastReadChapter) {
      lastReadIndex = chapters.findIndex(chapter => chapter.chapterURL === lastReadChapter.chapterURL);
    }

    if (chapterIndex < lastReadIndex) {
      bookmark.lastChapterRead = chapters[chapterIndex];
      await user.save();
      return res.json({ message: 'Last read chapter updated successfully' });
    }

    res.json({ message: 'No update needed' });
  } catch (error) {
    console.error('Error updating last read chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;