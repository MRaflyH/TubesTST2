import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || ''); // Manage userId

  const login = (newToken, newUserId) => {
    localStorage.setItem('authToken', newToken); // Save token
    localStorage.setItem('userId', newUserId); // Save userId
    setToken(newToken); // Update token state
    setUserId(newUserId); // Update userId state
    console.log('Token:', newToken); // Log token
    console.log('UserId:', newUserId); // Log userId
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token
    localStorage.removeItem('userId'); // Remove userId
    setToken(''); // Clear token state
    setUserId(''); // Clear userId state
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
