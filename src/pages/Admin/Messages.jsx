import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../../firebase/config';
import { collection, updateDoc, doc, deleteDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

// ── Notification sound via Web Audio API ──
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    osc2.frequency.setValueAtTime(1100, ctx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.15);
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.6);
  } catch (e) {
    console.warn('Audio not available:', e);
  }
}

// ── Toast Notification Component ──
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-start gap-4 bg-gray-900/90 backdrop-blur-xl border border-blue-500/30 text-white px-6 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-sm">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-2xl shrink-0 border border-blue-500/20">📩</div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-xs uppercase tracking-widest text-blue-400 mb-1">New Message Received</p>
          <p className="font-bold text-base truncate">{message.name}</p>
          <p className="text-gray-400 text-sm truncate mt-0.5">{message.message}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
      </div>
    </div>
  );
}

export default function Messages() {
  const [messages, setMessages]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [selected, setSelected]   = useState(null);
  const [toast, setToast]         = useState(null);
  const { user, loading: authLoading } = useAuth();

  const isFirstLoad = useRef(true);
  const prevCountRef = useRef(0);
  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.email !== 'abdelrahmanmo147@gmail.com') {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

      if (!isFirstLoad.current) {
        const newCount = fetched.filter(m => !m.read).length;
        if (newCount > prevCountRef.current) {
          playNotificationSound();
          const newest = fetched.find(m => !m.read);
          if (newest) setToast(newest);
        }
      } else {
        isFirstLoad.current = false;
      }

      prevCountRef.current = fetched.filter(m => !m.read).length;
      setMessages(fetched);
      setLoading(false);
    }, (err) => {
      console.error("Messages listener error:", err);
      setError("Missing permissions. Please update Firestore Rules.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading]);

  const markRead = async (id) => {
    await updateDoc(doc(db, 'messages', id), { read: true });
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteDoc(doc(db, 'messages', id));
    if (selected?.id === id) setSelected(null);
  };

  const handleGmailReply = () => {
    if (!selected?.email) return;
    const subject = encodeURIComponent(`Re: Inquiry with Ather Agency`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${selected.email}&su=${subject}`;
    window.open(gmailUrl, '_blank');
  };

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString('en-US', {
      day: 'numeric', month: 'short',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="p-8 max-w-lg mx-auto mt-12 bg-red-900/20 border border-red-500/30 rounded-2xl text-center">
      <p className="text-4xl mb-4">⚠️</p>
      <h2 className="text-xl font-bold text-red-500 mb-2">Access Denied</h2>
      <p className="text-gray-400 mb-6">{error}</p>
      <p className="text-sm text-gray-500">
        Make sure you have added the rules for <code className="bg-black px-2 py-1 rounded">/messages</code> in your Firebase Console.
      </p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {toast && <Toast message={toast} onClose={dismissToast} />}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Client Inbox</h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 rounded-full bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">Response management and client communications center.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Connection Active
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-32 bg-gray-900/20 rounded-[2.5rem] border border-dashed border-gray-800">
          <div className="text-5xl mb-6 opacity-20">📬</div>
          <h3 className="text-xl font-bold text-white mb-2">Your inbox is clean</h3>
          <p className="text-gray-500 max-w-xs mx-auto text-sm">All caught up! New client inquiries will appear here automatically in real-time.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* List Section */}
          <div className="lg:col-span-5 space-y-3 h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
            {messages.map((msg) => {
              const isActive = selected?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => { setSelected(msg); if (!msg.read) markRead(msg.id); }}
                  className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-blue-600/10 border-blue-500/40 shadow-lg'
                      : 'bg-gray-900/30 border-gray-800/60 hover:bg-gray-800/40 hover:border-gray-700'
                  }`}
                >
                  {!msg.read && (
                    <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                  )}
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {msg.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-bold text-sm truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {msg.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{formatDate(msg.createdAt)}</p>
                    </div>
                  </div>
                  <p className={`text-xs line-clamp-1 transition-colors ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detail Section */}
          <div className="lg:col-span-7 sticky top-6">
            {selected ? (
              <div className="bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-800 p-8 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-3xl shadow-inner">
                      👤
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{selected.name}</h2>
                      <p className="text-xs font-black text-blue-500 uppercase tracking-[0.2em]">{formatDate(selected.createdAt)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMessage(selected.id)}
                    className="w-12 h-12 rounded-2xl bg-gray-800/50 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: '✉️', label: 'Email', value: selected.email, link: `mailto:${selected.email}` },
                    { icon: '📱', label: 'Phone', value: selected.phone || 'N/A', link: selected.phone ? `tel:${selected.phone}` : null },
                    { icon: '🏢', label: 'Company', value: selected.company || 'N/A' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-gray-800/20 border border-gray-800/40">
                      <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest mb-1">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} className="text-sm font-bold text-white hover:text-blue-400 transition-colors truncate block">{item.value}</a>
                      ) : (
                        <p className="text-sm font-bold text-white truncate">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl bg-gray-950/40 p-8 border border-gray-800 relative mb-10">
                  <div className="absolute -top-3 left-6 px-3 bg-gray-900 border border-gray-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">MESSAGE CONTENT</div>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-[15px] italic">
                    "{selected.message}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleGmailReply}
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all shadow-xl shadow-white/5 active:scale-95"
                  >
                    Reply by Email
                  </button>
                  {selected.phone && (
                    <a
                      href={`https://wa.me/2${selected.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#25D366] text-white font-black uppercase tracking-widest text-xs hover:bg-[#128C7E] transition-all shadow-xl shadow-green-600/20 active:scale-95"
                    >
                      WhatsApp Reach
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[500px] flex flex-col items-center justify-center text-center bg-gray-900/10 rounded-[2.5rem] border border-dashed border-gray-800">
                <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center text-4xl mb-6 shadow-inner ring-1 ring-gray-800 animate-pulse">👈</div>
                <h3 className="text-xl font-bold text-white mb-2">Message Preview</h3>
                <p className="text-gray-500 max-w-[200px] text-sm">Select a conversation from the list to view full details and respond.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
