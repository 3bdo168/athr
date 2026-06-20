import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const stats = [
  { value: '20+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '1yr', label: 'Industry Experience' },
  { value: '10+', label: 'Global Clients' },
]

const clients = ['NovaTech', 'GreenLeaf', 'FitCore', 'Luxe Living', 'Orion Labs']

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Hero() {
  useScrollReveal()
  const { t } = useLanguage()

  const stats = [
    { value: t('hero.stat1.value'), label: t('hero.stat1.label') },
    { value: t('hero.stat2.value'), label: t('hero.stat2.label') },
    { value: t('hero.stat3.value'), label: t('hero.stat3.label') },
    { value: t('hero.stat4.value'), label: t('hero.stat4.label') },
  ]

  return (
    <>
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }
        [data-reveal-delay="1"] { transition-delay: 100ms; }
        [data-reveal-delay="2"] { transition-delay: 200ms; }
        [data-reveal-delay="3"] { transition-delay: 300ms; }
        [data-reveal-delay="4"] { transition-delay: 400ms; }
        [data-reveal-delay="5"] { transition-delay: 500ms; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white dark:bg-gray-950">

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #2563EB 1px, transparent 1px),
              linear-gradient(to bottom, #2563EB 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Blobs */}
        <div className="absolute top-20 right-[-100px] w-[700px] h-[700px] rounded-full
                        bg-blue-50 dark:bg-blue-900/20 blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] rounded-full
                        bg-blue-50 dark:bg-blue-900/20 blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                          bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-8
                          opacity-0 animate-fade-in [animation-fill-mode:forwards]"
              style={{ animationDelay: '100ms' }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase">
                {t('hero.badge')}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-bold text-gray-900 dark:text-white mb-6
                         text-[clamp(2.8rem,7vw,5rem)] leading-[1.05] tracking-[-0.03em]
                         opacity-0 animate-fade-up [animation-fill-mode:forwards]"
              style={{ animationDelay: '200ms' }}
            >
              {t('hero.title1')}
              <br />
              <span className="relative inline-block text-blue-600">
                {t('hero.title2')}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ opacity: 0.35 }}
                >
                  <path d="M2 9C50 3 100 1 150 5C200 9 250 3 298 6"
                    stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mb-10
                         opacity-0 animate-fade-up [animation-fill-mode:forwards]"
              style={{ animationDelay: '320ms' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 mb-16
                         opacity-0 animate-fade-up [animation-fill-mode:forwards]"
              style={{ animationDelay: '420ms' }}
            >
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm
                           hover:bg-blue-700 transition-all duration-200
                           shadow-[0_2px_12px_rgba(37,99,235,0.35)]
                           hover:shadow-[0_4px_20px_rgba(37,99,235,0.45)]
                           hover:-translate-y-0.5 active:translate-y-0"
              >
                {t('hero.startProject')}
              </Link>
              <Link
                to="/portfolio"
                className="px-7 py-3.5 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                           font-semibold text-sm border border-gray-200 dark:border-gray-700
                           hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400
                           hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                {t('hero.viewWork')}
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 mb-16
                         opacity-0 animate-fade-up [animation-fill-mode:forwards]"
              style={{ animationDelay: '520ms' }}
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="group">
                  <p className="font-display font-bold text-gray-900 dark:text-white
                                 text-[clamp(1.6rem,3vw,2.2rem)] leading-none tracking-tight
                                 group-hover:text-blue-600 transition-colors duration-300">
                    {value}
                  </p>
                  <div className="w-6 h-0.5 bg-blue-500 mt-1.5 mb-1.5
                                  group-hover:w-10 transition-all duration-300" />
                  <p className="text-sm text-gray-400 dark:text-gray-500">{label}</p>
                </div>
              ))}
            </div>

            {/* Trusted by — Marquee */}
            <div
              className="opacity-0 animate-fade-up [animation-fill-mode:forwards]"
              style={{ animationDelay: '620ms' }}
            >
              <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase mb-5">
                {t('hero.trustedBy')}
              </p>

              <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-12 z-10
                                bg-gradient-to-r from-white dark:from-gray-950 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 z-10
                                bg-gradient-to-l from-white dark:from-gray-950 to-transparent pointer-events-none" />

                <div className="flex animate-marquee whitespace-nowrap">
                  {[...clients, ...clients].map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 mx-6 text-sm font-semibold
                                 text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200
                                 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-200 dark:bg-blue-800 inline-block" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-300 dark:text-gray-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>
    </>
  )
}