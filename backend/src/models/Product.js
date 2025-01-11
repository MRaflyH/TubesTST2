const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, default: null }, // Optional
  tags: { type: [String], default: [] }, // Optional
  popularity: { type: Number, default: 0 } // Optional
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
