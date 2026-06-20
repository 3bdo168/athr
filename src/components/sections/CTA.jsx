import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export default function CTA() {
  const { dark } = useTheme()
  const { t } = useLanguage()

  return (
    <section style={{ backgroundColor: dark ? '#030712' : '#ffffff' }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="relative rounded-3xl px-8 py-16 text-center overflow-hidden"
          style={{ backgroundColor: '#2563eb' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
        >

          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ backgroundColor: 'rgba(29,78,216,0.5)' }} />

          <div className="relative">
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-blue-200 text-xs font-medium tracking-widest uppercase mb-5">
              {t('cta.tag')}
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
              className="font-display font-bold text-white mb-5 max-w-2xl mx-auto
                         text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-tight">
              {t('cta.title')}
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-blue-100 text-base max-w-lg mx-auto mb-10 leading-relaxed">
              {t('cta.subtitle')}
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact"
                data-cursor="LET'S TALK"
                className="px-7 py-3.5 rounded-xl font-semibold text-sm
                           hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                style={{ backgroundColor: '#ffffff', color: '#1d4ed8' }}>
                {t('cta.bookCall')}
              </Link>
              <Link to="/portfolio"
                data-cursor="SEE WORK"
                className="px-7 py-3.5 rounded-xl font-semibold text-sm
                           border-2 transition-all duration-200"
                style={{
                  backgroundColor: '#1d4ed8',
                  color: '#ffffff',
                  borderColor: 'rgba(255,255,255,0.4)'
                }}>
                {t('cta.seeWork')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}