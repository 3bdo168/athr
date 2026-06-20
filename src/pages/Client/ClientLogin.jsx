import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useClientAuth } from '../../hooks/useClientAuth';
import { motion } from 'framer-motion';

export default function ClientLogin() {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone'); // phone → signing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { clientProfile, loginWithGoogle } = useClientAuth();
  const navigate = useNavigate();

  // If already logged in, redirect
  if (clientProfile) {
    if (clientProfile.status === 'approved') return <Navigate to="/client" replace />;
    if (clientProfile.status === 'pending') return <Navigate to="/client/pending" replace />;
    if (clientProfile.status === 'rejected') return <Navigate to="/client/pending" replace />;
  }

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
        setError('Sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-gray-800/60 shadow-2xl shadow-black/40 p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-blue-600/20">
              A
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Client Portal</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sign in to track your projects, download assets, and communicate with the team.
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              {/* Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  📱 Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 1XX XXX XXXX"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-base"
                  dir="ltr"
                />
                <p className="text-xs text-gray-500 mt-2">Enter your phone number, then sign in with Google</p>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={!phone || phone.length < 8}
                className="w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Continue with Google →
              </button>
            </form>
          )}

          {step === 'signing' && loading && (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-3 border-blue-600/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Opening Google Sign-In...</p>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 mt-8 mb-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-500 font-medium">How it works</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {[
              { step: '1', text: 'Enter your phone number' },
              { step: '2', text: 'Sign in with your Gmail account' },
              { step: '3', text: 'Wait for admin approval' },
              { step: '4', text: 'Access your projects & assets' },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                  {item.step}
                </div>
                <span className="text-gray-400">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <a href="/" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
              ← Back to website
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
