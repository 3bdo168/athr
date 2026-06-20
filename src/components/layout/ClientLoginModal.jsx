import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientAuth } from '../../hooks/useClientAuth';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientLoginModal({ isOpen, onClose }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone'); // phone → signing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { clientProfile, loginWithGoogle } = useClientAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setPhone('');
      setStep('phone');
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  // If already logged in, redirect
  useEffect(() => {
    if (isOpen && clientProfile) {
      onClose();
      if (clientProfile.status === 'approved') navigate('/client');
      else navigate('/client/pending');
    }
  }, [clientProfile, isOpen, navigate, onClose]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 8) {
      setError('Please enter a valid phone number');
      return;
    }
    setError('');
    setStep('signing');
    handleGoogleSignIn();
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const profile = await loginWithGoogle(phone);
      onClose();
      if (profile.status === 'approved') {
        navigate('/client');
      } else {
        navigate('/client/pending');
      }
    } catch (err) {
      setStep('phone');
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Pop-up blocked. Please allow pop-ups for this site.');
      } else {
        // Display exact error message to debug the issue
        setError(err.message || 'Sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-20"
            >
              ✕
            </button>

            <div className="p-8 relative">
              {/* Header */}
              <div className="text-center mb-8 pt-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-600/20">
                  A
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Client Portal</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Sign in to track your projects and download assets.
                </p>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              {step === 'phone' && (
                <form onSubmit={handlePhoneSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      📱 Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+20 1XX XXX XXXX"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      dir="ltr"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!phone || phone.length < 8}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg shadow-blue-600/20"
                  >
                    Continue with Google →
                  </button>
                </form>
              )}

              {step === 'signing' && loading && (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-3 border-blue-600/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">Opening Google Sign-In...</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
