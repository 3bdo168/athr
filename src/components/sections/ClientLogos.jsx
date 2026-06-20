import { useTheme } from '../../context/ThemeContext'

const clientNames = [
  'NovaTech', 'GreenLeaf', 'FitCore', 'Luxe Living', 'Orion Labs',
  'BrightPath', 'UrbanEdge', 'SkyPulse', 'CoreVault', 'Zenith Co.',
]

export default function ClientLogos() {
  const { dark } = useTheme()

  return (
    <section
      className="py-12 relative overflow-hidden"
      style={{
        backgroundColor: dark ? '#030712' : '#ffffff',
        borderTop: dark ? '1px solid #111827' : '1px solid #f1f5f9',
        borderBottom: dark ? '1px solid #111827' : '1px solid #f1f5f9',
      }}
    >
      <style>{`
        @keyframes client-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .client-marquee {
          animation: client-scroll 30s linear infinite;
        }
        .client-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${dark ? '#030712' : '#ffffff'}, transparent)`,
          }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${dark ? '#030712' : '#ffffff'}, transparent)`,
          }} />

        <div className="flex client-marquee whitespace-nowrap">
          {[...clientNames, ...clientNames].map((name, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 mx-8 py-3 px-5 rounded-xl
                         transition-all duration-300 cursor-default
                         hover:scale-105"
              style={{
                color: dark ? '#475569' : '#94a3b8',
              }}
            >
              {/* Abstract logo shape */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black
                           transition-all duration-300"
                style={{
                  backgroundColor: dark ? '#1e293b' : '#f1f5f9',
                  color: dark ? '#64748b' : '#94a3b8',
                }}
              >
                {name.charAt(0)}
              </div>
              <span className="text-sm font-semibold tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
