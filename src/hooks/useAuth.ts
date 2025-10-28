import { useState, useEffect } from 'react';

interface User {
  username: string;
  password: string;
}

// Hardcoded users
const DEMO_USERS: User[] = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' },
  { username: 'demo', password: 'demo123' },
];

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage
    const session = localStorage.getItem('userSession');
    if (session) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const user = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('userSession', JSON.stringify({ username }));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('userSession');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
