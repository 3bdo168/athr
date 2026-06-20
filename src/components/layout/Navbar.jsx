import { useState, useEffect, startTransition } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { useClientAuth } from '../../hooks/useClientAuth'
import logo from '../../assets/3اثر logo .png'
import ClientLoginModal from './ClientLoginModal'

const navLinksConfig = [
  { to: '/',          key: 'nav.home' },
  { to: '/about',     key: 'nav.about' },
  { to: '/portfolio', key: 'nav.portfolio' },
  { to: '/pricing',   key: 'nav.pricing' },
  { to: '/contact',   key: 'nav.contact' },
]

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.7.7M5.63 18.37l-.7.7m12.74 0-.7-.7M5.63 5.63l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const { pathname }            = useLocation()
  const { dark, setDark }       = useTheme()
  const { t, toggleLang, isAr } = useLanguage()
  const { clientProfile }       = useClientAuth()
  const navLinks = navLinksConfig.map(l => ({ ...l, label: t(l.key) }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    startTransition(() => setOpen(false))
  }, [pathname])

  return (
    <>
      <header
        style={{
          backgroundColor: scrolled
            ? dark ? 'rgba(17,24,39,0.95)' : 'rgba(255,255,255,0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 0 rgba(0,0,0,0.06)' : 'none',
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center gap-0.5 group">
            <img
              src={logo}
              alt="Ather Agency"
              className="h-16 w-auto transition-all duration-300"
              style={{
                filter: dark ? 'invert(1) brightness(2)' : 'none',
              }}
            />
            <span
              className="text-[9px] font-bold tracking-[0.25em] uppercase"
              style={{ color: dark ? '#6b7280' : '#9ca3af' }}
            >
              Agency
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  data-cursor="GO"
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={({ isActive }) => ({
                    color: isActive ? '#2563eb' : dark ? '#d1d5db' : '#4b5563',
                    backgroundColor: isActive
                      ? dark ? 'rgba(37,99,235,0.2)' : '#eff6ff'
                      : 'transparent',
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                         border border-gray-200 dark:border-gray-700
                         hover:border-blue-400 hover:text-blue-600"
              style={{ color: dark ? '#d1d5db' : '#4b5563' }}
              aria-label="Toggle language"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                color: dark ? '#d1d5db' : '#4b5563',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = dark ? '#1f2937' : '#f3f4f6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Toggle dark mode"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {clientProfile ? (
              <Link
                to={clientProfile.status === 'approved' ? '/client' : '/client/pending'}
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                Client Portal
              </Link>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                Client Login
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-lg text-[10px] font-bold border border-gray-200 dark:border-gray-700 transition-colors"
              style={{ color: dark ? '#d1d5db' : '#4b5563' }}
              aria-label="Toggle language"
            >
              {isAr ? 'EN' : 'ع'}
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: dark ? '#d1d5db' : '#4b5563' }}
              aria-label="Toggle dark mode"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: dark ? '#d1d5db' : '#4b5563' }}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed top-20 left-0 right-0 z-40 md:hidden
                    transition-all duration-300 ease-in-out
                    ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <div className="shadow-lg px-6 py-4 flex flex-col gap-1"
          style={{
            backgroundColor: dark ? '#111827' : '#ffffff',
            borderBottom: dark ? '1px solid #1f2937' : '1px solid #f3f4f6',
          }}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={({ isActive }) => ({
                color: isActive ? '#2563eb' : dark ? '#d1d5db' : '#374151',
                backgroundColor: isActive
                  ? dark ? 'rgba(37,99,235,0.2)' : '#eff6ff'
                  : 'transparent',
              })}
            >
              {label}
            </NavLink>
          ))}
            {clientProfile ? (
              <Link
                to={clientProfile.status === 'approved' ? '/client' : '/client/pending'}
                className="mt-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium text-center hover:bg-emerald-700 transition-colors"
                onClick={() => setOpen(false)}
              >
                Client Portal
              </Link>
            ) : (
              <button
                onClick={() => { setOpen(false); setLoginModalOpen(true); }}
                className="mt-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium text-center hover:bg-blue-700 transition-colors"
              >
                Client Login
              </button>
            )}
        </div>
      </div>

      <ClientLoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  )
}