import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('namah_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('namah_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await adminApi.getMe();
          setAdmin(res.data.admin);
          localStorage.setItem('namah_admin_user', JSON.stringify(res.data.admin));
        } catch (error) {
          console.error('Session expired or invalid token');
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await adminApi.login({ email, password });
    if (res.data.success) {
      setToken(res.data.token);
      setAdmin(res.data.admin);
      localStorage.setItem('namah_admin_token', res.data.token);
      localStorage.setItem('namah_admin_user', JSON.stringify(res.data.admin));
      return res.data;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const logout = async () => {
    try {
      await adminApi.logout();
    } catch (e) {
      // Ignore network errors on logout
    }
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('namah_admin_token');
    localStorage.removeItem('namah_admin_user');
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
