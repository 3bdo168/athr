import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function Posters() {
  const { t } = useLanguage();

  const features = [
    t('svc.posters.f1'), t('svc.posters.f2'), t('svc.posters.f3'),
    t('svc.posters.f4'), t('svc.posters.f5'), t('svc.posters.f6'),
    t('svc.posters.f7'), t('svc.posters.f8'), t('svc.posters.f9'),
  ];

  const process = [
    t('svc.posters.p1'), t('svc.posters.p2'), t('svc.posters.p3'), t('svc.posters.p4'),
  ];

  const whyDesign = [
    t('svc.posters.w1'), t('svc.posters.w2'), t('svc.posters.w3'),
    t('svc.posters.w4'), t('svc.posters.w5'),
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div className="mb-16" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-700 dark:text-orange-300 text-xs font-semibold tracking-widest uppercase">{t('servicePage.tag')}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('svc.posters.title')}
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            {t('svc.posters.subtitle')}
          </motion.p>
        </motion.div>

        <div className="space-y-20">

          {/* Design Services */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-orange-500" />
              {t('servicePage.included')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {features.map((item, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                             hover:border-orange-200 dark:hover:border-orange-800 hover:bg-orange-50/50 dark:hover:bg-orange-900/10
                             transition-all duration-200 group">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">✓</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* The Design Process */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-orange-500" />
              {t('svc.posters.processTitle')}
            </motion.h2>
            <div className="relative">
              <div className="absolute left-[15px] top-6 bottom-6 w-px bg-gradient-to-b from-orange-300 via-orange-400 to-transparent dark:from-orange-600 dark:via-orange-700" />
              <div className="space-y-4">
                {process.map((step, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                    className="flex items-center gap-5 group">
                    <span className="relative z-10 w-8 h-8 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center shrink-0
                                     shadow-[0_0_0_4px_rgba(249,115,22,0.15)] group-hover:shadow-[0_0_0_6px_rgba(249,115,22,0.25)] transition-shadow duration-300">{i + 1}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* What Makes Great Design */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-orange-500" />
              {t('servicePage.whyTitle')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyDesign.map((r, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10
                             border border-orange-100 dark:border-orange-900/30 text-gray-800 dark:text-gray-200 text-sm font-medium">
                  {r}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Packages */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-orange-500" />
              {t('servicePage.packages')}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-100 dark:border-gray-800
                           shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(249,115,22,0.08)]
                           hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{t('svc.posters.pkg1.name')}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{t('svc.posters.pkg1.desc')}</p>
                <p className="font-bold text-2xl text-orange-600 dark:text-orange-400">{t('svc.posters.pkg1.price')}
                  <span className="text-sm font-normal text-gray-400 dark:text-gray-500"> {t('servicePage.perMonth')}</span>
                </p>
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
                className="relative bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl p-7 text-white
                           shadow-[0_8px_24px_rgba(249,115,22,0.25)] hover:shadow-[0_16px_40px_rgba(249,115,22,0.35)]
                           hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative">
                  <span className="inline-block text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-4">✨ Premium</span>
                  <h3 className="font-bold text-lg mb-2">{t('svc.posters.pkg2.name')}</h3>
                  <p className="text-orange-100 mb-4 text-sm">{t('svc.posters.pkg2.desc')}</p>
                  <p className="font-bold text-2xl">{t('svc.posters.pkg2.price')}
                    <span className="text-sm font-normal text-orange-200"> {t('servicePage.oneTime')}</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-20 relative bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-orange-500/30 pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t('svc.posters.ctaTitle')}</h3>
            <p className="text-orange-100 mb-8 max-w-md mx-auto">{t('svc.posters.ctaSubtitle')}</p>
            <Link to="/contact"
              className="inline-block bg-white text-orange-700 px-8 py-3.5 rounded-xl font-semibold
                         hover:bg-orange-50 hover:-translate-y-0.5 transition-all duration-200
                         shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              {t('svc.posters.ctaBtn')}
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
