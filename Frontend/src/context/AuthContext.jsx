import { createContext, useContext, useState, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

/**
 * Provider de autenticación — envuelve la app para compartir estado de sesión.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getUser());
  const [token, setToken] = useState(() => authService.getToken());

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    setUser({
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    });
    setToken(data.token);
    return data;
  }, []);

  const register = useCallback(async (fullName, email, password) => {
    const data = await authService.register(fullName, email, password);
    return data;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar el contexto de autenticación.
 * @returns {{ user, token, isAuthenticated, login, register, logout }}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return context;
}
