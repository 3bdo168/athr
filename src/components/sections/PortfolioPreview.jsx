import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const projects = [
  { title: 'Digital Transformation', client: 'NovaTech', category: 'SEO & Content', result: '+300% Organic Traffic', color: 'bg-blue-50 dark:bg-blue-900/20', dot: 'bg-blue-500', resultColor: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40' },
  { title: 'Social Growth Strategy', client: 'GreenLeaf', category: 'Social Media', result: '50K New Followers', color: 'bg-emerald-50 dark:bg-emerald-900/20', dot: 'bg-emerald-500', resultColor: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40' },
  { title: 'Performance Marketing', client: 'FitCore', category: 'Paid Advertising', result: '4.8× ROAS', color: 'bg-orange-50 dark:bg-orange-900/20', dot: 'bg-orange-500', resultColor: 'text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/40' },
]

export default function PortfolioPreview() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <p className="text-primary-600 dark:text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
              {t('portfolioPreview.tag')}
            </p>
            <h2 className="font-display font-bold text-gray-900 dark:text-white
                           text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-tight">
              {t('portfolioPreview.title')}
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Link
              to="/portfolio"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                         border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300
                         text-sm font-medium hover:border-primary-300 hover:text-primary-600
                         hover:bg-primary-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            >
              {t('portfolioPreview.viewAll')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        >
          {projects.map(({ title, client, category, result, color, dot, resultColor }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className={`group ${color} rounded-2xl p-7 border border-transparent
                          hover:border-gray-200 dark:hover:border-gray-700
                          hover:-translate-y-1 hover:shadow-card
                          transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                  {category}
                </span>
              </div>

              <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-1 leading-snug">
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{client}</p>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${resultColor}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                {result}
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs font-semibold
                              group-hover:text-primary-500 transition-colors duration-200">
                {t('portfolioPreview.viewCase')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}