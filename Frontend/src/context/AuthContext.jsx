import { createContext, useContext, useState, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

/**
 * Provider de autenticación — envuelve la app para compartir estado de sesión.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const localUser = localStorage.getItem('user');
      return localUser ? JSON.parse(localUser) : authService.getUser();
    } catch {
      return authService.getUser();
    }
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || authService.getToken();
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
    // Persistir login tradicional en localStorage
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', data.token);
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
  }, []);

  const loginWithGoogle = useCallback(({ name, email, picture, role }) => {
    const userData = {
      id: email, // Usamos el email como ID temporal para GSI
      fullName: name,
      email,
      role,
      picture,
    };
    const googleToken = `google-auth-token`; // Token simbólico
    setUser(userData);
    setToken(googleToken);
    
    // Persistir en localStorage para que resista recargas de página
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', googleToken);
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
