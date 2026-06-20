import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Social Media', 'Web Design', 'Video Editing', 'Graphic Design'];
const icons = ['📱', '🌐', '🎬', '🎨', '🎵', '🛒', '📈', '🏆', '✨', '💼', '💻', '🎥', '🖼️', '📋'];

const SEED_PROJECTS = [
  { category: 'Social Media',   client: 'GreenLeaf',  title: 'Instagram Growth Campaign', result: '50K New Followers',      metric: '+340% Engagement',       icon: '📱', description: 'A full-scale Instagram growth campaign.', challenge: 'Minimal social media presence.', solution: 'Comprehensive content strategy with daily stories and reels.', images: [], featured: false, visible: true },
  { category: 'Social Media',   client: 'FitCore',    title: 'TikTok Brand Launch',       result: '2M+ Views',              metric: '10K Followers in 30 days', icon: '🎵', description: 'Launching FitCore on TikTok with viral content.', challenge: 'Zero TikTok presence.', solution: 'Trending fitness content with viral hooks.', images: [], featured: false, visible: true },
  { category: 'Web Design',     client: 'NovaTech',   title: 'SaaS Landing Page',         result: '150% Conversion Boost',  metric: '4.2s → 1.1s Load Time', icon: '🌐', description: 'High-converting SaaS landing page.', challenge: 'Poor conversion rates.', solution: 'Redesigned with conversion-optimized layout.', images: [], featured: true, visible: true },
  { category: 'Video Editing',  client: 'FitCore',    title: 'Product Launch Video',      result: '500K YouTube Views',     metric: '8.5% Click-Through Rate', icon: '🎬', description: 'Cinematic product launch video.', challenge: 'Needed compelling launch video.', solution: 'Cinematic video with motion graphics.', images: [], featured: false, visible: true },
  { category: 'Graphic Design', client: 'Orion Labs', title: 'Complete Brand Identity',   result: 'Full Rebrand',           metric: '40% Brand Recognition ↑', icon: '🎨', description: 'Complete brand identity transformation.', challenge: 'Brand overhaul needed.', solution: 'New logo, colors, typography, guidelines.', images: [], featured: true, visible: true },
];

export default function PortfolioControl() {
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [seeding, setSeeding]     = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [form, setForm] = useState({
    category: 'Social Media', client: '', title: '', result: '', metric: '', icon: '📱',
    description: '', challenge: '', solution: '', images: [], featured: false, visible: true,
  });

  const inputCls = "w-full px-5 py-3.5 bg-gray-800/40 border border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-white text-sm transition-all";
  const textareaCls = "w-full px-5 py-3.5 bg-gray-800/40 border border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-white text-sm transition-all resize-none";

  const resetForm = () => {
    setForm({ category: 'Social Media', client: '', title: '', result: '', metric: '', icon: '📱', description: '', challenge: '', solution: '', images: [], featured: false, visible: true });
    setEditingId(null);
    setShowForm(false);
    setNewImageUrl('');
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.client.trim()) return;
    if (editingId) {
      await updatePortfolioItem(editingId, form);
    } else {
      await addPortfolioItem(form);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setForm({
      category: item.category || 'Social Media',
      client: item.client || '',
      title: item.title || '',
      result: item.result || '',
      metric: item.metric || '',
      icon: item.icon || '📱',
      description: item.description || '',
      challenge: item.challenge || '',
      solution: item.solution || '',
      images: item.images || [],
      featured: item.featured || false,
      visible: item.visible !== false,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSeed = async () => {
    if (!window.confirm('This will add 5 example projects to your portfolio. Continue?')) return;
    setSeeding(true);
    try {
      for (const project of SEED_PROJECTS) {
        await addPortfolioItem(project);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  const addImage = () => {
    if (!newImageUrl.trim()) return;
    setForm(prev => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }));
    setNewImageUrl('');
  };

  const removeImage = (index) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const toggleVisibility = async (item) => {
    await updatePortfolioItem(item.id, { visible: !item.visible });
  };

  const toggleFeatured = async (item) => {
    await updatePortfolioItem(item.id, { featured: !item.featured });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-xl">🎨</div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Portfolio Control</h1>
          </div>
          <p className="text-gray-400 text-sm">Curate and showcase your agency's best work with full case study details.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white bg-gray-800/40 border border-gray-700 hover:border-gray-600 transition-all text-xs uppercase tracking-widest"
          >
            {seeding ? 'Seeding...' : '🌱 Seed Examples'}
          </button>
          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
              showForm 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20'
            }`}
          >
            {showForm ? '✕ Close' : '+ New Project'}
          </button>
        </div>
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
            
            <h2 className="relative z-10 text-2xl font-bold text-white mb-8">
              {editingId ? '⚡ Edit Project' : '🚀 New Case Study'}
            </h2>
            
            <div className="relative z-10 space-y-8">

              {/* Row 1: Basic Info */}
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Project Details</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <input className={inputCls} placeholder="Client Name (e.g. GreenLeaf)" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
                  <input className={inputCls} placeholder="Project Title (e.g. SaaS Landing Page)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
              </div>

              {/* Row 2: Description */}
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Description</label>
                <textarea className={textareaCls} rows="3" placeholder="Brief description of the project..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              {/* Row 3: Challenge & Solution */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">⚡ The Challenge</label>
                  <textarea className={textareaCls} rows="3" placeholder="What problem did the client face?" value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">💡 Our Solution</label>
                  <textarea className={textareaCls} rows="3" placeholder="How did we solve it?" value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} />
                </div>
              </div>

              {/* Row 4: Metrics */}
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Impact & Metrics</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <input className={inputCls} placeholder="Main Result (e.g. 150% Conversion Boost)" value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} />
                  <input className={inputCls} placeholder="Secondary Metric (e.g. 4.2s → 1.1s Load Time)" value={form.metric} onChange={(e) => setForm({ ...form, metric: e.target.value })} />
                </div>
              </div>

              {/* Row 5: Category + Icon + Toggles */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Icon</label>
                  <div className="flex gap-2 flex-wrap bg-gray-950/40 p-3 rounded-2xl border border-gray-800">
                    {icons.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setForm({ ...form, icon })}
                        className={`text-xl w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                          form.icon === icon ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'hover:bg-gray-800 text-gray-500'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Settings</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center ${form.visible ? 'bg-green-600' : 'bg-gray-700'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 mx-1 ${form.visible ? 'translate-x-4' : ''}`} />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Visible on website</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center ${form.featured ? 'bg-yellow-600' : 'bg-gray-700'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 mx-1 ${form.featured ? 'translate-x-4' : ''}`} />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">⭐ Featured project</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 6: Images */}
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">📸 Project Images (URLs)</label>
                <div className="flex gap-3 mb-4">
                  <input
                    className={inputCls}
                    placeholder="Paste image URL here..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImage(); } }}
                  />
                  <button
                    onClick={addImage}
                    className="shrink-0 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-2xl hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {form.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {form.images.map((url, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-700">
                        <img src={url} alt={`Screenshot ${i + 1}`} className="w-full h-24 object-cover" />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {form.images.length === 0 && (
                  <p className="text-xs text-gray-600 italic">No images added yet. Add URLs to showcase your work in the case study.</p>
                )}
              </div>

            </div>

            {/* Submit */}
            <div className="relative z-10 flex gap-4 pt-8 mt-8 border-t border-gray-800">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white font-black uppercase tracking-widest text-xs px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                {editingId ? 'Save Edits' : 'Publish Project'}
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

      {/* Stats Bar */}
      {portfolioItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-white">{portfolioItems.length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Total Projects</p>
          </div>
          <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{portfolioItems.filter(i => i.visible !== false).length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Visible</p>
          </div>
          <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{portfolioItems.filter(i => i.featured).length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Featured</p>
          </div>
          <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{portfolioItems.filter(i => (i.images || []).length > 0).length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">With Images</p>
          </div>
        </div>
      )}

      {/* Grid */}
      {portfolioItems.length === 0 ? (
        <div className="text-center py-32 bg-gray-900/20 rounded-[3rem] border border-dashed border-gray-800/60">
          <p className="text-5xl mb-6 opacity-20">📂</p>
          <h3 className="text-xl font-bold text-white mb-2">Portfolio is quiet</h3>
          <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">Show your clients the power of Ather Agency by publishing your latest successes.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="mt-8 text-blue-500 font-bold text-sm border-b border-blue-500/30 hover:border-blue-500 transition-all pb-1"
          >
            Start your first showcase
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div key={item.id} className={`group relative bg-gray-900/30 backdrop-blur-sm rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 ${item.visible === false ? 'border-red-500/30 opacity-60' : 'border-gray-800 hover:border-blue-500/30'} p-8`}>
              
              {/* Status Badges */}
              <div className="flex items-center gap-2 mb-6">
                {item.featured && (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    ⭐ Featured
                  </span>
                )}
                {item.visible === false && (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    Hidden
                  </span>
                )}
                {(item.images || []).length > 0 && (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    📸 {item.images.length}
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {item.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
                  {item.category}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">{item.client}</p>
                <h3 className="text-xl font-display font-bold text-white leading-tight min-h-[3rem] group-hover:text-blue-400 transition-colors">{item.title}</h3>
              </div>

              {item.description && (
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{item.description}</p>
              )}

              <div className="bg-gray-950/40 rounded-2xl p-4 border border-gray-800/50 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs">🏆</span>
                  <p className="text-sm font-bold text-white leading-none">{item.result}</p>
                </div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest pl-6">{item.metric}</p>
              </div>

              {/* Image preview */}
              {(item.images || []).length > 0 && (
                <div className="flex gap-2 mb-6 overflow-hidden">
                  {item.images.slice(0, 3).map((url, i) => (
                    <div key={i} className="w-16 h-12 rounded-lg overflow-hidden border border-gray-700">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {item.images.length > 3 && (
                    <div className="w-16 h-12 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                      <span className="text-xs text-gray-400 font-bold">+{item.images.length - 3}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleVisibility(item)}
                  className={`px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    item.visible === false 
                      ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                      : 'bg-gray-800 text-gray-400 hover:bg-red-500/10 hover:text-red-400'
                  }`}
                  title={item.visible === false ? 'Show on website' : 'Hide from website'}
                >
                  {item.visible === false ? '👁️ Show' : '🙈 Hide'}
                </button>
                <button
                  onClick={() => toggleFeatured(item)}
                  className={`px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    item.featured 
                      ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' 
                      : 'bg-gray-800 text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400'
                  }`}
                >
                  {item.featured ? '⭐' : '☆'}
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => { if(window.confirm('Delete this project?')) deletePortfolioItem(item.id); }}
                  className="w-12 flex items-center justify-center bg-gray-800 hover:bg-red-500/20 text-gray-600 hover:text-red-500 rounded-xl transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}