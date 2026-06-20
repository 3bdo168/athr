import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

export default function Stats() {
  const { dark } = useTheme()
  const { t } = useLanguage()

  const stats = [
    { target: 20, suffix: '+', label: t('stats.projects'), icon: '🚀' },
    { target: 15, suffix: '+', label: t('stats.clients'), icon: '😊' },
    { target: 98, suffix: '%', label: t('stats.satisfaction'), icon: '⭐' },
    { target: 24, suffix: '/7', label: t('stats.support'), icon: '💬' },
  ]

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: dark ? '#0f172a' : '#f8fafc' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: '#2563eb' }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: '#7c3aed' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {stats.map(({ target, suffix, label, icon }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl p-6 md:p-8 text-center
                         border transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: dark ? 'rgba(30,41,59,0.6)' : 'rgba(255,255,255,0.8)',
                borderColor: dark ? 'rgba(51,65,85,0.5)' : 'rgba(226,232,240,1)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${dark ? 'rgba(37,99,235,0.08)' : 'rgba(37,99,235,0.05)'}, transparent 70%)`,
                }} />

              <div className="text-3xl mb-3">{icon}</div>
              <p className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight mb-2 transition-colors duration-300"
                style={{ color: dark ? '#ffffff' : '#0f172a' }}>
                <AnimatedCounter target={target} suffix={suffix} />
              </p>
              <p className="text-sm font-medium"
                style={{ color: dark ? '#94a3b8' : '#64748b' }}>
                {label}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full
                              group-hover:w-12 transition-all duration-500"
                style={{ backgroundColor: '#2563eb' }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
