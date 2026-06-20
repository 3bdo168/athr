import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const categories = ['All', 'Social Media', 'Web Design', 'Video Editing', 'Graphic Design'];

const DEFAULT_PROJECTS = [
  { id: 1,  category: 'Social Media',   client: 'GreenLeaf',  title: 'Instagram Growth Campaign', result: '50K New Followers',      metric: '+340% Engagement',       color: 'from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20', accent: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/60', icon: '📱' },
  { id: 2,  category: 'Social Media',   client: 'FitCore',    title: 'TikTok Brand Launch',       result: '2M+ Views',              metric: '10K Followers in 30 days', color: 'from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/20',       accent: 'text-pink-700 bg-pink-100 dark:text-pink-300 dark:bg-pink-900/60',           icon: '🎵' },
  { id: 3,  category: 'Social Media',   client: 'Luxe Living',title: 'LinkedIn B2B Strategy',     result: '300% More Leads',        metric: '+180% Profile Views',    color: 'from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20',       accent: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/60',           icon: '💼' },
  { id: 4,  category: 'Web Design',     client: 'NovaTech',   title: 'SaaS Landing Page',         result: '150% Conversion Boost',  metric: '4.2s → 1.1s Load Time', color: 'from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-violet-900/20',   accent: 'text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-900/60',   icon: '🌐' },
  { id: 5,  category: 'Web Design',     client: 'Orion Labs', title: 'E-Commerce Platform',       result: '$200K Month 1 Revenue',  metric: '90+ Lighthouse Score',   color: 'from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20',   accent: 'text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/60',   icon: '🛒' },
  { id: 6,  category: 'Web Design',     client: 'GreenLeaf',  title: 'Portfolio Website',         result: '3× More Inquiries',      metric: 'Mobile-First Design',    color: 'from-teal-50 to-teal-100 dark:from-teal-950/40 dark:to-teal-900/20',       accent: 'text-teal-700 bg-teal-100 dark:text-teal-300 dark:bg-teal-900/60',           icon: '💻' },
  { id: 7,  category: 'Video Editing',  client: 'FitCore',    title: 'Product Launch Video',      result: '500K YouTube Views',     metric: '8.5% Click-Through Rate',color: 'from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20',   accent: 'text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/60',   icon: '🎬' },
  { id: 8,  category: 'Video Editing',  client: 'NovaTech',   title: 'Brand Story Series',        result: '1.2M Total Views',       metric: '45% Watch Rate',         color: 'from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20',               accent: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/60',               icon: '🎥' },
  { id: 9,  category: 'Video Editing',  client: 'Luxe Living',title: 'Instagram Reels Pack',      result: '2.3M Reel Plays',        metric: '12× Organic Reach',      color: 'from-yellow-50 to-yellow-100 dark:from-yellow-950/40 dark:to-yellow-900/20',   accent: 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/60',   icon: '✨' },
  { id: 10, category: 'Graphic Design', client: 'Orion Labs', title: 'Complete Brand Identity',   result: 'Full Rebrand',           metric: '40% Brand Recognition ↑',color: 'from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/20',       accent: 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/60',           icon: '🎨' },
  { id: 11, category: 'Graphic Design', client: 'GreenLeaf',  title: 'Social Media Templates',    result: '60 Custom Designs',      metric: 'Used Across 4 Platforms',color: 'from-lime-50 to-lime-100 dark:from-lime-950/40 dark:to-lime-900/20',       accent: 'text-lime-700 bg-lime-100 dark:text-lime-300 dark:bg-lime-900/60',           icon: '🖼️' },
  { id: 12, category: 'Graphic Design', client: 'FitCore',    title: 'Campaign Poster Series',    result: '25 Event Posters',       metric: 'Print + Digital Ready',  color: 'from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20',     accent: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/60',       icon: '📋' },
];

const serviceLinks = {
  'Social Media': '/services/social-media',
  'Web Design': '/services/web-design',
  'Video Editing': '/services/video-editing',
  'Graphic Design': '/services/posters',
};

export default function PortfolioPage() {
  const [active, setActive]     = useState('All');
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading]   = useState(true);
  const { t } = useLanguage();

  const categories = [
    { key: 'All',            label: t('portfolio.all') },
    { key: 'Social Media',   label: t('portfolio.socialMedia') },
    { key: 'Web Design',     label: t('portfolio.webDesign') },
    { key: 'Video Editing',  label: t('portfolio.videoEditing') },
    { key: 'Graphic Design', label: t('portfolio.graphicDesign') },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'portfolioItems'));
        if (!querySnapshot.empty) {
          const fetched = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Basic color logic if missing from DB
            color: doc.data().color || 'from-gray-50 to-gray-100 dark:from-gray-950/40 dark:to-gray-900/20',
            accent: doc.data().accent || 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/60'
          }));
          setProjects(fetched);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <SEO 
        title="Our Portfolio" 
        description="Browse Ather Agency's successful digital marketing and web design projects." 
        path="/portfolio" 
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4"
          >
            {t('portfolio.tag')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black text-gray-900 dark:text-white mb-6"
          >
            {t('portfolio.title')}
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {t('portfolio.subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              data-cursor="CLICK"
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                active === key
                  ? 'text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-750'
              }`}
            >
              {active === key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {label}
                {key !== 'All' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    active === key
                      ? 'bg-blue-500 text-blue-100'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {projects.filter(p => p.category === key).length}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Service CTA Banner */}
        <AnimatePresence mode="wait">
          {active !== 'All' && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: -20, marginBottom: 40 }}
              exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-[1px]">
                 <div className="bg-white dark:bg-gray-900 rounded-[15px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl">
                      {active === 'Social Media' ? '📱' : active === 'Web Design' ? '🌐' : active === 'Video Editing' ? '🎬' : '🎨'}
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {t('portfolio.needResults')} <span className="font-bold text-blue-600 dark:text-blue-400">{active}</span>?
                    </p>
                  </div>
                  <Link
                    to={serviceLinks[active]}
                    className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg shrink-0"
                  >
                    {t('portfolio.viewPackages')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/portfolio/${item.id}`}
                  data-cursor="VIEW"
                  className={`group relative bg-gradient-to-br ${item.color} rounded-3xl p-8 border border-transparent
                              hover:border-white/50 dark:hover:border-white/10
                              hover:shadow-2xl transition-all duration-500 h-full flex flex-col block`}
                >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-black text-gray-500/80 dark:text-gray-400/80 tracking-[0.2em] uppercase">
                    {item.category}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white/40 dark:bg-black/20 flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>

                <div className="mb-8 flex-1">
                  <p className="text-[11px] font-bold text-blue-600/60 dark:text-blue-400/60 uppercase tracking-widest mb-2">
                    {item.client}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold shadow-sm ${item.accent}`}>
                    📈 {item.result}
                  </div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 pl-1">
                    {item.metric}
                  </p>
                </div>

                {/* View Case Study hint */}
                <div className="mt-6 flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs font-semibold
                                group-hover:text-blue-500 transition-colors duration-200">
                  View Case Study
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative overflow-hidden bg-gray-900 dark:bg-gray-800 rounded-[3rem] p-12 lg:p-20 text-center"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">
              {t('portfolio.ctaTitle')} <br /><span className="text-blue-400">{t('portfolio.ctaHighlight')}</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              {t('portfolio.ctaSubtitle')}
            </p>
            <Link
              to="/contact"
              data-cursor="LET'S GO"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:translate-y-0"
            >
              {t('portfolio.startProject')} <span className="text-xl">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}