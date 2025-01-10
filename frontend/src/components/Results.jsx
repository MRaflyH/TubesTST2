import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';

const Results = () => {
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quiz/results', {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is passed correctly
          },
        });
        setResult(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch results. Please try again.');
      }
    };

    fetchResult();
  }, [token]);

  if (error) {
    return <div>Error fetching results: {error}</div>;
  }

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Quiz Result</h1>
      <p>Answers: {result.answers.join(', ')}</p>
      <p>Result: {result.result}</p>
    </div>
  );
};

export default Results;
