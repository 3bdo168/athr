import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// ── Default fallback data ─────────────────────────────────────────────────────
const DEFAULT_SOCIAL_TIERS = [
  {
    name: 'Starter', price: '3,000', priceMax: '6,000', billing: 'EGP / month',
    description: 'Perfect for small businesses and startups just getting online.',
    popular: false,
    features: ['Manage 1 platform (Instagram or Facebook)', '4 posts per week with graphic design', 'Basic caption & hashtag strategy', 'Monthly performance report', 'WhatsApp support'],
  },
  {
    name: 'Professional', price: '8,000', priceMax: '15,000', billing: 'EGP / month',
    description: 'Ideal for growing brands that are serious about results.',
    popular: true,
    features: ['Everything in Starter', 'Manage 3 platforms (Instagram, Facebook, TikTok)', '8 posts per week + Reels & Shorts', 'Video editing for Reels & content', 'Weekly report + monthly strategy meeting', 'Priority WhatsApp support'],
  },
  {
    name: 'Enterprise', price: '20,000', priceMax: null, billing: 'EGP / month',
    description: 'For large brands with high-volume content needs.',
    popular: false,
    features: ['Everything in Professional', 'Dedicated account manager', 'Professional video & Reels production', 'Custom poster & graphic design packages', 'Full visual identity design', 'Priority delivery & unlimited revisions'],
  },
];

const DEFAULT_WEB_TIERS = [
  {
    name: 'Landing Page', price: '5,000', priceMax: '10,000', billing: 'EGP — one-time',
    description: 'A high-converting single page to showcase your brand or product.',
    popular: false,
    features: ['Custom responsive design', 'Up to 5 sections', 'Contact form integration', 'WhatsApp button', 'Delivered in 5–7 business days'],
  },
  {
    name: 'Full Website', price: '15,000', priceMax: '35,000', billing: 'EGP — one-time',
    description: 'A complete multi-page website that grows with your business.',
    popular: true,
    features: ['Everything in Landing Page', '5 to 10 fully designed pages', 'Mobile-first responsive layout', 'SEO-ready structure', 'Delivered in 2–4 weeks'],
  },
  {
    name: 'Website + Dashboard', price: '30,000', priceMax: '60,000', billing: 'EGP — one-time',
    description: 'A full website with a custom admin panel to manage your content.',
    popular: false,
    features: ['Everything in Full Website', 'Custom admin dashboard', 'Product / content management', 'User authentication & roles', 'Ongoing support after delivery'],
  },
];

const DEFAULT_SERVICES = [
  {
    id: 'social', name: 'Social Media Management', icon: '📱', description: 'Content posting + graphic design',
    options: [
      { label: 'Starter – 1 Platform', range: '3,000 – 6,000 EGP/mo', price: 4500 },
      { label: 'Professional – 3 Platforms', range: '8,000 – 15,000 EGP/mo', price: 11500 },
      { label: 'Enterprise – Full Management', range: '20,000+ EGP/mo', price: 20000 },
    ],
  },
  {
    id: 'web', name: 'Web Design & Development', icon: '🌐', description: 'Landing page or full website',
    options: [
      { label: 'Landing Page', range: '5,000 – 10,000 EGP', price: 7500 },
      { label: 'Full Website (5–10 pages)', range: '15,000 – 35,000 EGP', price: 25000 },
      { label: 'Website + Admin Dashboard', range: '30,000 – 60,000 EGP', price: 45000 },
    ],
  },
  {
    id: 'video', name: 'Video Editing', icon: '🎬', description: 'Reels, shorts & professional ad videos',
    options: [
      { label: 'Reels / Shorts (per video)', range: '300 – 800 EGP/video', price: 550 },
      { label: 'Full Ad Video', range: '2,000 – 8,000 EGP', price: 5000 },
      { label: 'Monthly Package – 8 videos', range: '4,000 – 10,000 EGP/mo', price: 7000 },
    ],
  },
  {
    id: 'graphic', name: 'Posters & Graphic Design', icon: '🎨', description: 'Posts, brochures & visual identity',
    options: [
      { label: 'Single Post Design', range: '500+ EGP', price: 450 },
      { label: 'Monthly Package – 12 posts', range: '1,500 – 3,500 EGP/mo', price: 2500 },
      { label: 'Full Visual Identity', range: '5,000 – 15,000 EGP', price: 10000 },
    ],
  },
  {
    id: 'ai_reels', name: 'AI Reels', icon: '🤖', description: 'AI-generated Reels & short-form video content',
    options: [
      { label: 'Single AI Reel', range: '500 – 1,500 EGP', price: 1000 },
      { label: 'Monthly Pack – 4 Reels', range: '1,500 – 4,000 EGP/mo', price: 2750 },
      { label: 'Monthly Pack – 12 Reels', range: '4,000 – 10,000 EGP/mo', price: 7000 },
    ],
  },
];

const BLANK_TIER = {
  name: 'New Tier', price: '0', priceMax: null, billing: 'EGP / month',
  description: '', popular: false, features: [''],
};

const BLANK_SERVICE = {
  id: `svc_${Date.now()}`, name: 'New Service', icon: '✨', description: '',
  options: [
    { label: 'Option 1', range: '0 EGP', price: 0 },
  ],
};

// ── Input helper ─────────────────────────────────────────────────────────────
const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800/40 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200";

function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ml-1">{label}</label>
      <input
        type={type}
        value={value ?? ''}
        onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

// ── Tier Editor ───────────────────────────────────────────────────────────────
function TierEditor({ tier, onChange, onDelete, index }) {
  const [open, setOpen] = useState(false);

  const updateField   = (key, val) => onChange({ ...tier, [key]: val });
  const updateFeature = (idx, val) => {
    const features = [...tier.features];
    features[idx]  = val;
    onChange({ ...tier, features });
  };
  const addFeature    = () => onChange({ ...tier, features: [...tier.features, ''] });
  const removeFeature = (idx) => onChange({ ...tier, features: tier.features.filter((_, i) => i !== idx) });

  return (
    <div className={`bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl transition-all duration-300 overflow-hidden ${open ? 'ring-1 ring-blue-500/30 shadow-2xl' : 'hover:border-gray-700'}`}>
      <div className="flex items-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between px-6 py-5 hover:bg-gray-800/40 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">
              #{index + 1}
            </div>
            <div className="text-left">
              <span className="block font-bold text-white text-lg leading-none">{tier.name || 'Unnamed Tier'}</span>
              <span className="text-xs text-gray-400 mt-1">{tier.price}{tier.priceMax ? ` – ${tier.priceMax}` : '+'} EGP <span className="opacity-50 mx-1">•</span> {tier.billing}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {tier.popular && <span className="hidden md:inline-block text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-3 py-1 rounded-full">Most Popular</span>}
            <span className={`text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▼</span>
          </div>
        </button>
        <button
          onClick={() => { if (window.confirm(`Delete "${tier.name}"?`)) onDelete(); }}
          className="px-6 py-6 border-l border-gray-800 text-gray-500 hover:text-red-500 transition-colors"
        >
          🗑️
        </button>
      </div>

      {open && (
        <div className="p-8 border-t border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Field label="Tier Name" value={tier.name} onChange={v => updateField('name', v)} />
            <Field label="Billing Label" value={tier.billing} onChange={v => updateField('billing', v)} placeholder="e.g. EGP / month" />
            <Field label="Min Price" value={tier.price} onChange={v => updateField('price', v)} placeholder="3,000" />
            <Field label="Max Price (Optional)" value={tier.priceMax ?? ''} onChange={v => updateField('priceMax', v || null)} placeholder="6,000" />
          </div>
          
          <div className="mb-6">
            <Field label="Short Description" value={tier.description} onChange={v => updateField('description', v)} />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-blue-600/5 rounded-xl border border-blue-500/10">
              <input 
                type="checkbox" 
                id={`popular-${index}`}
                checked={!!tier.popular} 
                onChange={e => updateField('popular', e.target.checked)}
                className="w-5 h-5 rounded-md accent-blue-600 bg-gray-800 border-gray-700" 
              />
              <label htmlFor={`popular-${index}`} className="text-sm text-gray-300 font-bold cursor-pointer">Mark as "Most Popular" Plan</label>
            </div>
            <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              tier.busy ? 'bg-amber-500/10 border-amber-500/30' : 'bg-gray-800/20 border-gray-700/30'
            }`}>
              <input 
                type="checkbox" 
                id={`busy-${index}`}
                checked={!!tier.busy} 
                onChange={e => updateField('busy', e.target.checked)}
                className="w-5 h-5 rounded-md accent-amber-500 bg-gray-800 border-gray-700" 
              />
              <div>
                <label htmlFor={`busy-${index}`} className="text-sm text-gray-300 font-bold cursor-pointer block">🔥 Mark as "At Capacity"</label>
                <p className="text-xs text-gray-500 mt-0.5">Clients will see a waitlist form instead of checkout</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Included Features</p>
              <button 
                onClick={addFeature}
                className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1"
              >
                + ADD NEW FEATURE
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {tier.features.map((f, i) => (
                <div key={i} className="flex gap-2 group">
                  <input
                    value={f}
                    onChange={e => updateFeature(i, e.target.value)}
                    placeholder="Feature name..."
                    className={`${inputCls} !py-2`}
                  />
                  <button 
                    onClick={() => removeFeature(i)}
                    className="w-9 h-9 shrink-0 flex items-center justify-center rounded-xl bg-gray-800/10 hover:bg-red-500/10 text-gray-600 hover:text-red-500 transition-colors"
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Service Editor ────────────────────────────────────────────────────────────
function ServiceEditor({ service, onChange, onDelete, index }) {
  const [open, setOpen] = useState(false);

  const updateOption = (idx, key, val) => {
    const options = service.options.map((o, i) => i === idx ? { ...o, [key]: key === 'price' ? Number(val) : val } : o);
    onChange({ ...service, options });
  };
  const updateField  = (key, val) => onChange({ ...service, [key]: val });

  const addOption = () => onChange({
    ...service,
    options: [...service.options, { label: 'New Option', range: '0 EGP', price: 0 }],
  });
  const removeOption = (idx) => onChange({
    ...service,
    options: service.options.filter((_, i) => i !== idx),
  });

  return (
    <div className={`bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl transition-all duration-300 overflow-hidden ${open ? 'ring-1 ring-blue-500/30' : 'hover:border-gray-700'}`}>
      <div className="flex items-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between px-6 py-5 hover:bg-gray-800/40 transition-colors"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl filter grayscale opacity-50">{service.icon}</span>
            <div className="text-left">
              <span className="block font-bold text-white text-lg leading-none">{service.name}</span>
              <span className="text-xs text-gray-400 mt-1">{service.options.length} builder options configured</span>
            </div>
          </div>
          <span className={`text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▼</span>
        </button>
        <button
          onClick={() => { if (window.confirm(`Delete service "${service.name}"?`)) onDelete(); }}
          className="px-6 py-6 border-l border-gray-800 text-gray-500 hover:text-red-500 transition-colors"
        >
          🗑️
        </button>
      </div>

      {open && (
        <div className="p-8 border-t border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="md:col-span-2">
              <Field label="Service Name" value={service.name} onChange={v => updateField('name', v)} />
            </div>
            <div>
              <Field label="Icon (Emoji)" value={service.icon} onChange={v => updateField('icon', v)} />
            </div>
            <div>
              <Field label="Short Tagline" value={service.description} onChange={v => updateField('description', v)} />
            </div>
          </div>

          {/* Busy Toggle for builder service */}
          <div className={`flex items-center gap-3 p-4 rounded-xl border mb-8 transition-all ${
            service.busy ? 'bg-amber-500/10 border-amber-500/30' : 'bg-gray-800/20 border-gray-700/30'
          }`}>
            <input
              type="checkbox"
              id={`svc-busy-${index}`}
              checked={!!service.busy}
              onChange={e => updateField('busy', e.target.checked)}
              className="w-5 h-5 rounded-md accent-amber-500 bg-gray-800 border-gray-700"
            />
            <div>
              <label htmlFor={`svc-busy-${index}`} className="text-sm text-gray-300 font-bold cursor-pointer block">🔥 Mark as "At Capacity" (High Demand)</label>
              <p className="text-xs text-gray-500 mt-0.5">The builder card will show a waitlist CTA instead of price options</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest">Builder Configuration</h4>
              <button 
                onClick={addOption}
                className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1"
              >
                + ADD PRICE OPTION
              </button>
            </div>
            
            <div className="space-y-4">
              {service.options.map((opt, i) => (
                <div key={i} className="grid md:grid-cols-3 gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-800 relative">
                  <Field label="Variant Label" value={opt.label} onChange={v => updateOption(i, 'label', v)} placeholder="e.g. Starter Pack" />
                  <Field label="Range (Display)" value={opt.range} onChange={v => updateOption(i, 'range', v)} placeholder="e.g. 1k - 3k EGP" />
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Field label="Builder Price (Int)" value={opt.price} onChange={v => updateOption(i, 'price', v)} type="number" />
                    </div>
                    <button
                      onClick={() => removeOption(i)}
                      className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PricingControl() {
  const [tab,         setTab]         = useState('social');
  const [socialTiers, setSocialTiers] = useState(DEFAULT_SOCIAL_TIERS);
  const [webTiers,    setWebTiers]    = useState(DEFAULT_WEB_TIERS);
  const [services,    setServices]    = useState(DEFAULT_SERVICES);
  const [loading,     setLoading]     = useState(true);
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'pricing', 'config'));
        if (snap.exists()) {
          const d = snap.data();
          if (d.socialTiers) setSocialTiers(d.socialTiers);
          if (d.webTiers)    setWebTiers(d.webTiers);
          if (d.services)    setServices(d.services);
        }
      } catch (err) {
        console.error('Failed to load pricing:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'pricing', 'config'), { socialTiers, webTiers, services });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Save failed:', err);
      alert('❌ Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const updateTier = (list, setList, idx, updated) => setList(list.map((t, i) => i === idx ? updated : t));
  const deleteTier = (list, setList, idx)           => setList(list.filter((_, i) => i !== idx));
  const addTier    = (list, setList, billing)       => setList([...list, { ...BLANK_TIER, billing }]);
  const addService = () => setServices([...services, { ...BLANK_SERVICE, id: `svc_${Date.now()}` }]);

  const TABS = [
    { id: 'social',  label: 'Social Media', icon: '📱' },
    { id: 'web',     label: 'Web Dev', icon: '🌐' },
    { id: 'builder', label: 'Custom Builder', icon: '🔧' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Pricing Control</h1>
          <p className="text-gray-500 text-sm">Fine-tune your agency's service tiers and dynamic builder pricing.</p>
        </div>
        
        <button
          onClick={save}
          disabled={saving}
          className={`relative px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 overflow-hidden transform active:scale-95 ${
            saved
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 active:shadow-inner'
          }`}
        >
          {saving ? 'Saving...' : saved ? 'Changes Applied!' : 'Commit Changes'}
        </button>
      </div>

      {/* Modern Tabs */}
      <div className="flex gap-1 p-1 bg-gray-900 rounded-2xl mb-10 border border-gray-800 shadow-inner">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              tab === t.id
                ? 'bg-gray-800 text-white shadow-lg border border-gray-700/50'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {tab === 'social' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {socialTiers.map((tier, i) => (
              <TierEditor
                key={i}
                index={i}
                tier={tier}
                onChange={updated => updateTier(socialTiers, setSocialTiers, i, updated)}
                onDelete={() => deleteTier(socialTiers, setSocialTiers, i)}
              />
            ))}
            <button
              onClick={() => addTier(socialTiers, setSocialTiers, 'EGP / month')}
              className="w-full py-5 rounded-3xl border-2 border-dashed border-gray-800/60
                         text-gray-600 hover:border-blue-600/50 hover:text-blue-500 hover:bg-blue-500/5
                         transition-all duration-300 text-sm font-black uppercase tracking-widest"
            >
              + Create Social Media Tier
            </button>
          </div>
        )}

        {tab === 'web' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {webTiers.map((tier, i) => (
              <TierEditor
                key={i}
                index={i}
                tier={tier}
                onChange={updated => updateTier(webTiers, setWebTiers, i, updated)}
                onDelete={() => deleteTier(webTiers, setWebTiers, i)}
              />
            ))}
            <button
              onClick={() => addTier(webTiers, setWebTiers, 'EGP — one-time')}
              className="w-full py-5 rounded-3xl border-2 border-dashed border-gray-800/60
                         text-gray-600 hover:border-blue-600/50 hover:text-blue-500 hover:bg-blue-500/5
                         transition-all duration-300 text-sm font-black uppercase tracking-widest"
            >
              + Create Web Design Tier
            </button>
          </div>
        )}

        {tab === 'builder' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {services.map((svc, i) => (
              <ServiceEditor
                key={svc.id || i}
                index={i}
                service={svc}
                onChange={updated => setServices(services.map((s, j) => j === i ? updated : s))}
                onDelete={() => setServices(services.filter((_, j) => j !== i))}
              />
            ))}
            <button
              onClick={addService}
              className="w-full py-5 rounded-3xl border-2 border-dashed border-gray-800/60
                         text-gray-600 hover:border-blue-600/50 hover:text-blue-500 hover:bg-blue-500/5
                         transition-all duration-300 text-sm font-black uppercase tracking-widest"
            >
              + Add Custom Builder Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
