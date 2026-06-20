import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

export default function ServicesSection() {
  const { t } = useLanguage()

  const services = [
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>),
      title: t('services.seo.title'), desc: t('services.seo.desc'), tag: t('services.seo.tag'), href: '/services/seo', accent: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    },
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>),
      title: t('services.social.title'), desc: t('services.social.desc'), tag: t('services.social.tag'), href: '/services/social-media', accent: 'from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20',
    },
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>),
      title: t('services.ads.title'), desc: t('services.ads.desc'), tag: t('services.ads.tag'), href: '/services/paid-ads', accent: 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20',
    },
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>),
      title: t('services.brand.title'), desc: t('services.brand.desc'), tag: t('services.brand.tag'), href: '/services/branding', accent: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    },
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>),
      title: t('services.email.title'), desc: t('services.email.desc'), tag: t('services.email.tag'), href: '/services/email', accent: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    },
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
      title: t('services.analytics.title'), desc: t('services.analytics.desc'), tag: t('services.analytics.tag'), href: '/services/analytics', accent: 'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20',
    },
  ]

  return (
    <section className="py-28 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
        >
          <div className="max-w-xl">
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-blue-500" />
              <p className="text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-widest uppercase">
                {t('services.tag')}
              </p>
            </motion.div>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
              className="font-display font-bold text-gray-900 dark:text-white mb-4
                         text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-tight">
              {t('services.title1')}
              <br />
              <span className="text-blue-600">{t('services.title2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              {t('services.subtitle')}
            </motion.p>
          </div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Link
              to="/services"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                         border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300
                         text-sm font-semibold hover:border-blue-300 hover:text-blue-600
                         hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
            >
              {t('services.all')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                   className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        >
          {services.map(({ icon, title, desc, tag, href, accent }) => (
            <motion.div key={title} variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link
                to={href}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-7
                           border border-gray-100 dark:border-gray-800
                           shadow-[0_1px_3px_rgba(0,0,0,0.06)]
                           hover:shadow-[0_12px_32px_rgba(37,99,235,0.1)]
                           hover:-translate-y-1.5 hover:border-blue-100 dark:hover:border-blue-800
                           transition-all duration-300 overflow-hidden block"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0
                                group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600
                                  flex items-center justify-center mb-5
                                  group-hover:bg-blue-600 group-hover:text-white
                                  group-hover:scale-110 transition-all duration-300">
                    {icon}
                  </div>

                  <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400
                                   bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full mb-3
                                   group-hover:bg-white/70 dark:group-hover:bg-white/10 transition-colors duration-200">
                    {tag}
                  </span>

                  <h3 className="text-base font-display font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>

                  <div className="mt-5 flex items-center gap-1.5 text-blue-500 text-xs font-semibold
                                  translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                                  transition-all duration-300">
                    {t('services.learnMore')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}