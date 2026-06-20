import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClientAuth } from '../../hooks/useClientAuth';
import { useState } from 'react';

export default function ClientLayout({ children }) {
  const { clientUser, clientProfile, logout } = useClientAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', href: '/client', icon: '📊' },
    { name: 'Projects',  href: '/client/projects', icon: '📁' },
    { name: 'Assets',    href: '/client/assets', icon: '📦' },
    { name: 'Settings',  href: '/client/settings', icon: '⚙️' },
  ];

  const isActive = (href) =>
    href === '/client' ? location.pathname === '/client' : location.pathname.startsWith(href);

  const handleLogout = async () => {
    await logout();
    navigate('/client/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      {/* Top Nav */}
      <nav className="bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/60 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow">A</div>
            <span className="text-white font-bold text-base tracking-tight">Client Portal</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Info + Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {clientUser?.photoURL && (
                <img src={clientUser.photoURL} alt="" className="w-8 h-8 rounded-full border-2 border-gray-700" />
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-white leading-tight">{clientProfile?.name || 'Client'}</p>
                <p className="text-[11px] text-gray-500">{clientProfile?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/60 hover:bg-red-600/15 hover:text-red-400 text-gray-400 transition-all text-sm border border-gray-700/50 hover:border-red-500/30"
            >
              <span>🚪</span>
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-950 p-3 space-y-1">
            {/* User Card */}
            <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-gray-900/60 border border-gray-800">
              {clientUser?.photoURL && (
                <img src={clientUser.photoURL} alt="" className="w-10 h-10 rounded-full border-2 border-gray-700" />
              )}
              <div>
                <p className="text-sm font-medium text-white">{clientProfile?.name || 'Client'}</p>
                <p className="text-xs text-gray-500">{clientProfile?.email}</p>
              </div>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600/15 text-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-medium text-red-400 hover:bg-red-600/10 transition-colors mt-1 border-t border-gray-800 pt-3"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
