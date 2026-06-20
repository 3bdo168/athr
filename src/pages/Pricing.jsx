import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import AdBanner from '../components/AdBanner';

// ─── Static fallback data (used if Firestore fails or is empty) ───────────────
const DEFAULT_SOCIAL_TIERS = [
  {
    id: 'starter',
    nameKey: 'pricing.social.starter.name',
    price: '3,000', priceMax: '6,000', billing: 'EGP / month',
    descKey: 'pricing.social.starter.desc',
    popular: false,
    featureKeys: [
      'pricing.social.starter.f1',
      'pricing.social.starter.f2',
      'pricing.social.starter.f3',
      'pricing.social.starter.f4',
      'pricing.social.starter.f5',
    ],
  },
  {
    id: 'pro',
    nameKey: 'pricing.social.pro.name',
    price: '8,000', priceMax: '15,000', billing: 'EGP / month',
    descKey: 'pricing.social.pro.desc',
    popular: true,
    featureKeys: [
      'pricing.social.pro.f1',
      'pricing.social.pro.f2',
      'pricing.social.pro.f3',
      'pricing.social.pro.f4',
      'pricing.social.pro.f5',
      'pricing.social.pro.f6',
    ],
  },
  {
    id: 'ent',
    nameKey: 'pricing.social.ent.name',
    price: '20,000', priceMax: null, billing: 'EGP / month',
    descKey: 'pricing.social.ent.desc',
    popular: false,
    featureKeys: [
      'pricing.social.ent.f1',
      'pricing.social.ent.f2',
      'pricing.social.ent.f3',
      'pricing.social.ent.f4',
      'pricing.social.ent.f5',
      'pricing.social.ent.f6',
    ],
  },
];

const DEFAULT_WEB_TIERS = [
  {
    id: 'landing',
    nameKey: 'pricing.web.landing.name',
    price: '5,000', priceMax: '10,000', billing: 'EGP — one-time',
    descKey: 'pricing.web.landing.desc',
    popular: false,
    featureKeys: [
      'pricing.web.landing.f1',
      'pricing.web.landing.f2',
      'pricing.web.landing.f3',
      'pricing.web.landing.f4',
      'pricing.web.landing.f5',
    ],
  },
  {
    id: 'full',
    nameKey: 'pricing.web.full.name',
    price: '15,000', priceMax: '35,000', billing: 'EGP — one-time',
    descKey: 'pricing.web.full.desc',
    popular: true,
    featureKeys: [
      'pricing.web.full.f1',
      'pricing.web.full.f2',
      'pricing.web.full.f3',
      'pricing.web.full.f4',
      'pricing.web.full.f5',
    ],
  },
  {
    id: 'dash',
    nameKey: 'pricing.web.dash.name',
    price: '30,000', priceMax: '60,000', billing: 'EGP — one-time',
    descKey: 'pricing.web.dash.desc',
    popular: false,
    featureKeys: [
      'pricing.web.dash.f1',
      'pricing.web.dash.f2',
      'pricing.web.dash.f3',
      'pricing.web.dash.f4',
      'pricing.web.dash.f5',
    ],
  },
];

const DEFAULT_SERVICES = [
  {
    id: 'social', nameKey: 'builder.social.name', icon: '📱', descKey: 'builder.social.desc',
    options: [
      { labelKey: 'builder.social.o1', range: '3,000 – 6,000 EGP/mo', price: 4500 },
      { labelKey: 'builder.social.o2', range: '8,000 – 15,000 EGP/mo', price: 11500 },
      { labelKey: 'builder.social.o3', range: '20,000+ EGP/mo', price: 20000 },
    ],
  },
  {
    id: 'web', nameKey: 'builder.web.name', icon: '🌐', descKey: 'builder.web.desc',
    options: [
      { labelKey: 'builder.web.o1', range: '5,000 – 10,000 EGP', price: 7500 },
      { labelKey: 'builder.web.o2', range: '15,000 – 35,000 EGP', price: 25000 },
      { labelKey: 'builder.web.o3', range: '30,000 – 60,000 EGP', price: 45000 },
    ],
  },
  {
    id: 'video', nameKey: 'builder.video.name', icon: '🎬', descKey: 'builder.video.desc',
    options: [
      { labelKey: 'builder.video.o1', range: '300 – 800 EGP/video', price: 550 },
      { labelKey: 'builder.video.o2', range: '2,000 – 8,000 EGP', price: 5000 },
      { labelKey: 'builder.video.o3', range: '4,000 – 10,000 EGP/mo', price: 7000 },
    ],
  },
  {
    id: 'graphic', nameKey: 'builder.graphic.name', icon: '🎨', descKey: 'builder.graphic.desc',
    options: [
      { labelKey: 'builder.graphic.o1', range: '500+ EGP', price: 450 },
      { labelKey: 'builder.graphic.o2', range: '1,500 – 3,500 EGP/mo', price: 2500 },
      { labelKey: 'builder.graphic.o3', range: '5,000 – 15,000 EGP', price: 10000 },
    ],
  },
  {
    id: 'ai_reels', nameKey: 'builder.ai.name', icon: '🤖', descKey: 'builder.ai.desc',
    options: [
      { labelKey: 'builder.ai.o1', range: '500 – 1,500 EGP', price: 1000 },
      { labelKey: 'builder.ai.o2', range: '1,500 – 4,000 EGP/mo', price: 2750 },
      { labelKey: 'builder.ai.o3', range: '4,000 – 10,000 EGP/mo', price: 7000 },
    ],
  },
];


// ─── Waitlist Inline Form ─────────────────────────────────────────────────────
function WaitlistForm({ tier, onClose }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', whatsapp: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const name     = tier.nameKey ? t(tier.nameKey) : tier.name;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.whatsapp.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'waitlist'), {
        name: form.name.trim(),
        whatsapp: form.whatsapp.trim(),
        serviceName: name,
        tierBilling: tier.billing,
        tierPrice: tier.price,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Waitlist error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-2xl text-center">
        <div className="text-3xl mb-3">🎉</div>
        <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-1">You're on the waitlist!</p>
        <p className="text-xs text-emerald-600 dark:text-emerald-500">We'll reach out on WhatsApp as soon as this service opens up.</p>
        <button onClick={onClose} className="mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-2xl space-y-3">
      <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Join Waitlist — {name}</p>
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className="w-full px-3 py-2.5 rounded-xl border border-amber-200 dark:border-amber-700/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        required
      />
      <input
        type="tel"
        placeholder="WhatsApp Number (e.g. 01xxxxxxxxx)"
        value={form.whatsapp}
        onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
        className="w-full px-3 py-2.5 rounded-xl border border-amber-200 dark:border-amber-700/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-all"
        >
          {submitting ? 'Saving...' : 'Notify Me 🔔'}
        </button>
        <button type="button" onClick={onClose} className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Reusable Tier Card ───────────────────────────────────────────────────────
function TierCard({ tier }) {
  const { t } = useLanguage();
  const [showWaitlist, setShowWaitlist] = useState(false);

  const name     = tier.nameKey ? t(tier.nameKey) : tier.name;
  const desc     = tier.descKey ? t(tier.descKey) : tier.description;
  const features = tier.featureKeys ? tier.featureKeys.map(k => t(k)) : tier.features;
  const isBusy   = !!tier.busy;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 flex flex-col ${
        isBusy
          ? 'border-amber-400 dark:border-amber-600 bg-white dark:bg-gray-800 shadow-lg shadow-amber-100 dark:shadow-amber-900/10'
          : tier.popular
          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-xl scale-105'
          : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md'
      }`}
    >
      {/* Top badge */}
      {isBusy && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 rounded-t-2xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="animate-pulse">🔥</span> HIGH DEMAND — Currently at Capacity
        </div>
      )}
      {!isBusy && tier.popular && (
        <div className="bg-blue-600 text-white text-center py-2 rounded-t-2xl text-sm font-bold uppercase tracking-widest">
          {t('pricing.mostPopular')}
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{desc}</p>
        <div className="mb-8">
          <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {tier.priceMax
              ? <>{tier.price} <span className="text-gray-400 dark:text-gray-500 font-normal text-xl">–</span> {tier.priceMax}</>
              : <>{tier.price}<span className="text-2xl">+</span></>}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{tier.billing}</p>
        </div>

        {/* CTA Area — changes based on busy state */}
        {isBusy ? (
          <div className="mb-8">
            {showWaitlist ? (
              <WaitlistForm tier={tier} onClose={() => setShowWaitlist(false)} />
            ) : (
              <div className="space-y-3">
                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 text-sm font-semibold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  We're fully booked right now
                </div>
                <button
                  onClick={() => setShowWaitlist(true)}
                  className="w-full py-3 rounded-xl font-semibold transition-all duration-200 bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30 hover:-translate-y-0.5"
                >
                  🔔 Join Waitlist — Get Notified First
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={`/checkout?plan=${encodeURIComponent(name)}&total=${encodeURIComponent(tier.price)}`}
            className={`w-full block text-center py-3 rounded-xl font-semibold transition-colors duration-200 mb-8 ${
              tier.popular
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t('pricing.getStarted')}
          </Link>
        )}

        <ul className="space-y-4 mt-auto">
          {features.map((feature, i) => (
            <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm">
              <span className={`font-bold shrink-0 ${isBusy ? 'text-amber-500' : 'text-blue-600 dark:text-blue-400'}`}>✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Deal Options (YOU control these — client just feels they chose) ──────────
const DEALS = [
  {
    id: 'upfront3',
    icon: '💰',
    labelKey: 'pricing.deal.upfront3.label',
    tag: 'Save 10%',
    pct: 10,
    descKey: 'pricing.deal.upfront3.desc',
    color: 'from-green-500/10 to-emerald-500/10 border-green-500/30',
    tagColor: 'bg-green-500',
  },
  {
    id: 'upfront6',
    icon: '🚀',
    labelKey: 'pricing.deal.upfront6.label',
    tag: 'Save 15%',
    pct: 15,
    descKey: 'pricing.deal.upfront6.desc',
    color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/30',
    tagColor: 'bg-blue-500',
  },
  {
    id: 'annual',
    icon: '👑',
    labelKey: 'pricing.deal.annual.label',
    tag: 'Save 20%',
    pct: 20,
    descKey: 'pricing.deal.annual.desc',
    color: 'from-purple-500/10 to-violet-500/10 border-purple-500/30',
    tagColor: 'bg-purple-500',
  },
];

// ─── Custom Package Builder ───────────────────────────────────────────────────
const MIN_BUDGET = 500;
const MAX_BUDGET = 150000;

function CustomBuilder({ services }) {
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState({});
  const [budget, setBudget]     = useState(15000);
  const [deal, setDeal]         = useState(null);

  const toggle = (serviceId, optionIdx, price) => {
    setSelected(prev => {
      if (prev[serviceId]?.idx === optionIdx) {
        const next = { ...prev }; delete next[serviceId]; return next;
      }
      const currentTotal = Object.values(prev).reduce((s, v) => s + v.price, 0);
      const prevServicePrice = prev[serviceId]?.price ?? 0;
      const newTotal = currentTotal - prevServicePrice + price;
      if (newTotal > budget) return prev;
      return { ...prev, [serviceId]: { idx: optionIdx, price } };
    });
  };

  const total      = Object.values(selected).reduce((sum, v) => sum + v.price, 0);
  const count      = Object.keys(selected).length;
  const pct        = Math.min((total / budget) * 100, 100);
  const overLimit  = total > budget;
  const activeDeal = DEALS.find(d => d.id === deal);
  const discount   = activeDeal ? Math.round(total * activeDeal.pct / 100) : 0;
  const finalTotal = total - discount;

  const sliderPct = ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;

  return (
    <div className="mt-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
          {t('pricing.builder.tag')}
        </p>
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
          {t('pricing.builder.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('pricing.builder.subtitle')}
        </p>
      </div>

      {/* ── Budget Slider ── */}
      <div className="max-w-2xl mx-auto mb-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('pricing.builder.budget')}</span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {budget.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} <span className="text-sm font-normal">EGP</span>
          </span>
        </div>

        <div className="relative mb-3">
          <input
            type="range"
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={500}
            value={budget}
            onChange={e => {
              const newBudget = Number(e.target.value);
              setBudget(newBudget);
              setSelected(prev => {
                const next = { ...prev };
                let runningTotal = 0;
                for (const key of Object.keys(next)) {
                  if (runningTotal + next[key].price > newBudget) {
                    delete next[key];
                  } else {
                    runningTotal += next[key].price;
                  }
                }
                return next;
              });
            }}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #2563eb ${sliderPct}%, #e5e7eb ${sliderPct}%)`,
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-400 mb-4">
          <span>{MIN_BUDGET.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} EGP</span>
          <span>{MAX_BUDGET.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} EGP</span>
        </div>

        {count > 0 && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500 dark:text-gray-400">{t('pricing.builder.budgetUsed')}</span>
              <span className={`font-semibold ${overLimit ? 'text-red-500' : 'text-green-500'}`}>
                {total.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} / {budget.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} EGP
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${overLimit ? 'bg-red-500' : pct > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Service Cards ── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {services.map((service) => {
          const isSelected = !!selected[service.id];
          const name = service.nameKey ? t(service.nameKey) : service.name;
          const desc = service.descKey ? t(service.descKey) : service.description;
          const isBusy = !!service.busy;
          
          return (
            <div
              key={service.id}
              className={`rounded-2xl border-2 p-6 transition-all duration-200 relative overflow-hidden ${
                isBusy
                  ? 'border-amber-400/60 dark:border-amber-600/50 bg-amber-50/60 dark:bg-amber-900/10'
                  : isSelected
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {isBusy && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-widest text-center py-1 flex items-center justify-center gap-1">
                  <span className="animate-pulse">🔥</span> At Capacity — Join Waitlist
                </div>
              )}
              <div className={`flex items-center gap-3 mb-4 ${isBusy ? 'mt-4' : ''}`}>
                <span className={`text-3xl ${isBusy ? 'grayscale opacity-70' : ''}`}>{service.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              </div>
              {isBusy ? (
                <div className="space-y-2">
                  {service.options.map((opt, idx) => {
                    const label = opt.labelKey ? t(opt.labelKey) : opt.label;
                    return (
                      <div key={idx} className="w-full flex flex-col items-start px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-50 dark:bg-gray-900/60 text-gray-400 dark:text-gray-600 opacity-60 cursor-not-allowed gap-0.5">
                        <span className="flex items-center gap-1.5 w-full justify-between">
                          <span>{label}</span>
                          <span className="text-xs">🔒</span>
                        </span>
                        <span className="text-xs font-semibold text-gray-400">{opt.range}</span>
                      </div>
                    );
                  })}
                  <a href="#pricing-top" className="mt-1 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all">
                    🔔 Join Waitlist
                  </a>
                </div>
              ) : (
                <div className="space-y-2">
                  {service.options.map((opt, idx) => {
                    const active  = selected[service.id]?.idx === idx;
                    const currentTotal = Object.values(selected).reduce((s, v) => s + v.price, 0);
                    const prevPrice    = selected[service.id]?.price ?? 0;
                    const hypothetical = currentTotal - prevPrice + opt.price;
                    const locked = !active && hypothetical > budget;
                    const label = opt.labelKey ? t(opt.labelKey) : opt.label;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => toggle(service.id, idx, opt.price)}
                        disabled={locked}
                        title={locked ? `${t('pricing.builder.overBudget')} ${budget.toLocaleString('en-EG')} EGP` : ''}
                        className={`w-full flex flex-col items-start px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 gap-0.5 ${
                          active
                            ? 'bg-blue-600 text-white'
                            : locked
                            ? 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 w-full justify-between">
                          <span>{label}</span>
                          {locked && <span className="text-xs">🔒</span>}
                        </span>
                        <span className={`text-xs font-semibold ${active ? 'text-blue-100' : locked ? 'text-gray-400' : 'text-blue-600 dark:text-blue-400'}`}>
                          {opt.range}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Unlock a Deal ── */}
      {count > 0 && (
        <div className="my-10 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">{t('pricing.deals.subtitle')}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('pricing.deals.title')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('pricing.deals.desc')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {DEALS.map(d => {
              const isActive = deal === d.id;
              const saving   = Math.round(total * d.pct / 100);
              const label = d.labelKey ? t(d.labelKey) : d.label;
              const desc = d.descKey ? t(d.descKey) : d.description;

              return (
                <button
                  key={d.id}
                  onClick={() => setDeal(prev => prev === d.id ? null : d.id)}
                  className={`relative text-left rounded-2xl border bg-gradient-to-br p-5 transition-all duration-200 ${
                    isActive
                      ? `${d.color} ring-2 ring-offset-2 ring-blue-500 scale-[1.02] shadow-lg`
                      : `${d.color} hover:scale-[1.01] hover:shadow-md`
                  }`}
                >
                  <span className={`absolute top-3 right-3 text-white text-xs font-bold px-2 py-0.5 rounded-full ${d.tagColor}`}>
                    {d.tag}
                  </span>

                  <div className="text-3xl mb-3">{d.icon}</div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{desc}</p>

                  <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl px-3 py-2">
                    <p className="text-xs text-gray-400 line-through">{total.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} EGP</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {(total - saving).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')}
                      <span className="text-sm font-normal text-gray-400"> EGP</span>
                    </p>
                    <p className="text-xs font-semibold text-green-500">{t('pricing.deals.youSave')} {saving.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} EGP 🎉</p>
                  </div>

                  {isActive && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">✓</span>
                      {t('pricing.deals.applied')}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Summary Bar ── */}
      <div className={`sticky bottom-6 transition-all duration-300 ${count > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div>
            <p className="text-gray-400 text-sm">
              {count} {t(count === 1 ? 'pricing.deals.service' : 'pricing.deals.services')} {t('pricing.deals.selected')}
              {activeDeal && <span className="ml-2 text-green-400 font-semibold">{activeDeal.tag} {t('pricing.deals.applied_tag')}</span>}
            </p>
            <div className="flex items-baseline gap-3">
              {activeDeal && (
                <p className="text-xl text-gray-500 line-through">~{total.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')}</p>
              )}
              <p className="text-3xl font-bold">
                ~{finalTotal.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')}
                <span className="text-lg font-normal text-gray-400"> EGP</span>
              </p>
            </div>
            {activeDeal && (
              <p className="text-green-400 text-sm font-medium">{t('pricing.deals.saving')} {discount.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} EGP</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSelected({}); setDeal(null); }}
              className="px-5 py-3 rounded-xl bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors text-sm font-medium"
            >
              {t('pricing.builder.clearAll')}
            </button>
            <Link
              to={`/checkout?plan=Custom Package&total=${finalTotal}`}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
              {t('pricing.builder.bookPackage')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ tagKey, titleKey, subtitleKey, tag, title, subtitle }) {
  const { t } = useLanguage();
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
        {tagKey ? t(tagKey) : tag}
      </p>
      <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
        {titleKey ? t(titleKey) : title}
      </h2>
      {(subtitleKey || subtitle) && (
        <p className="text-gray-600 dark:text-gray-400">
          {subtitleKey ? t(subtitleKey) : subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Pricing() {
  const { t, lang } = useLanguage();
  const [socialTiers, setSocialTiers] = useState(DEFAULT_SOCIAL_TIERS);
  const [webTiers,    setWebTiers]    = useState(DEFAULT_WEB_TIERS);
  const [services,    setServices]    = useState(DEFAULT_SERVICES);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'pricing', 'config'));
        if (snap.exists()) {
          const d = snap.data();
          if (d.socialTiers?.length) setSocialTiers(d.socialTiers);
          if (d.webTiers?.length)    setWebTiers(d.webTiers);
          if (d.services?.length)    setServices(d.services);
        }
      } catch (err) {
        console.warn('Using fallback pricing data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const faqs = [
    { qKey: 'pricing.faq.q1', aKey: 'pricing.faq.a1' },
    { qKey: 'pricing.faq.q2', aKey: 'pricing.faq.a2' },
    { qKey: 'pricing.faq.q3', aKey: 'pricing.faq.a3' },
    { qKey: 'pricing.faq.q4', aKey: 'pricing.faq.a4' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <SEO 
        title="Pricing & Packages" 
        description="Explore our competitive digital marketing and web development packages tailored for the Egyptian market." 
        path="/pricing" 
      />
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
            {t('pricing.tag')}
          </p>
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Social Media Management */}
        <SectionHeader
          tagKey="pricing.social.tag"
          titleKey="pricing.social.title"
          subtitleKey="pricing.social.subtitle"
        />
        <div className="grid md:grid-cols-3 gap-8 items-start mb-24">
          {socialTiers.map((tier, i) => <TierCard key={tier.id || i} tier={tier} />)}
        </div>

        {/* Web Development */}
        <SectionHeader
          tagKey="pricing.web.tag"
          titleKey="pricing.web.title"
          subtitleKey="pricing.web.subtitle"
        />
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {webTiers.map((tier, i) => <TierCard key={tier.id || i} tier={tier} />)}
        </div>

        {/* Dynamic Ad Placement */}
        <AdBanner placement="pricing_top" />

        {/* Custom Builder */}
        <CustomBuilder services={services} />

        {/* FAQ */}
        <div className="mt-24 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('pricing.faq.title')}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t(faq.qKey)}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t(faq.aKey)}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}