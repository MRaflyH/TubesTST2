import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import QuizForm from './components/QuizForm';
import Results from './components/Results';
import DocsPage from './components/DocsPage';
import Dashboard from './components/Dashboard'; // Import Dashboard
import AuthContext from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext); // Check if token exists

  // Redirect to login if no token exists
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

// Header Component
const Header = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav>
      {token ? (
        <>
          <button onClick={logout}>Logout</button>
          <button onClick={() => window.location.href = '/dashboard'}>Dashboard</button>
          <button onClick={() => window.location.href = '/quiz'}>Quiz</button>
          <button onClick={() => window.location.href = '/results'}>Results</button>
        </>
      ) : (
        <>
          <button onClick={() => window.location.href = '/'}>Login</button>
          <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
        </>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Header /> {/* Add Header for navigation */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login page */}
        <Route path="/signup" element={<SignUp />} /> {/* Sign-Up page */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> {/* Protected Dashboard page */}
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizForm />
            </ProtectedRoute>
          }
        /> {/* Protected Quiz page */}
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        /> {/* Protected Results page */}
        <Route path="/docs" element={<DocsPage />} /> {/* Documentation page */}
      </Routes>
    </Router>
  );
};

export default App;
