require('dotenv').config({ path: '../mongo.env' })

const express = require('express')
const axios = require('axios')
const router = express.Router()

axios.defaults.baseURL = `http://localhost:5000`

router.get('/test', async (req, res) => {
    res.send('Hello World!');
});

router.post('/webScrape', async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'No manga title provided' })
    }

    try {
        const response = await axios.post('/scrape', { title })
        const scrapData = response.data

        res.json(scrapData)

    } catch (error) {
        console.error('Error occurred while scraping:', error.message)
        if (error.response) {
            console.error('Response data:', error.response.data)
            console.error('Response status:', error.response.status)
            console.error('Response headers:', error.response.headers)
        }
        res.status(500).json({ error: 'An error occurred while scraping' })
    }
})

module.exports = router;