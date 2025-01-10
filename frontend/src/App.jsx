import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizForm from './components/QuizForm';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
