// File: /src/models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: [String], required: true },
  result: { type: String, required: true },
});

module.exports = mongoose.model('Quiz', quizSchema);
