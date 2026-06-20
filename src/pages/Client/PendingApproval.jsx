import { useNavigate } from 'react-router-dom';
import { useClientAuth } from '../../hooks/useClientAuth';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function PendingApproval() {
  const { clientProfile, logout, refreshProfile, isApproved, isRejected } = useClientAuth();
  const navigate = useNavigate();

  // Poll for status changes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshProfile();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Redirect if approved
  useEffect(() => {
    if (isApproved) {
      navigate('/client');
    }
  }, [isApproved, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/client/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-gray-800/60 shadow-2xl p-10 text-center">
          {isRejected ? (
            <>
              {/* Rejected State */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center">
                <span className="text-4xl">🚫</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Access Denied</h1>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-sm mx-auto">
                Unfortunately, your account request has been declined. If you believe this is an error, please contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 font-medium text-sm hover:bg-emerald-600/25 transition-all"
                >
                  💬 Contact Support
                </a>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-xl bg-gray-800/60 text-gray-400 border border-gray-700/50 font-medium text-sm hover:text-white hover:bg-gray-800 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Pending State */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center relative">
                <span className="text-4xl">⏳</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Pending Approval</h1>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-sm mx-auto">
                Your account is under review. Our admin team will verify your details and approve your access shortly.
              </p>

              {/* Client Info Card */}
              {clientProfile && (
                <div className="bg-gray-800/30 rounded-2xl border border-gray-800/50 p-5 mb-8 text-left">
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Your Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {clientProfile.photoURL && (
                        <img src={clientProfile.photoURL} alt="" className="w-10 h-10 rounded-full border-2 border-gray-700" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-white">{clientProfile.name}</p>
                        <p className="text-xs text-gray-500">{clientProfile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>📱</span>
                      <span dir="ltr">{clientProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-xs font-semibold text-amber-400">Waiting for admin approval</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={refreshProfile}
                  className="px-6 py-3 rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20 font-medium text-sm hover:bg-blue-600/25 transition-all"
                >
                  🔄 Check Status
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-xl bg-gray-800/60 text-gray-400 border border-gray-700/50 font-medium text-sm hover:text-white hover:bg-gray-800 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
