import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../AuthContext';

const QuizForm = () => {
  const { token, userId } = useContext(AuthContext);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const questions = [
    { id: 1, question: 'What is your favorite color?', options: ['Red', 'Blue', 'Green', 'Yellow'] },
    { id: 2, question: 'What type of gift do you prefer?', options: ['Electronics', 'Books', 'Clothing', 'Accessories'] },
    { id: 3, question: 'What is your favorite season?', options: ['Spring', 'Summer', 'Fall', 'Winter'] },
  ];

  const handleOptionChange = (questionId, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionId - 1] = selectedOption;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = "Recommendations based on your answers"; // Placeholder result
      await axios.post(
        'http://localhost:5000/api/quiz',
        { userId, answers, result },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Quiz submitted successfully!');
      navigate('/results');
    } catch (error) {
      setMessage('Error submitting quiz: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Take the Quiz</h1>
      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.question}</h3>
          {q.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={option}
                onChange={() => handleOptionChange(q.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Submit Quiz</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default QuizForm;
