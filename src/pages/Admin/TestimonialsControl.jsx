import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsControl() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', text: '', avatar: '', avatarUrl: '' });

  const inputCls = "w-full px-5 py-3.5 bg-gray-800/40 border border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-white text-sm transition-all placeholder-gray-500";
  const textareaCls = "w-full px-5 py-3.5 bg-gray-800/40 border border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-white text-sm transition-all resize-none placeholder-gray-500";

  const resetForm = () => {
    setForm({ name: '', role: '', text: '', avatar: '', avatarUrl: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.text.trim()) return;
    const avatar = form.avatar.trim() ||
      form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const data = { ...form, avatar, status: 'Active' };
    if (editingId) {
      updateTestimonial(editingId, data);
    } else {
      addTestimonial(data);
    }
    resetForm();
  };

  const handleEdit = (t) => {
    setForm({ name: t.name, role: t.role, text: t.text, avatar: t.avatar || '', avatarUrl: t.avatarUrl || '' });
    setEditingId(t.id);
    setShowForm(true);
  };

  const toggleStatus = (id, current) => {
    updateTestimonial(id, { status: current === 'Active' ? 'Hidden' : 'Active' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center border border-purple-500/20 text-xl">💬</div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Testimonials</h1>
          </div>
          <p className="text-gray-400 text-sm">Manage client reviews and social proof shown on the website.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
            showForm 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20'
          }`}
        >
          {showForm ? '✕ Close' : '+ Add Testimonial'}
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] border border-gray-800 p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
            
            <h2 className="relative z-10 text-2xl font-bold text-white mb-8">
              {editingId ? '⚡ Edit Testimonial' : '✨ New Testimonial'}
            </h2>
            
            <div className="relative z-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Client Name *</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. Ahmed Hassan"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Role / Company</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. CEO, NovaTech"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Testimonial Text *</label>
                <textarea
                  className={textareaCls}
                  rows={4}
                  placeholder="What did the client say about your work?"
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Avatar Initials (auto from name)</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. AH (optional)"
                    value={form.avatar}
                    onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">📸 Avatar Image URL (Cloudinary)</label>
                  <input
                    className={inputCls}
                    placeholder="https://res.cloudinary.com/..."
                    value={form.avatarUrl}
                    onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                  />
                </div>
              </div>

              {/* Avatar Preview */}
              {form.avatarUrl && (
                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700">
                  <img src={form.avatarUrl} alt="Avatar preview" className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/30" />
                  <span className="text-sm text-gray-400">Avatar preview</span>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="relative z-10 flex gap-4 pt-8 mt-8 border-t border-gray-800">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white font-black uppercase tracking-widest text-xs px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                {editingId ? 'Save Changes' : 'Publish Testimonial'}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-800 text-gray-400 font-black uppercase tracking-widest text-xs px-10 py-4 rounded-2xl hover:bg-gray-700 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      {testimonials.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-white">{testimonials.length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Total</p>
          </div>
          <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{testimonials.filter(t => t.status === 'Active').length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Active</p>
          </div>
          <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-gray-500">{testimonials.filter(t => t.status !== 'Active').length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Hidden</p>
          </div>
        </div>
      )}

      {/* List */}
      {testimonials.length === 0 ? (
        <div className="text-center py-32 bg-gray-900/20 rounded-[3rem] border border-dashed border-gray-800/60">
          <p className="text-5xl mb-6 opacity-20">💬</p>
          <h3 className="text-xl font-bold text-white mb-2">No testimonials yet</h3>
          <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">Add social proof to build trust with potential clients.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="mt-8 text-blue-500 font-bold text-sm border-b border-blue-500/30 hover:border-blue-500 transition-all pb-1"
          >
            Add your first testimonial
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {testimonials.map((t) => (
            <div key={t.id} className={`group bg-gray-900/30 backdrop-blur-sm rounded-[2rem] border transition-all duration-300 hover:shadow-xl p-8 ${t.status === 'Active' ? 'border-gray-800 hover:border-purple-500/30' : 'border-red-500/20 opacity-60'}`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex gap-5 flex-1">
                  {/* Avatar */}
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg">
                      {t.avatar}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-white text-lg">{t.name}</p>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        t.status === 'Active' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {t.status || 'Active'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{t.role}</p>
                    <p className="text-gray-300 leading-relaxed italic">"{t.text}"</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toggleStatus(t.id, t.status)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      t.status === 'Active' 
                        ? 'bg-gray-800 text-gray-400 hover:bg-red-500/10 hover:text-red-400' 
                        : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    {t.status === 'Active' ? '🙈 Hide' : '👁️ Show'}
                  </button>
                  <button
                    onClick={() => handleEdit(t)}
                    className="px-4 py-2.5 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { if(window.confirm('Delete this testimonial?')) deleteTestimonial(t.id); }}
                    className="w-10 flex items-center justify-center bg-gray-800 hover:bg-red-500/20 text-gray-600 hover:text-red-500 rounded-xl transition-all duration-300"
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