// File: /src/routes/authRoutes.js
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password to Hash:', password);
    console.log('Hashed Password:', hashedPassword);

    // Create the user object
    const user = new User({ name, email, password: hashedPassword });
    console.log('User Object Before Save:', user);

    // Save the user to the database
    const savedUser = await user.save();
    console.log('Saved User:', savedUser);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email); // Debug log
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Login Password:', password); // Log plaintext password
    console.log('Hashed Password in DB:', user.password); // Log hashed password

    // Compare provided password with hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match:', isPasswordMatch); // Debug log

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
