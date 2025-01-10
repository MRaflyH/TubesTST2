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
        const response = await axios.get('http://localhost:5000/api/quiz/results', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch results. Please try again.');
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
      <p>Answers: {results.quizAnswers.join(', ')}</p>
      <h2>Recommended Gifts:</h2>
      <ul>
        {results.recommendations.map((product) => (
          <li key={product.name}>
            <h3>{product.name}</h3>
            {product.image && <img src={product.image} alt={product.name} style={{ width: '100px' }} />}
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
