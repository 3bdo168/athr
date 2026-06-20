// src/context/ClientAuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { observeAuthState, getClientProfile, signInWithGoogle, createClientProfile, logoutUser } from '../firebase/helpers';
import { ADMIN_EMAIL } from '../config/constants';

export const ClientAuthContext = createContext();

export function ClientAuthProvider({ children }) {
  const [clientUser, setClientUser] = useState(null);
  const [clientProfile, setClientProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = observeAuthState(async (currentUser) => {
        if (currentUser) {
          // Skip client profile fetch for admin user
          if (currentUser.email === ADMIN_EMAIL) {
            setClientUser(null);
            setClientProfile(null);
            setLoading(false);
            return;
          }
          try {
            const profile = await getClientProfile(currentUser.uid);
            if (profile && profile.role === 'client') {
              setClientUser(currentUser);
              setClientProfile(profile);
            } else if (!profile) {
              // New client — no doc yet, will be created on login
              setClientUser(currentUser);
              setClientProfile(null);
            } else {
              setClientUser(null);
              setClientProfile(null);
            }
          } catch (err) {
            console.warn('Error fetching client profile:', err);
            setClientUser(null);
            setClientProfile(null);
          }
        } else {
          setClientUser(null);
          setClientProfile(null);
        }
        setLoading(false);
      });
      return () => { if (unsubscribe) unsubscribe(); };
    } catch (err) {
      console.warn('Client auth state observation failed:', err.message);
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async (phoneNumber) => {
    try {
      setError(null);
      const user = await signInWithGoogle();
      const profile = await createClientProfile(user.uid, {
        name: user.displayName || '',
        email: user.email || '',
        phone: phoneNumber || '',
        photoURL: user.photoURL || '',
      });
      setClientUser(user);
      setClientProfile(profile);
      return profile;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setClientUser(null);
      setClientProfile(null);
    } catch (err) {
      console.error('Client logout failed:', err);
    }
  };

  const refreshProfile = async () => {
    if (clientUser) {
      const profile = await getClientProfile(clientUser.uid);
      setClientProfile(profile);
    }
  };

  const value = {
    clientUser,
    clientProfile,
    loading,
    error,
    setError,
    loginWithGoogle,
    logout,
    refreshProfile,
    isApproved: clientProfile?.status === 'approved',
    isPending: clientProfile?.status === 'pending',
    isRejected: clientProfile?.status === 'rejected',
  };

  return (
    <ClientAuthContext.Provider value={value}>
      {children}
    </ClientAuthContext.Provider>
  );
}
