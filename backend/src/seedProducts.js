const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Read products from products.json
        const productsFilePath = path.join(__dirname, './data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // Clear existing products
        await Product.deleteMany();
        console.log('Existing products cleared');

        // Seed new products
        await Product.insertMany(products);
        console.log('Products seeded successfully!');

        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
