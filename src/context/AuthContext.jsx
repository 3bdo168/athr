// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { observeAuthState, logoutUser } from '../firebase/helpers';
import { ADMIN_EMAIL } from '../config/constants';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = observeAuthState((currentUser) => {
        // DEBUG: log auth state to help diagnose Firestore rules issues
        if (currentUser) {
          console.log('🔐 Auth State:', {
            email: currentUser.email,
            uid: currentUser.uid,
            provider: currentUser.providerData?.[0]?.providerId,
          });
        } else {
          console.log('🔐 Auth State: NOT logged in');
        }
        setUser(currentUser);
        setLoading(false);
      });
      return () => { if (unsubscribe) unsubscribe(); };
    } catch (err) {
      console.warn('Auth state observation setup failed:', err.message);
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  const value = {
    user,
    loading,
    error,
    setError,
    logout,
    isAuthenticated: !!user,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}