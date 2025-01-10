import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = () => {
  const [results, setResults] = useState([]);
  const token = 'YOUR_AUTH_TOKEN'; // Replace with dynamic token from your auth logic

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quiz/results', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error.response.data);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h1>Your Quiz Results</h1>
      {results.map((result, index) => (
        <div key={index}>
          <p>Answers: {result.answers.join(', ')}</p>
          <p>Result: {result.result}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
