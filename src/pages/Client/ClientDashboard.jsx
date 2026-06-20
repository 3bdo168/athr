import { useClientAuth } from '../../hooks/useClientAuth';
import { motion } from 'framer-motion';

export default function ClientDashboard() {
  const { clientUser, clientProfile } = useClientAuth();

  const quickActions = [
    { name: 'My Projects',  icon: '📁', href: '/client/projects',  desc: 'Track the status of your active projects' },
    { name: 'My Assets',    icon: '📦', href: '/client/assets',     desc: 'Download your project deliverables' },
    { name: 'Contact Team', icon: '💬', href: '/contact',           desc: 'Get in touch with the team' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 mb-10 border border-gray-800/60 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex items-start gap-6">
          {clientUser?.photoURL && (
            <img
              src={clientUser.photoURL}
              alt=""
              className="w-16 h-16 rounded-2xl border-2 border-gray-700 shadow-lg hidden sm:block"
            />
          )}
          <div>
            <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-[0.2em] text-xs mb-3">
              <span className="w-8 h-[2px] bg-blue-600" />
              Client Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Welcome, <span className="text-blue-400">{clientProfile?.name?.split(' ')[0] || 'Client'}</span> 👋
            </h1>
            <p className="text-gray-400 text-base max-w-xl leading-relaxed">
              Here you can track your projects, download your assets, and stay updated on all deliverables.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex items-center gap-3 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl px-6 py-4"
      >
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
        <div>
          <p className="text-sm font-semibold text-emerald-400">Account Active</p>
          <p className="text-xs text-gray-500">Your account has been approved by the admin team</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {quickActions.map((action, idx) => (
          <motion.a
            key={action.name}
            href={action.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.05 }}
            className="group p-6 rounded-3xl bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/5 hover:scale-[1.02]"
          >
            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{action.icon}</span>
            <h3 className="text-lg font-bold text-white mb-1">{action.name}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{action.desc}</p>
            <div className="mt-4 text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              View →
            </div>
          </motion.a>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900/30 rounded-3xl border border-gray-800/50 p-8">
          <h2 className="text-xl font-bold text-white mb-4">📋 Your Info</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-800/50">
              <span className="text-sm text-gray-500">Name</span>
              <span className="text-sm text-white font-medium">{clientProfile?.name}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-800/50">
              <span className="text-sm text-gray-500">Email</span>
              <span className="text-sm text-white font-medium">{clientProfile?.email}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-800/50">
              <span className="text-sm text-gray-500">Phone</span>
              <span className="text-sm text-white font-medium" dir="ltr">{clientProfile?.phone}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-600/15 px-3 py-1 rounded-full uppercase">
                {clientProfile?.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-blue-600/8 to-transparent rounded-3xl border border-blue-500/10 p-8">
          <h2 className="text-xl font-bold text-white mb-4">💡 Need Help?</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            If you have any questions about your projects or need to request changes, feel free to reach out to us directly.
          </p>
          <div className="space-y-3">
            <a
              href="/contact"
              className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-blue-500/30 transition-all text-sm text-gray-300 hover:text-white"
            >
              <span className="text-lg">📧</span>
              <span>Send us a message</span>
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-emerald-500/30 transition-all text-sm text-gray-300 hover:text-white"
            >
              <span className="text-lg">💬</span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
