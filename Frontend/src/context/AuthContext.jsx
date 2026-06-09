import { createContext, useContext, useState, useCallback } from 'react';
import { googleLogout } from '@react-oauth/google';
import authService from '../services/authService';

const AuthContext = createContext(null);

/**
 * Provider de autenticación — envuelve la app para compartir estado de sesión.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return authService.getUser();
  });
  const [token, setToken] = useState(() => {
    return authService.getToken();
  });

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    setUser({
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    });
    setToken(data.token);
    // authService ya se encarga de guardar en localStorage correctamente
    return data;
  }, []);

  const register = useCallback(async (fullName, email, password) => {
    const data = await authService.register(fullName, email, password);
    return data;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    // Limpiar localStorage de Google/tradicional
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    
    // Revocar la sesión local de Google para que no autoseleccione la cuenta al volver a ingresar
    googleLogout();
  }, []);

  const loginWithGoogle = useCallback(async (token) => {
    const data = await authService.loginWithGoogle(token);
    setUser({
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    });
    setToken(data.token);
    return data.role; // Returning role so Login.jsx can redirect accordingly
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar el contexto de autenticación.
 * @returns {{ user, token, isAuthenticated, login, register, logout, loginWithGoogle }}
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return context;
}
