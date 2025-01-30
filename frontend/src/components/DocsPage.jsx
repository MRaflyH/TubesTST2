// React component for the /docs page
import React from 'react';

const DocsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Bespoke Gift API Documentation</h1>

      <h2>Overview</h2>
      <p>Bespoke Gift is a web application that provides personalized gift recommendations through a quiz-based system. This documentation outlines the backend API endpoints, authentication, and frontend components.</p>

      <h2>Technologies Used</h2>

      <h3>Backend</h3>
      <ul>
        <li><strong>Framework:</strong> <a href="https://expressjs.com/">Express.js</a> - A minimalist web framework for Node.js.</li>
        <li><strong>Database:</strong> <a href="https://www.mongodb.com/">MongoDB</a> - A NoSQL database, used via Mongoose ODM.</li>
        <li><strong>Authentication:</strong>
          <ul>
            <li><a href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</a> for token-based authentication.</li>
            <li><a href="https://www.npmjs.com/package/bcryptjs">bcryptjs</a> for password hashing.</li>
          </ul>
        </li>
        <li><strong>Environment Management:</strong> <a href="https://www.npmjs.com/package/dotenv">dotenv</a> for managing environment variables.</li>
        <li><strong>Development Tools:</strong>
          <ul>
            <li><a href="https://nodemon.io/">nodemon</a> for auto-restarting the server during development.</li>
          </ul>
        </li>
      </ul>

      <h3>Frontend</h3>
      <ul>
        <li><strong>Framework:</strong> <a href="https://reactjs.org/">React.js</a> - A JavaScript library for building UI.</li>
        <li><strong>Routing:</strong> <a href="https://reactrouter.com/">React Router</a> - For handling navigation.</li>
        <li><strong>HTTP Client:</strong> <a href="https://axios-http.com/">Axios</a> - For making API requests.</li>
        <li><strong>State Management:</strong> React Context API (used for authentication state).</li>
      </ul>

      <h3>Deployment</h3>
      <ul>
        <li><strong>Frontend Hosting:</strong> Vercel</li>
        <li><strong>Backend Hosting:</strong> Railway</li>
      </ul>

      <h2>Backend API</h2>
      <h3>Authentication Routes</h3>
      <ul>
        <li><strong>POST `/api/auth/register`</strong>: Registers a new user.</li>
        <pre><code>{`{
  "name": "string",
  "email": "string",
  "password": "string"
}`}</code></pre>

        <li><strong>POST `/api/auth/login`</strong>: Logs in an existing user and returns a JWT token.</li>
        <pre><code>{`{
  "email": "string",
  "password": "string"
}`}</code></pre>
      </ul>

      <h3>Quiz Routes</h3>
      <ul>
        <li><strong>POST `/api/quiz/submit`</strong>: Submits quiz answers.</li>
        <pre><code>{`{
  "userId": "string",
  "answers": ["string"]
}`}</code></pre>

        <li><strong>GET `/api/quiz/results`</strong>: Fetch the latest quiz results for the authenticated user.</li>
        <pre><code>Headers:
Authorization: Bearer your_token</code></pre>
      </ul>

      <h3>Product Routes</h3>
      <ul>
        <li><strong>GET `/api/products`</strong>: Fetches available products.</li>
      </ul>

      <h3>Middleware</h3>
      <p><strong>Authentication Middleware:</strong> Protects routes by verifying JWT tokens.</p>

      <h2>Frontend</h2>
      <h3>Components</h3>
      <ul>
        <li><strong>QuizForm.jsx:</strong> Displays quiz questions and submits answers.</li>
        <li><strong>Results.jsx:</strong> Displays quiz results and recommended products.</li>
        <li><strong>SignUp.jsx:</strong> Registration form for new users.</li>
        <li><strong>Login.jsx:</strong> User login form.</li>
      </ul>

      <h3>Context</h3>
      <p><strong>AuthContext.js:</strong> Manages user authentication state.</p>

      <h2>Project Setup</h2>
      <h3>Backend</h3>
      <p><strong>Start the server:</strong></p>
      <pre><code>npm run start</code></pre>
      <p><strong>Environment Variables:</strong></p>
      <ul>
        <li><code>PORT</code>: Server port.</li>
        <li><code>DB_URI</code>: MongoDB connection string.</li>
        <li><code>JWT_SECRET</code>: Secret key for token authentication.</li>
      </ul>

      <h3>Frontend</h3>
      <p><strong>Start the application:</strong></p>
      <pre><code>npm start</code></pre>
      <p><strong>Environment Variables:</strong></p>
      <ul>
        <li><code>REACT_APP_API_URL</code>: Base URL of the backend API.</li>
      </ul>

      <h2>Testing API with cURL</h2>

      <h3>Register a User</h3>
      <pre><code>{`curl -X POST "https://bespoke-gift.up.railway.app/api/auth/register" \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}'`}</code></pre>

      <h3>Log in a User</h3>
      <pre><code>{`curl -X POST "https://bespoke-gift.up.railway.app/api/auth/login" \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "password123"
}'`}</code></pre>

      <h3>Submit Quiz Answers</h3>
      <pre><code>{`curl -X POST "https://bespoke-gift.up.railway.app/api/quiz/submit" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_token>" \
-d '{
  "userId": "679b4ba7fec74f494432c9e0",
  "answers": ["D", "B", "C", "D", "D"]
}'`}</code></pre>

      <h3>Get Quiz Results</h3>
      <pre><code>{`curl -X GET "https://bespoke-gift.up.railway.app/api/quiz/results" \
-H "Authorization: Bearer <your_token>"`}</code></pre>

      <h2>Future Improvements</h2>
      <ul>
        <li>Expand quiz logic for more personalized recommendations.</li>
        <li>Add user profile settings.</li>
        <li>Improve UI/UX.</li>
      </ul>
    </div>
  );
};

export default DocsPage;
