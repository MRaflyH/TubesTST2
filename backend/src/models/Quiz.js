const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: [String], required: true }, // Array of selected answers
  result: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
