import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';

const Results = () => {
  const { token } = useContext(AuthContext);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!token) {
          throw new Error('Token is missing. Please log in again.');
        }

        const response = await axios.get('http://localhost:5000/api/quiz/results', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response from backend:', response.data); // Debug log
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching results:', err); // Debug log
        setError(err.response?.data?.error || err.message || 'Failed to fetch results.');
      }
    };

    fetchResults();
  }, [token]);

  if (error) {
    return <div>Error fetching results: {error}</div>;
  }

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Quiz Result</h1>
      <p>Answers: {results.quizAnswers?.join(', ')}</p>
      <h2>Recommended Gifts:</h2>
      <ul>
        {results.recommendations?.map((product) => (
          <li key={product.name}>
            <h3>{product.name}</h3>
            {product.image && <img src={product.image} alt={product.name} style={{ width: '100px' }} />}
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
