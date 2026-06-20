import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function WaitlistControl() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'notified'
  const [search, setSearch] = useState('');
  const { user, loading: authLoading } = useAuth();

  const fetchEntries = async () => {
    try {
      const q = query(collection(db, 'waitlist'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Waitlist fetch error:', err);
      toast.error('Failed to load waitlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.email !== 'abdelrahmanmo147@gmail.com') {
      setLoading(false);
      return;
    }
    fetchEntries();
  }, [user, authLoading]);

  const handleNotify = async (id, whatsapp, name, serviceName) => {
    try {
      await updateDoc(doc(db, 'waitlist', id), { status: 'notified' });
      setEntries(prev => prev.map(e => e.id === id ? { ...e, status: 'notified' } : e));
      toast.success('Marked as notified ✅');

      // Open WhatsApp with a pre-filled message
      const msg = `مرحباً ${name}! 🎉\n\nالخير من أثر أجنسي.\n\nنحن سعداء بإعلامكم أن خدمة *${serviceName}* أصبحت متاحة الآن!\n\nهل تودون الحجز الآن؟ نحن هنا لمساعدتكم 🚀`;
      const clean = whatsapp.replace(/\D/g, '');
      const prefix = clean.startsWith('0') ? '2' : '';
      window.open(`https://wa.me/${prefix}${clean}?text=${encodeURIComponent(msg)}`, '_blank');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this waitlist entry?')) return;
    try {
      await deleteDoc(doc(db, 'waitlist', id));
      setEntries(prev => prev.filter(e => e.id !== id));
      toast.success('Entry removed');
    } catch {
      toast.error('Failed to delete');
    }
  };

  // Group by service name
  const grouped = entries.reduce((acc, entry) => {
    const key = entry.serviceName || 'Unknown Service';
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  const filtered = entries.filter(e => {
    const matchFilter = filter === 'all' || e.status === filter;
    const matchSearch = !search ||
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.whatsapp?.includes(search) ||
      e.serviceName?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const pendingCount  = entries.filter(e => e.status === 'pending').length;
  const notifiedCount = entries.filter(e => e.status === 'notified').length;

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-amber-500/40 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-amber-500 font-black uppercase tracking-[0.2em] text-xs mb-3">
          <span className="w-8 h-[2px] bg-amber-500" />
          Service Waitlist
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
          Waitlist
          {pendingCount > 0 && (
            <span className="text-base align-middle bg-amber-600/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30 font-bold animate-pulse">
              {pendingCount} pending
            </span>
          )}
        </h1>
        <p className="text-gray-400 text-sm">Clients who want to be notified when a service becomes available.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', count: entries.length, key: 'all', color: 'bg-gray-800 border-gray-700 text-white' },
          { label: 'Pending', count: pendingCount, key: 'pending', color: 'bg-amber-600/10 border-amber-500/30 text-amber-400' },
          { label: 'Notified', count: notifiedCount, key: 'notified', color: 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
              filter === tab.key
                ? `${tab.color} ring-1 ring-offset-0 ring-white/10`
                : 'bg-gray-900/40 border-gray-800/50 hover:border-gray-700'
            }`}
          >
            <p className="text-2xl font-bold text-white mb-1">{tab.count}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{tab.label}</p>
          </button>
        ))}
      </div>

      {/* Services summary */}
      {Object.keys(grouped).length > 1 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(grouped).map(([svc, arr]) => (
            <div key={svc} className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-xl text-xs font-bold text-gray-300">
              🔥 {svc}
              <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">{arr.length}</span>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, WhatsApp, or service..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-5 py-3.5 rounded-2xl bg-gray-900/40 border border-gray-800/50 text-white placeholder-gray-500 focus:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm"
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/20 rounded-3xl border border-dashed border-gray-800/50">
          <p className="text-5xl mb-4 opacity-20">🔔</p>
          <h3 className="text-white font-bold mb-1">No waitlist entries</h3>
          <p className="text-gray-500 text-sm">
            {filter !== 'all' ? 'Try changing the filter' : 'Entries appear here when clients join the waitlist from the Pricing page.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(entry => (
            <div
              key={entry.id}
              className={`group p-5 rounded-2xl backdrop-blur-xl border transition-all duration-200 ${
                entry.status === 'notified'
                  ? 'bg-emerald-900/10 border-emerald-700/30'
                  : 'bg-gray-900/40 border-amber-700/20 hover:border-amber-600/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Info */}
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    entry.status === 'notified' ? 'bg-emerald-600/20' : 'bg-amber-600/20'
                  }`}>
                    {entry.status === 'notified' ? '✅' : '🔔'}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-0.5">{entry.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
                      <span>📱 {entry.whatsapp}</span>
                      <span className="opacity-40">•</span>
                      <span className="text-amber-400 font-semibold">🔥 {entry.serviceName}</span>
                      {entry.tierPrice && (
                        <>
                          <span className="opacity-40">•</span>
                          <span className="text-gray-500">{entry.tierPrice} {entry.tierBilling}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Joined: {formatDate(entry.createdAt)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:ml-auto shrink-0">
                  {/* Status badge */}
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                    entry.status === 'notified'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                  }`}>
                    {entry.status}
                  </span>

                  {entry.status !== 'notified' && (
                    <button
                      onClick={() => handleNotify(entry.id, entry.whatsapp, entry.name, entry.serviceName)}
                      className="px-4 py-2 rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 text-xs font-bold hover:bg-emerald-600/25 transition-all whitespace-nowrap"
                    >
                      ✅ Notify via WhatsApp
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800/50 text-gray-500 border border-gray-700/50 text-xs font-bold hover:text-red-400 hover:border-red-500/30 transition-all"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
