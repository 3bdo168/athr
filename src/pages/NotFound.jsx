import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative text-center max-w-lg">

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 12 }}
          className="relative mb-8"
        >
          <span className="text-[10rem] md:text-[14rem] font-display font-black leading-none select-none
                          bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent
                          opacity-15 dark:opacity-10">
            404
          </span>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800
                           flex items-center justify-center shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                   className="text-blue-500">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-3 tracking-tight"
        >
          {t('notFound.title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed"
        >
          {t('notFound.subtitle')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm
                       hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200
                       shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
          >
            {t('notFound.backHome')}
          </Link>
          <Link
            to="/contact"
            className="px-7 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                       text-gray-700 dark:text-gray-300 font-semibold text-sm
                       hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20
                       hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('notFound.contact')}
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
