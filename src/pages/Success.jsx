import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Success() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
      <SEO 
        title="Success" 
        description="Thank you for choosing Ather Agency. Your request has been received." 
        path="/success" 
      />
      <div className="text-center max-w-lg">

        {/* Animated Checkmark */}
        <motion.div
          className="mx-auto mb-10 w-28 h-28 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        >
          {/* Circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <motion.circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="url(#successGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            />
            {/* Checkmark */}
            <motion.path
              d="M30 52 L44 66 L70 38"
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="successGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22c55e" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 1 }}
            style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)' }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
        >
          {t('success.title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10"
        >
          {t('success.subtitle')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link
            to="/"
            className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm
                       hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200
                       shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
          >
            {t('success.backHome')}
          </Link>
          <Link
            to="/portfolio"
            className="px-7 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                       text-gray-700 dark:text-gray-300 font-semibold text-sm
                       hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20
                       hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('success.viewWork')}
          </Link>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            {t('success.redirect')} {countdown} {t('success.seconds')}
          </p>
          <div className="w-48 h-1 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 10, ease: 'linear' }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
