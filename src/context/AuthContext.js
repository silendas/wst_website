import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Cek token saat komponen dimount
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      setToken(sessionToken);
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};