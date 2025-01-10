// File: /src/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Submit Quiz
router.post('/', async (req, res) => {
  const { userId, answers, result } = req.body;
  try {
    const quiz = new Quiz({ user: userId, answers, result });
    await quiz.save();
    res.status(201).json({ message: 'Quiz submitted successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
