import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import SEO from '../components/SEO'
import Stats from '../components/sections/Stats'
import Process from '../components/sections/Process'
import Newsletter from '../components/sections/Newsletter'

// Team Assets
import imgDrawing from '../assets/team/Person_holding_drawing_202604121223-Photoroom.png'
import imgPen from '../assets/team/Person_holding_pen_202604121223-Photoroom.png'
import imgSmartphone from '../assets/team/Person_holding_smartphone_202604121223-Photoroom.png'
import imgSittingAt from '../assets/team/Person_sitting_at_202604121419-Photoroom.png'
import imgSittingIn from '../assets/team/Person_sitting_in_202604121413-Photoroom.png'
import imgSittingWith from '../assets/team/Person_sitting_with_202604121223-Photoroom.png'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

const valueIcons = [
  // Results-Driven
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  // Creative Excellence
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  // Transparency
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  // Partnership
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
]

const valueColors = ['#2563eb', '#7c3aed', '#059669', '#ea580c']

export default function About() {
  const { dark } = useTheme()
  const { t } = useLanguage()

  const values = [
    { title: t('about.values.v1.title'), desc: t('about.values.v1.desc') },
    { title: t('about.values.v2.title'), desc: t('about.values.v2.desc') },
    { title: t('about.values.v3.title'), desc: t('about.values.v3.desc') },
    { title: t('about.values.v4.title'), desc: t('about.values.v4.desc') },
  ]

  return (
    <div className="relative overflow-hidden pt-20" style={{ backgroundColor: dark ? '#030712' : '#ffffff' }}>
      <SEO title="About Us" path="/about" />

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #2563EB 1px, transparent 1px),
                              linear-gradient(to bottom, #2563EB 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }} />
        <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: '#2563eb' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                         bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800
                         text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6">
              {t('about.tag')}
            </motion.p>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.5 }}
              className="font-display font-bold text-[clamp(2.2rem,6vw,4rem)] leading-[1.08] tracking-[-0.03em] mb-6"
              style={{ color: dark ? '#ffffff' : '#0f172a' }}>
              {t('about.title')}
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: dark ? '#94a3b8' : '#64748b' }}>
              {t('about.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────── */}
      <Stats />

      {/* ─── Mission & Vision ─────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: dark ? '#030712' : '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              className="rounded-3xl p-8 md:p-10 border relative overflow-hidden group"
              style={{
                backgroundColor: dark ? 'rgba(30,41,59,0.4)' : 'rgba(248,250,252,1)',
                borderColor: dark ? 'rgba(51,65,85,0.4)' : 'rgba(226,232,240,1)',
              }}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none
                              group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: '#2563eb' }} />

              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(37,99,235,0.1)', color: '#2563eb' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 13l6 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>

              <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: '#2563eb' }}>
                {t('about.mission.tag')}
              </motion.p>
              <motion.h3 variants={fadeUp} transition={{ duration: 0.5 }}
                className="font-display font-bold text-xl mb-4"
                style={{ color: dark ? '#ffffff' : '#0f172a' }}>
                {t('about.mission.title')}
              </motion.h3>
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
                className="text-sm leading-relaxed"
                style={{ color: dark ? '#94a3b8' : '#64748b' }}>
                {t('about.mission.desc')}
              </motion.p>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="rounded-3xl p-8 md:p-10 border relative overflow-hidden group"
              style={{
                backgroundColor: dark ? 'rgba(30,41,59,0.4)' : 'rgba(248,250,252,1)',
                borderColor: dark ? 'rgba(51,65,85,0.4)' : 'rgba(226,232,240,1)',
              }}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none
                              group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: '#7c3aed' }} />

              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(124,58,237,0.1)', color: '#7c3aed' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"/>
                  <path d="M2 12h20"/>
                </svg>
              </motion.div>

              <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: '#7c3aed' }}>
                {t('about.vision.tag')}
              </motion.p>
              <motion.h3 variants={fadeUp} transition={{ duration: 0.5 }}
                className="font-display font-bold text-xl mb-4"
                style={{ color: dark ? '#ffffff' : '#0f172a' }}>
                {t('about.vision.title')}
              </motion.h3>
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
                className="text-sm leading-relaxed"
                style={{ color: dark ? '#94a3b8' : '#64748b' }}>
                {t('about.vision.desc')}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Values ───────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: dark ? '#0f172a' : '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-6">
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
              {t('about.values.tag')}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: 0.12 }}
          >
            {values.map((val, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl p-6 border text-center transition-all duration-300
                           hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: dark ? 'rgba(30,41,59,0.5)' : '#ffffff',
                  borderColor: dark ? 'rgba(51,65,85,0.4)' : 'rgba(226,232,240,1)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4
                             transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${valueColors[i]}15`,
                    color: valueColors[i],
                  }}
                >
                  {valueIcons[i]}
                </div>
                <h3 className="font-display font-bold text-base mb-2"
                  style={{ color: dark ? '#ffffff' : '#0f172a' }}>
                  {val.title}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: dark ? '#94a3b8' : '#64748b' }}>
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Team / Domains ───────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: dark ? '#030712' : '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                         bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800
                         text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase mb-4">
              {t('about.team.tag') || 'Our Experts'}
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
              className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-tight mb-4"
              style={{ color: dark ? '#ffffff' : '#0f172a' }}>
              {t('about.team.title') || 'The Minds Behind The Magic'}
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: 0.15 }}
          >
            {[
              { img: imgDrawing, role: 'UI/UX Design', color: '#2563eb' },
              { img: imgPen, role: 'Content Creation', color: '#7c3aed' },
              { img: imgSmartphone, role: 'Social Media', color: '#059669' },
              { img: imgSittingAt, role: 'Web Development', color: '#ea580c' },
              { img: imgSittingIn, role: 'Brand Strategy', color: '#db2777' },
              { img: imgSittingWith, role: 'Digital Marketing', color: '#0284c7' },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl overflow-hidden border transition-all duration-500
                           hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  backgroundColor: dark ? 'rgba(30,41,59,0.3)' : 'rgba(248,250,252,1)',
                  borderColor: dark ? 'rgba(51,65,85,0.4)' : 'rgba(226,232,240,1)',
                }}
              >
                {/* Accent Background Glow */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: `linear-gradient(to top, ${member.color}, transparent)` }} />

                <div className="aspect-[4/5] relative flex items-end justify-center p-6 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.role}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Glass Card for Role */}
                  <div className="relative z-10 w-full rounded-2xl p-4 text-center backdrop-blur-md border transition-all duration-300"
                    style={{
                      backgroundColor: dark ? 'rgba(15,23,42,0.7)' : 'rgba(255,255,255,0.85)',
                      borderColor: dark ? 'rgba(51,65,85,0.6)' : 'rgba(226,232,240,0.8)',
                    }}>
                    <p className="font-display font-bold text-sm md:text-base tracking-wide"
                      style={{ color: dark ? '#ffffff' : '#0f172a' }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Process ──────────────────────────────────────────────── */}
      <Process />

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: dark ? '#030712' : '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="relative rounded-3xl px-8 py-16 text-center overflow-hidden"
            style={{ backgroundColor: '#2563eb' }}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ backgroundColor: 'rgba(29,78,216,0.5)' }} />

            <div className="relative">
              <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
                className="font-display font-bold text-white mb-5 max-w-2xl mx-auto
                           text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-tight">
                {t('about.cta.title')}
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
                className="text-blue-100 text-base max-w-lg mx-auto mb-10 leading-relaxed">
                {t('about.cta.subtitle')}
              </motion.p>
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <Link to="/contact"
                  data-cursor="LET'S TALK"
                  className="inline-block px-7 py-3.5 rounded-xl font-semibold text-sm
                             hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                  style={{ backgroundColor: '#ffffff', color: '#1d4ed8' }}>
                  {t('about.cta.btn')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Newsletter ───────────────────────────────────────────── */}
      <Newsletter />
    </div>
  )
}
