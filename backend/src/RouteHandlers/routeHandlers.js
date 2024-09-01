require('dotenv').config({ path: '../../../mongo.env' });
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const { getMangaInformation } = require('../webScrapeFunctions.js');
const port = process.env.PORT || 4000;


const router = express.Router();
axios.defaults.baseURL = `http://localhost:${port}`;

router.get('/search/:title', async (req, res) => {
  const { title } = req.params;

  if (!title) {
    return res.status(400).json({ error: 'No manga title provided' });
  }

  try {
    const mangasFound = await getMangaInformation(title);

    if (mangasFound.message) {
      return res.status(404).json({ error: mangasFound.message }); // Return 404 if no results are found
    }

    res.json(mangasFound);
  } catch (error) {
    console.error('Error fetching manga information:', error);
    res.status(500).json({ error: error.message });
  }
});

const bcrypt = require('bcrypt');
const { User } = require('../Schema/userSchema'); // Import the User model

// Register a new user
router.post('/register', async (req, res) => {
  console.log('Registering user', req.body);
  try {
    const { username, email, password } = req.body;
    console.log('Registering user', username, "with password ", password);

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    console.log('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Logging in user', username, "with password", password);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    console.log('User logged in successfully');
    res.json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;