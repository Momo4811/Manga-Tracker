const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Schema/userSchema').User;

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  console.log('Registering user', req.body)

  try {
    const { username, email, password } = req.body
    console.log('Registering user', username, "with password ", password);

    // Check if the user already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    console.log('User registered successfully with id:', newUser._id.toString());
    res.status(201).json({ 
      message: 'User registered successfully',
      userID: newUser._id.toString()});

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: error.message })
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Logging in user', username, "with password", password)

  try {
    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('User not found' )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }
    
    console.log('User logged in successfully with id:', user._id.toString());
    res.json({ 
      message: 'Login successful', 
      userID: user._id.toString() })
  } catch (error) {
    console.error('Error logging in user ', error);
    res.status(500).json({ error: error.message })
  }
});

module.exports = router;


