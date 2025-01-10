import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import AuthContext from '../AuthContext';

const QuizForm = () => {
  const { token, userId } = useContext(AuthContext); // Use token and userId from AuthContext
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage('User not logged in. Please log in first.');
      return;
    }

    try {
      const result = "Some Result"; // Placeholder for result logic
      await axios.post(
        'http://localhost:5000/api/quiz',
        {
          userId, // Use dynamic userId
          answers,
          result,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Quiz submitted successfully!');
      navigate('/results'); // Redirect to Results page
    } catch (error) {
      setMessage('Error submitting quiz: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Take the Quiz</h1>
      <label>Question 1:</label>
      <input type="text" onChange={(e) => handleAnswerChange(0, e.target.value)} />
      <br />
      <label>Question 2:</label>
      <input type="text" onChange={(e) => handleAnswerChange(1, e.target.value)} />
      <br />
      <label>Question 3:</label>
      <input type="text" onChange={(e) => handleAnswerChange(2, e.target.value)} />
      <br />
      <button type="submit">Submit Quiz</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default QuizForm;
