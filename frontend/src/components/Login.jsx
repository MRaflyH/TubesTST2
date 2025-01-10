import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import AuthContext from '../AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext); // Access login function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Extract token and userId from response
      const { token, userId } = response.data;

      // Save token and userId in context
      login(token, userId);

      setMessage('Login successful!');

      // Redirect to the Quiz page
      navigate('/quiz');
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
