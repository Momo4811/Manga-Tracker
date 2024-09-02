const express = require('express');
const User = require('../Schema/userSchema').User;

const router = express.Router();

router.get('/fetchUserID', async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    console.log('UserID found:', user._id);
    res.json({ message: 'UserID found', userId: user._id });
  } catch (error) {
    console.error('Error fetching userID:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;