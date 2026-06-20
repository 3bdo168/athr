import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.15 } } }

const icons = [
  // Discovery
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg>,
  // Design
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  // Launch
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  // Analyze
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg>,
]

const colors = ['#2563eb', '#7c3aed', '#059669', '#ea580c']

export default function Process() {
  const { dark } = useTheme()
  const { t } = useLanguage()

  const steps = [
    { title: t('process.step1.title'), desc: t('process.step1.desc') },
    { title: t('process.step2.title'), desc: t('process.step2.desc') },
    { title: t('process.step3.title'), desc: t('process.step3.desc') },
    { title: t('process.step4.title'), desc: t('process.step4.desc') },
  ]

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: dark ? '#030712' : '#ffffff' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                       bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800
                       text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase mb-5">
            {t('process.tag')}
          </motion.p>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
            className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-tight mb-4"
            style={{ color: dark ? '#ffffff' : '#0f172a' }}>
            {t('process.title')}
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: dark ? '#94a3b8' : '#64748b' }}>
            {t('process.subtitle')}
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 relative"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: dark ? '#1e293b' : '#e2e8f0' }} />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Step number + icon circle */}
              <div className="flex flex-col items-center mb-6">
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4
                             transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: `${colors[i]}15`,
                    color: colors[i],
                  }}
                >
                  {icons[i]}
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center
                               text-[10px] font-bold text-white"
                    style={{ backgroundColor: colors[i] }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Card */}
              <div
                className="rounded-2xl p-6 text-center border transition-all duration-300
                           hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: dark ? 'rgba(30,41,59,0.4)' : 'rgba(248,250,252,1)',
                  borderColor: dark ? 'rgba(51,65,85,0.4)' : 'rgba(226,232,240,1)',
                }}
              >
                <h3
                  className="font-display font-bold text-lg mb-3"
                  style={{ color: dark ? '#ffffff' : '#0f172a' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: dark ? '#94a3b8' : '#64748b' }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
