import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { addDocument, queryCollection } from '../../firebase/helpers'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export default function Newsletter() {
  const { dark } = useTheme()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error | duplicate

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || status === 'sending') return

    setStatus('sending')
    try {
      // Check for duplicate
      const existing = await queryCollection('newsletter', [
        { field: 'email', op: '==', value: email.toLowerCase().trim() }
      ])

      if (existing.length > 0) {
        setStatus('duplicate')
        setTimeout(() => setStatus('idle'), 4000)
        return
      }

      await addDocument('newsletter', {
        email: email.toLowerCase().trim(),
        subscribedAt: new Date().toISOString(),
        source: 'website',
      })
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Newsletter subscription error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const getMessage = () => {
    switch (status) {
      case 'success': return t('newsletter.success')
      case 'error': return t('newsletter.error')
      case 'duplicate': return t('newsletter.duplicate')
      default: return null
    }
  }

  const messageColor = status === 'success' ? '#22c55e' : status === 'duplicate' ? '#f59e0b' : '#ef4444'

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: dark ? '#030712' : '#ffffff' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, ${dark ? '#2563eb' : '#2563eb'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />

      <div className="max-w-2xl mx-auto px-6 relative">
        <motion.div
          className="rounded-3xl p-8 md:p-12 text-center border relative overflow-hidden"
          style={{
            backgroundColor: dark ? 'rgba(30,41,59,0.5)' : 'rgba(248,250,252,1)',
            borderColor: dark ? 'rgba(51,65,85,0.4)' : 'rgba(226,232,240,1)',
            backdropFilter: 'blur(12px)',
          }}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {/* Decorative blob */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: '#2563eb' }} />

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                       bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800
                       text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase mb-5">
            ✉️ {t('newsletter.tag')}
          </motion.div>

          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
            className="font-display font-bold text-[clamp(1.5rem,3.5vw,2rem)] leading-tight tracking-tight mb-3"
            style={{ color: dark ? '#ffffff' : '#0f172a' }}>
            {t('newsletter.title')}
          </motion.h2>

          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-sm leading-relaxed mb-8 max-w-md mx-auto"
            style={{ color: dark ? '#94a3b8' : '#64748b' }}>
            {t('newsletter.subtitle')}
          </motion.p>

          <motion.form
            variants={fadeUp} transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              required
              className="flex-1 px-5 py-3.5 rounded-xl text-sm border transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              style={{
                backgroundColor: dark ? '#0f172a' : '#ffffff',
                borderColor: dark ? '#334155' : '#e2e8f0',
                color: dark ? '#e2e8f0' : '#0f172a',
              }}
            />
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="px-7 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-semibold
                         hover:bg-blue-700 transition-all duration-200
                         hover:-translate-y-0.5 active:translate-y-0
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                         shadow-[0_2px_12px_rgba(37,99,235,0.3)]"
            >
              {status === 'sending' ? t('newsletter.sending') : t('newsletter.btn')}
            </button>
          </motion.form>

          {/* Status message */}
          {getMessage() && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium mt-4"
              style={{ color: messageColor }}
            >
              {getMessage()}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
