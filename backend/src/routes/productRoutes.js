const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productsData = require('../data/products.json'); // Load products.json

// Get Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Products Endpoint (Optional: Seed from JSON file)
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(productsData); // Insert new products
    res.status(201).json({ message: 'Products seeded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error seeding products' });
  }
});

module.exports = router;
