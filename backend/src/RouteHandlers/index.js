const express = require('express');
const authRouters = require('./authRouters');
const bookmarkRoutes = require('./bookmarkRoutes');
const searchRoutes = require('./searchRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRouters);
router.use('/bookmarks', bookmarkRoutes);
router.use('/search', searchRoutes);
router.use('/user', userRoutes);


module.exports = router;