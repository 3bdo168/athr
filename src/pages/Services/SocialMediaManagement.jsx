import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function SocialMediaManagement() {
  const { t } = useLanguage();

  const features = [
    t('svc.social.f1'), t('svc.social.f2'), t('svc.social.f3'),
    t('svc.social.f4'), t('svc.social.f5'), t('svc.social.f6'), t('svc.social.f7'),
  ];

  const platforms = [
    { name: t('svc.social.platform1'), icon: '📸' },
    { name: t('svc.social.platform2'), icon: '👥' },
    { name: t('svc.social.platform3'), icon: '💼' },
    { name: t('svc.social.platform4'), icon: '🎵' },
    { name: t('svc.social.platform5'), icon: '🐦' },
    { name: t('svc.social.platform6'), icon: '📺' },
  ];

  const results = [t('svc.social.r1'), t('svc.social.r2'), t('svc.social.r3'), t('svc.social.r4')];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div className="mb-16" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase">{t('servicePage.tag')}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('svc.social.title')}
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            {t('svc.social.subtitle')}
          </motion.p>
        </motion.div>

        <div className="space-y-20">

          {/* What's Included */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" />
              {t('servicePage.included')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((item, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                             hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/10
                             transition-all duration-200 group">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">✓</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Platforms */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" />
              {t('svc.social.platformsTitle')}
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {platforms.map(({ name, icon }, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                             shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)]
                             hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" />
              {t('servicePage.results')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {results.map((r, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10
                             border border-blue-100 dark:border-blue-900/30 text-gray-800 dark:text-gray-200 text-sm font-medium">
                  {r}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Packages */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" />
              {t('servicePage.packages')}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-100 dark:border-gray-800
                           shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.08)]
                           hover:-translate-y-1 transition-all duration-300 group">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{t('svc.social.pkg1.name')}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{t('svc.social.pkg1.desc')}</p>
                <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{t('svc.social.pkg1.price')}
                  <span className="text-sm font-normal text-gray-400 dark:text-gray-500"> {t('servicePage.perMonth')}</span>
                </p>
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
                className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-7 text-white
                           shadow-[0_8px_24px_rgba(37,99,235,0.25)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.35)]
                           hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative">
                  <span className="inline-block text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-4">{t('pricing.mostPopular')}</span>
                  <h3 className="font-bold text-lg mb-2">{t('svc.social.pkg2.name')}</h3>
                  <p className="text-blue-100 mb-4 text-sm">{t('svc.social.pkg2.desc')}</p>
                  <p className="font-bold text-2xl">{t('svc.social.pkg2.price')}
                    <span className="text-sm font-normal text-blue-200"> {t('servicePage.perMonth')}</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-20 relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-blue-500/30 pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t('svc.social.ctaTitle')}</h3>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">{t('svc.social.ctaSubtitle')}</p>
            <Link to="/contact"
              className="inline-block bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold
                         hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200
                         shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              {t('svc.social.ctaBtn')}
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}