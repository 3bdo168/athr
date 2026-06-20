import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminNav() {
  const [open, setOpen] = useState(false);
  const scrollRef       = useRef(null);
  const location        = useLocation();
  const navigate        = useNavigate();
  const { logout }      = useAuth();

  const navItems = [
    { name: 'Dashboard',    href: '/admin',               icon: '📊' },
    { name: 'Clients',      href: '/admin/clients',       icon: '👥' },
    { name: 'Orders',       href: '/admin/orders',        icon: '🛒' },
    { name: 'Messages',     href: '/admin/messages',      icon: '📩' },
    { name: 'Tasks',        href: '/admin/tasks',         icon: '✓'  },
    { name: 'Services',     href: '/admin/services',      icon: '⚙️' },
    { name: 'Pricing',      href: '/admin/pricing',       icon: '💰' },
    { name: 'Payment',      href: '/admin/payment',       icon: '💳' },
    { name: 'Offers',       href: '/admin/offers',        icon: '🎁' },
    { name: 'Portfolio',    href: '/admin/portfolio',     icon: '🖼️' },
    { name: 'Testimonials', href: '/admin/testimonials',  icon: '💬' },
    { name: 'Ads',          href: '/admin/ads',           icon: '📢' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const isActive = (href) =>
    href === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(href);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Roughly 3-4 items width
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold">A</div>
          <span className="text-white font-bold text-base tracking-tight">Admin Panel</span>
        </div>

        {/* Desktop Links Carousel */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-2xl mx-auto relative group px-6">
          <button onClick={() => scroll('left')} className="absolute left-0 z-10 w-8 h-8 flex items-center justify-center bg-gray-900 border border-gray-700 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <div ref={scrollRef} className="flex items-center gap-2 overflow-x-auto relative w-full scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="text-base leading-none shrink-0">{item.icon}</span>
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 z-10 w-8 h-8 flex items-center justify-center bg-gray-900 border border-gray-700 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* Logout + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-red-600/20 hover:text-red-400 text-gray-300 transition-all duration-200 text-sm font-medium border border-gray-700 hover:border-red-500/40"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950">
          <div className="p-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
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
        </div>
      )}
    </nav>
  );
}