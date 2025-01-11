const express = require('express'); // Add this import
const mongoose = require('mongoose');
const router = express.Router(); // Initialize router
const Product = require('../models/Product'); // Import Product model
const User = require('../models/User'); // Import User model

router.post('/submit', async (req, res) => {
  const { userId, answers } = req.body;

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  const userExists = await User.findById(userId);
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  // Validate answers
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format" });
  }

  // Map quiz answers to tags dynamically
  const questionToTags = [
    { A: "practical", B: "luxury", C: "relaxation", D: "tech" }, // Question 1
    { A: "men", B: "women", C: "unisex", D: "children" }, // Question 2
    { A: "birthday", B: "anniversary", C: "thank_you", D: "casual" }, // Question 3
    { A: "price < 20", B: "price >= 20 && price <= 50", C: "price >= 50 && price <= 100", D: "price > 100" }, // Question 4
    { A: "active", B: "artistic", C: "relaxation", D: "organization" } // Question 5
  ];

  try {
    // Generate tags based on answers
    const selectedTags = answers.map((answer, index) => questionToTags[index]?.[answer]).filter(Boolean);

    if (selectedTags.length === 0) {
      return res.status(400).json({ error: "No valid tags generated from answers" });
    }

    // Fetch products matching the selected tags
    const recommendations = await Product.find({
      tags: { $in: selectedTags },
    })
      .sort({ popularity: -1 })
      .limit(10);

    if (recommendations.length === 0) {
      return res.json({ message: "No recommendations found. Try different preferences." });
    }

    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: "Failed to process quiz results." });
  }
});

module.exports = router; // Export router
