// React component for the /docs page
import React from 'react';

const DocsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>TubesTST2 Documentation</h1>

      <h2>Overview</h2>
      <p>TubesTST2 is a web application that integrates a backend API and a React-based frontend to provide a quiz-based platform. This documentation outlines the backend API endpoints, middleware, and frontend components.</p>

      <h2>Backend</h2>
      <h3>API Endpoints</h3>

      <h4>Product Routes</h4>
      <ul>
        <li><strong>GET `/`</strong>: Fetch all available products.</li>
      </ul>

      <h4>Authentication Routes</h4>
      <ul>
        <li><strong>POST `/register`</strong>: Registers a new user.
          <pre><code>{`{
  "name": "string",
  "email": "string",
  "password": "string"
}`}</code></pre>
        </li>
        <li><strong>POST `/login`</strong>: Logs in an existing user.
          <pre><code>{`{
  "email": "string",
  "password": "string"
}`}</code></pre>
        </li>
      </ul>

      <h4>Quiz Routes</h4>
      <ul>
        <li><strong>POST `/`</strong>: Submits quiz data.
          <pre><code>{`{
  "userId": "string",
  "answers": ["string"],
  "result": "string"
}`}</code></pre>
        </li>
        <li><strong>GET `/results`</strong>: Fetch quiz results (requires authentication).</li>
      </ul>

      <h3>Middleware</h3>
      <p><strong>Authentication Middleware:</strong> Verifies JWT tokens in requests to protect specific routes.</p>

      <h2>Frontend</h2>
      <h3>Components</h3>
      <ul>
        <li><strong>QuizForm.jsx:</strong> Displays quiz questions and handles quiz submissions.</li>
        <li><strong>Results.jsx:</strong> Displays the results of submitted quizzes.</li>
        <li><strong>SignUp.jsx:</strong> Registration form for new users.</li>
        <li><strong>Login.jsx:</strong> Login form for users.</li>
      </ul>

      <h3>Context</h3>
      <p><strong>AuthContext.js:</strong> Manages user authentication state.</p>

      <h2>Project Setup</h2>
      <h3>Backend</h3>
      <p><strong>Start the server:</strong></p>
      <pre><code>npm run start</code></pre>
      <p><strong>Environment Variables:</strong></p>
      <ul>
        <li><code>PORT</code>: Port number for the server.</li>
        <li><code>DB_URI</code>: MongoDB connection string.</li>
      </ul>

      <h3>Frontend</h3>
      <p><strong>Start the application:</strong></p>
      <pre><code>npm start</code></pre>
      <p><strong>Environment Variables:</strong></p>
      <ul>
        <li><code>REACT_APP_API_URL</code>: Base URL of the backend API.</li>
      </ul>

      <h2>Deployment</h2>
      <ul>
        <li><strong>Backend:</strong> Deployed using Railway.</li>
        <li><strong>Frontend:</strong> Deployed using Vercel.</li>
      </ul>

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
