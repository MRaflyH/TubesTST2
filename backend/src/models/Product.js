const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: { type: [String], required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, // URL to product image
  popularity: { type: Number, default: 0 }, // For ranking recommendations
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
