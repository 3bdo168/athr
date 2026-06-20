import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function VideoEditing() {
  const { t } = useLanguage();

  const features = [
    t('svc.video.f1'), t('svc.video.f2'), t('svc.video.f3'), t('svc.video.f4'),
    t('svc.video.f5'), t('svc.video.f6'), t('svc.video.f7'), t('svc.video.f8'),
  ];

  const process = [
    t('svc.video.p1'), t('svc.video.p2'), t('svc.video.p3'),
    t('svc.video.p4'), t('svc.video.p5'), t('svc.video.p6'),
  ];

  const whyVideo = [t('svc.video.w1'), t('svc.video.w2'), t('svc.video.w3'), t('svc.video.w4')];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div className="mb-16" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-widest uppercase">{t('servicePage.tag')}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('svc.video.title')}
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            {t('svc.video.subtitle')}
          </motion.p>
        </motion.div>

        <div className="space-y-20">

          {/* What We Create */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-purple-500" />
              {t('servicePage.included')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((item, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                             hover:border-purple-200 dark:hover:border-purple-800 hover:bg-purple-50/50 dark:hover:bg-purple-900/10
                             transition-all duration-200 group">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">✓</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Process */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-purple-500" />
              {t('servicePage.process')}
            </motion.h2>
            <div className="relative">
              <div className="absolute left-[15px] top-6 bottom-6 w-px bg-gradient-to-b from-purple-300 via-purple-400 to-transparent dark:from-purple-600 dark:via-purple-700" />
              <div className="space-y-4">
                {process.map((step, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                    className="flex items-center gap-5 group">
                    <span className="relative z-10 w-8 h-8 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0
                                     shadow-[0_0_0_4px_rgba(147,51,234,0.15)] group-hover:shadow-[0_0_0_6px_rgba(147,51,234,0.25)] transition-shadow duration-300">{i + 1}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Why Video Works */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-purple-500" />
              {t('servicePage.whyTitle')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyVideo.map((r, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10
                             border border-purple-100 dark:border-purple-900/30 text-gray-800 dark:text-gray-200 text-sm font-medium">
                  {r}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Packages */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-purple-500" />
              {t('servicePage.packages')}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-100 dark:border-gray-800
                           shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(147,51,234,0.08)]
                           hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{t('svc.video.pkg1.name')}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{t('svc.video.pkg1.desc')}</p>
                <p className="font-bold text-2xl text-purple-600 dark:text-purple-400">{t('svc.video.pkg1.price')}
                  <span className="text-sm font-normal text-gray-400 dark:text-gray-500"> {t('servicePage.perMonth')}</span>
                </p>
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
                className="relative bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-7 text-white
                           shadow-[0_8px_24px_rgba(147,51,234,0.25)] hover:shadow-[0_16px_40px_rgba(147,51,234,0.35)]
                           hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative">
                  <span className="inline-block text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-4">{t('pricing.mostPopular')}</span>
                  <h3 className="font-bold text-lg mb-2">{t('svc.video.pkg2.name')}</h3>
                  <p className="text-purple-100 mb-4 text-sm">{t('svc.video.pkg2.desc')}</p>
                  <p className="font-bold text-2xl">{t('svc.video.pkg2.price')}
                    <span className="text-sm font-normal text-purple-200"> {t('servicePage.perMonth')}</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-20 relative bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-purple-500/30 pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t('svc.video.ctaTitle')}</h3>
            <p className="text-purple-100 mb-8 max-w-md mx-auto">{t('svc.video.ctaSubtitle')}</p>
            <Link to="/contact"
              className="inline-block bg-white text-purple-700 px-8 py-3.5 rounded-xl font-semibold
                         hover:bg-purple-50 hover:-translate-y-0.5 transition-all duration-200
                         shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              {t('servicePage.getStarted')}
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
