import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../AuthContext';

const API_URL = process.env.REACT_APP_API_URL;

const QuizForm = () => {
  const { token, userId } = useContext(AuthContext);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Questions with full descriptions
  const questions = [
    { id: 1, question: 'What type of gift are you looking for?', options: ['Practical and useful', 'Luxurious and unique', 'Relaxing and sentimental', 'Tech-savvy and innovative'] },
    { id: 2, question: 'Who is the gift for?', options: ['A man', 'A woman', 'Unisex', 'A child'] },
    { id: 3, question: 'What is the occasion?', options: ['Birthday', 'Anniversary', 'Thank you', 'No special occasion'] },
    { id: 4, question: 'What price range are you considering?', options: ['Below $20', '$20-$50', '$50-$100', '$100 and above'] },
    { id: 5, question: 'What is the recipient’s personality?', options: ['Active and sporty', 'Artistic and creative', 'Relaxed and laid back', 'Organized and professional'] },
  ];

  const handleOptionChange = (questionId, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionId - 1] = ['A', 'B', 'C', 'D'][questions[questionId - 1].options.indexOf(selectedOption)];
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_URL}/api/quiz/submit`,
        { userId, answers },
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
