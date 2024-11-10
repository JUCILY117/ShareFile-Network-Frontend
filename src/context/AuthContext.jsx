import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useProfile } from './ProfileContext';

const apiBaseUrl = import.meta.env.VITE_BASE_API;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const { handleLogin, handleLogout } = useProfile();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${apiBaseUrl}/api/auth/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const userData = response.data;
          setUser(userData);
          handleLogin(userData.profileImage);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [token, handleLogin]);

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    fetchUser();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    handleLogout();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
