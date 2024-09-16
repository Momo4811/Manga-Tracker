const express = require('express');

const authRouters = require('./authRouters');
const bookmarkRoutes = require('./bookmarkRoutes');
const mangaRoutes = require('./mangaRoutes');
const searchRoutes = require('./searchRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRouters);
router.use('/bookmarks', bookmarkRoutes);
router.use('/manga', mangaRoutes);
router.use('/search', searchRoutes);
router.use('/user', userRoutes);


module.exports = router;