// React component for the /docs page
import React from 'react';

const DocsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>TubesTST2 Documentation</h1>
      <p><strong>Overview:</strong> TubesTST2 is a web application that integrates a backend API and a React-based frontend to provide a quiz-based platform.</p>

      <h2>Backend</h2>
      <h3>API Endpoints</h3>

      <h4>Product Routes</h4>
      <ul>
        <li><strong>GET /</strong>: Fetch all available products.</li>
      </ul>

      <h4>Authentication Routes</h4>
      <ul>
        <li><strong>POST /register</strong>: Registers a new user.</li>
        <li><strong>POST /login</strong>: Logs in an existing user.</li>
      </ul>

      <h4>Quiz Routes</h4>
      <ul>
        <li><strong>POST /</strong>: Submits quiz data.</li>
        <li><strong>GET /results</strong>: Fetch quiz results (requires authentication).</li>
      </ul>

      <h3>Middleware</h3>
      <p><strong>Authentication Middleware</strong>: Verifies JWT tokens to protect specific routes.</p>

      <h2>Frontend</h2>
      <h3>Components</h3>
      <ul>
        <li><strong>QuizForm.jsx</strong>: Displays quiz questions and handles submissions.</li>
        <li><strong>Results.jsx</strong>: Displays quiz results.</li>
        <li><strong>SignUp.jsx</strong>: Registration form for new users.</li>
        <li><strong>Login.jsx</strong>: Login form for users.</li>
      </ul>

      <h3>Context</h3>
      <p><strong>AuthContext.js</strong>: Manages user authentication state.</p>

      <h2>Project Setup</h2>
      <h3>Backend</h3>
      <p>Start the server with <code>npm run start</code>.</p>

      <h3>Frontend</h3>
      <p>Start the application with <code>npm start</code>.</p>

      <h2>Deployment</h2>
      <p>Backend is deployed on a Node.js server. Frontend is deployed using Vercel.</p>

      <h2>Future Improvements</h2>
      <ul>
        <li>Expand quiz functionality with more question types.</li>
        <li>Add admin dashboard for managing users and quizzes.</li>
        <li>Improve UI/UX design for better user experience.</li>
      </ul>
    </div>
  );
};

export default DocsPage;
