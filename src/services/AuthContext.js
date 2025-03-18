// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize as false

  const login = (token) => {
    localStorage.setItem('access_token', token);
    setIsLoggedIn(true); // Set to true only after successful login
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false); // Set to false after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);