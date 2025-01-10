// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import QuizForm from './components/QuizForm';
// import Results from './components/Results';
// import AuthContext from './AuthContext';

// // ProtectedRoute Component
// const ProtectedRoute = ({ children }) => {
//   const { token } = useContext(AuthContext); // Check if token exists

//   // Redirect to login if no token exists
//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} /> {/* Login page */}
//         <Route
//           path="/quiz"
//           element={
//             <ProtectedRoute>
//               <QuizForm />
//             </ProtectedRoute>
//           }
//         /> {/* Protected Quiz page */}
//         <Route
//           path="/results"
//           element={
//             <ProtectedRoute>
//               <Results />
//             </ProtectedRoute>
//           }
//         /> {/* Protected Results page */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
