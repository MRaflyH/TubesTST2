const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Product = require('../models/Product');
const authenticate = require('../middleware/auth');

// Fetch Quiz Results
router.get('/results', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch the latest quiz for the user
    const latestQuiz = await Quiz.findOne({ user: userId }).sort({ createdAt: -1 });

    if (!latestQuiz) {
      return res.status(404).json({ error: 'No quiz results found.' });
    }

    // Fetch recommended products based on quiz result (tags)
    const recommendations = await Product.find({
      tags: { $in: latestQuiz.result.split(', ') }, // Split result string into tags
    })
      .sort({ popularity: -1 })
      .limit(10);

    res.json({
      quizAnswers: latestQuiz.answers,
      result: latestQuiz.result,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz results.' });
  }
});

router.post('/submit', authenticate, async (req, res) => {
  const { userId, answers } = req.body;

  // Validate userId and answers
  if (!userId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  try {
    // Map quiz answers to tags
    const questionToTags = [
      { A: "practical", B: "luxury", C: "relaxation", D: "tech" },
      { A: "men", B: "women", C: "unisex", D: "children" },
      { A: "birthday", B: "anniversary", C: "thank_you", D: "casual" },
      { A: "price < 20", B: "price >= 20 && price <= 50", C: "price >= 50 && price <= 100", D: "price > 100" },
      { A: "active", B: "artistic", C: "relaxation", D: "organization" }
    ];

    // Calculate the result based on answers
    const tags = answers.map((answer, index) => questionToTags[index]?.[answer]).filter(Boolean);
    const result = tags.join(', '); // Combine tags into a string for simplicity

    // Save the quiz to the database
    const quiz = new Quiz({ user: userId, answers, result });
    const savedQuiz = await quiz.save();
    console.log('Quiz Saved:', savedQuiz); // Debug log
    res.status(201).json({ message: 'Quiz submitted successfully!', result });
  } catch (error) {
    console.error('Error Saving Quiz:', error.message); // Debug log
    res.status(500).json({ error: 'Failed to submit quiz.' });
  }
});

module.exports = router;
