import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      {token ? (
        <>
          <h1>Welcome to Your Dashboard</h1>
          <button onClick={() => navigate('/quiz')}>Take Quiz</button>
          <button onClick={() => navigate('/results')}>View Results</button>
        </>
      ) : (
        <>
          <h1>Welcome, Please Login or Signup</h1>
          <button onClick={() => navigate('/')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
