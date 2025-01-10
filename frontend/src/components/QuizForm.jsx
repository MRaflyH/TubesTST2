import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState('');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODEwMWNkYTVmNzY4MzQ2ZDcxMTk1OSIsImlhdCI6MTczNjUxNzgwNSwiZXhwIjoxNzM2NjA0MjA1fQ.HXwwLPd9opxUTVmWIYnfPXGBD-yY6URVezYVmDf2Q5g'; // Replace with dynamic token from your auth logic

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/quiz',
        {
          userId: 'USER_ID_FROM_BACKEND', // Replace with actual user ID
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Quiz submitted successfully!');
    } catch (error) {
      setMessage('Error submitting quiz: ' + error.response.data.error);
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
