import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function WebDesign() {
  const { t } = useLanguage();

  const features = [
    t('svc.web.f1'), t('svc.web.f2'), t('svc.web.f3'), t('svc.web.f4'),
    t('svc.web.f5'), t('svc.web.f6'), t('svc.web.f7'), t('svc.web.f8'), t('svc.web.f9'),
  ];

  const techStack = [
    { name: t('svc.web.t1'), icon: '⚛️' },
    { name: t('svc.web.t2'), icon: '▲' },
    { name: t('svc.web.t3'), icon: '🎨' },
    { name: t('svc.web.t4'), icon: '🔥' },
    { name: t('svc.web.t5'), icon: '▶️' },
  ];

  const results = [t('svc.web.r1'), t('svc.web.r2'), t('svc.web.r3'), t('svc.web.r4')];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div className="mb-16" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-widest uppercase">{t('servicePage.tag')}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('svc.web.title')}
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            {t('svc.web.subtitle')}
          </motion.p>
        </motion.div>

        <div className="space-y-20">

          {/* Services Include */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-emerald-500" />
              {t('servicePage.included')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((item, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                             hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10
                             transition-all duration-200 group">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">✓</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-emerald-500" />
              {t('svc.web.techTitle')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 mb-6 text-sm">{t('svc.web.techDesc')}</motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {techStack.map(({ name, icon }, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                             shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.08)]
                             hover:-translate-y-0.5 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-xs text-center">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-emerald-500" />
              {t('servicePage.results')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {results.map((r, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10
                             border border-emerald-100 dark:border-emerald-900/30 text-gray-800 dark:text-gray-200 text-sm font-medium">
                  {r}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-20 relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-emerald-500/30 pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t('svc.web.ctaTitle')}</h3>
            <p className="text-emerald-100 mb-8 max-w-md mx-auto">{t('svc.web.ctaSubtitle')}</p>
            <Link to="/contact"
              className="inline-block bg-white text-emerald-700 px-8 py-3.5 rounded-xl font-semibold
                         hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-200
                         shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              {t('servicePage.getStarted')}
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
