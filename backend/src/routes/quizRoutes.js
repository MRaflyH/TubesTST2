const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const authenticate = require('../middleware/auth'); // Import authentication middleware

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

// Fetch Quiz Results
router.get('/results', authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Use req.user.id from the decoded token
    // Fetch the most recent quiz result for the user
    const latestQuiz = await Quiz.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!latestQuiz) {
      return res.status(404).json({ error: 'No quiz results found.' });
    }
    res.json(latestQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
