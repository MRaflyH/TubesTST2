// File: /src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
