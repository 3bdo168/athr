import { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Dashboard() {
  const { tasks, portfolioItems, services, offers } = useAdmin();
  const { user, loading: authLoading } = useAuth();
  const [statsData, setStatsData] = useState({ messages: 0, orders: 0 });
  
  useEffect(() => {
    if (authLoading) return;
    if (!user || user.email !== 'abdelrahmanmo147@gmail.com') return;

    const fetchCounts = async () => {
      try {
        const msgSnap = await getDocs(collection(db, 'messages'));
        const orderSnap = await getDocs(collection(db, 'orders'));
        setStatsData({
          messages: msgSnap.size,
          orders: orderSnap.size
        });
      } catch (err) {
        console.error("Dashboard count error", err);
      }
    };
    fetchCounts();
  }, [user, authLoading]);

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const liveServices = (services?.length || 0) + (offers?.length || 0);

  const stats = [
    { label: 'Total Projects',  value: portfolioItems.length.toString(), icon: '🚀', color: 'from-blue-600/20 to-indigo-600/20 text-blue-400 border-blue-500/20' },
    { label: 'Live Services',   value: liveServices.toString(),          icon: '⚡', color: 'from-emerald-600/20 to-teal-600/20 text-emerald-400 border-emerald-500/20' },
    { label: 'Unread Messages', value: statsData.messages.toString(),    icon: '📩', color: 'from-amber-600/20 to-orange-600/20 text-amber-400 border-amber-500/20' },
    { label: 'Total Orders',    value: statsData.orders.toString(),      icon: '🛒', color: 'from-purple-600/20 to-violet-600/20 text-purple-400 border-purple-500/20' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-8 md:p-12 mb-10 border border-gray-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-[0.2em] text-xs mb-4">
            <span className="w-8 h-[2px] bg-blue-600" />
            Control Center
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
            Welcome back, <span className="text-blue-500">Admin</span>.
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Here's what's happening with <span className="text-white font-semibold">Ather Agency</span> today. You have <span className="text-blue-400 font-bold">{inProgressTasks} active tasks</span> in your pipeline.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className={`relative group p-6 rounded-3xl border bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${stat.color}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
            <p className="text-4xl font-display font-bold text-white tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent High-Performance Projects */}
        <div className="lg:col-span-2 bg-gray-900/40 backdrop-blur-xl rounded-[2rem] border border-gray-800 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              Recent Successes
              <span className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full uppercase tracking-tighter font-black">Live</span>
            </h2>
            <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors">VIEW ALL →</button>
          </div>

          {portfolioItems.length === 0 ? (
            <div className="text-center py-20 bg-gray-950/30 rounded-3xl border border-dashed border-gray-800/50">
              <p className="text-5xl mb-6 opacity-20">🎨</p>
              <h3 className="text-white font-bold mb-1">No showcasing projects yet</h3>
              <p className="text-gray-500 text-sm">Add some flair to your agency by uploading your best work.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolioItems.slice(0, 4).map((item) => (
                <div key={item.id} className="group flex items-center justify-between p-5 rounded-2xl bg-gray-800/20 border border-gray-800 hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      {item.icon || '🚀'}
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-0.5">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.client} <span className="mx-1.5 opacity-30">•</span> {item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-400 mb-0.5">{item.result || 'Active'}</p>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{item.metric || 'Performance'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mini Team Feed / Insights */}
        <div className="bg-gradient-to-b from-blue-600/10 to-transparent rounded-[2rem] border border-blue-500/10 p-8">
          <h2 className="text-xl font-bold text-white mb-6">Pipeline Health</h2>
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400">Project Velocity</span>
                <span className="text-xs font-bold text-emerald-400">+12.5%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              </div>
            </div>
            
            <div className="space-y-4 mt-8">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Quick Tips</h3>
              {[
                'Review new client inquiries from today.',
                'Check in with the creative team on Logo V2.',
                'Update portfolio with the last Web Dev project.'
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                  <span className="text-blue-500">◈</span> {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}