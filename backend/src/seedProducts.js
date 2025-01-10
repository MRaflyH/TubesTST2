const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const products = [
            { name: 'Gift Item 1', description: 'A wonderful gift', price: 10, category: 'Toys' },
            { name: 'Gift Item 2', description: 'An amazing gift', price: 20, category: 'Books' }
        ];

        await Product.insertMany(products);
        console.log('Products seeded!');
        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
