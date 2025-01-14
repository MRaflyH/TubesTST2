const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quiz', quizRoutes); // All quiz-related routes

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
app.use(errorHandler);

// Log Incoming Requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.path}`);
  next();
});

module.exports = app;
