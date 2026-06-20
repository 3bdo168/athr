import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import logo from '../../assets/3اثر logo .png'

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1BHuqUKicQ/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/athragency11?utm_source=qr',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/athr-agency-598b45400',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { dark } = useTheme()
  const { t } = useLanguage()

  const footerLinks = {
    [t('footer.services')]: [
      { label: t('footer.socialMedia'), to: '/services/social-media' },
      { label: t('footer.webDesign'), to: '/services/web-design' },
      { label: t('footer.videoEditing'), to: '/services/video-editing' },
      { label: t('footer.posters'), to: '/services/posters' },
    ],
    [t('footer.company')]: [
      { label: t('footer.about'), to: '/about' },
      { label: t('footer.portfolio'), to: '/portfolio' },
      { label: t('footer.pricing'), to: '/pricing' },
      { label: t('footer.contact'), to: '/contact' },
    ],
    [t('footer.legal')]: [
      { label: t('footer.privacy'), to: '/privacy' },
      { label: t('footer.terms'), to: '/terms' },
    ],
  }

  return (
    <footer style={{
      backgroundColor: dark ? '#111827' : '#f3f4f6',
      color: dark ? '#9ca3af' : '#6b7280'
    }}>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="inline-flex flex-col items-start gap-0.5 mb-5">
              <img
                src={logo}
                alt="Ather Agency"
                className="h-20 w-auto transition-all duration-300"
                style={{
                  filter: dark ? 'invert(1) brightness(2)' : 'none',
                }}
              />
              <span
                className="text-[9px] font-bold tracking-[0.25em] uppercase pl-0.5"
                style={{ color: dark ? '#6b7280' : '#9ca3af' }}
              >
                Agency
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6"
              style={{ color: dark ? '#6b7280' : '#9ca3af' }}>
              {t('footer.desc')}
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ name, href, icon }) => (
                <a key={name} href={href} aria-label={name} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center
                             transition-all duration-200 hover:-translate-y-0.5
                             hover:bg-blue-600 hover:text-white"
                  style={{
                    backgroundColor: dark ? '#1f2937' : '#e5e7eb',
                    color: dark ? '#9ca3af' : '#6b7280'
                  }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <p className="text-sm font-semibold mb-4"
                style={{ color: dark ? '#ffffff' : '#111827' }}>
                {group}
              </p>
              <ul className="space-y-3">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}
                      className="text-sm transition-colors duration-200 hover:text-blue-500"
                      style={{ color: dark ? '#6b7280' : '#9ca3af' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: dark ? '1px solid #1f2937' : '1px solid #e5e7eb' }}>
          <p className="text-xs" style={{ color: dark ? '#4b5563' : '#9ca3af' }}>
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            {[
              { label: t('footer.privacy'), to: '/privacy' },
              { label: t('footer.terms'), to: '/terms' }
            ].map(({ label, to }) => (
              <Link key={label} to={to}
                className="text-xs hover:text-blue-500 transition-colors"
                style={{ color: dark ? '#4b5563' : '#9ca3af' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
