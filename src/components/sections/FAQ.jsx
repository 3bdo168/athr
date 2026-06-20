import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

function ChevronIcon({ open }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export default function FAQ() {
  const { dark } = useTheme()
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ]

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: dark ? '#0f172a' : '#f8fafc' }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                       bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800
                       text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase mb-5">
            {t('faq.tag')}
          </motion.p>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
            className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-tight mb-4"
            style={{ color: dark ? '#ffffff' : '#0f172a' }}>
            {t('faq.title')}
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-base leading-relaxed"
            style={{ color: dark ? '#94a3b8' : '#64748b' }}>
            {t('faq.subtitle')}
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="space-y-3"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: dark
                    ? isOpen ? 'rgba(30,41,59,0.8)' : 'rgba(30,41,59,0.4)'
                    : isOpen ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  borderColor: dark
                    ? isOpen ? '#2563eb' : 'rgba(51,65,85,0.4)'
                    : isOpen ? '#2563eb' : 'rgba(226,232,240,1)',
                  boxShadow: isOpen ? '0 4px 24px rgba(37,99,235,0.08)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className="font-semibold text-[15px] transition-colors duration-200"
                    style={{ color: isOpen ? '#2563eb' : dark ? '#e2e8f0' : '#0f172a' }}
                  >
                    {faq.q}
                  </span>
                  <span style={{ color: isOpen ? '#2563eb' : dark ? '#64748b' : '#94a3b8' }}>
                    <ChevronIcon open={isOpen} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <div
                          className="w-full h-px mb-4"
                          style={{ backgroundColor: dark ? '#1e293b' : '#e2e8f0' }}
                        />
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: dark ? '#94a3b8' : '#64748b' }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
