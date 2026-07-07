import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('isAdmin'));

  const login = async (email, password) => {
    await api.post('/api/admin/login', { email, password });
    localStorage.setItem('isAdmin', 'true');
    setIsAdmin(true);
  };

  const logout = async () => {
    await api.post('/api/admin/logout');
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);