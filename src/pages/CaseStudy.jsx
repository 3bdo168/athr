import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

// Fallback data for default projects (same as before)
const DEFAULT_PROJECTS = {
  1:  { category: 'Social Media',   client: 'GreenLeaf',  title: 'Instagram Growth Campaign', result: '50K New Followers',      metric: '+340% Engagement',        icon: '📱', challenge: 'GreenLeaf had minimal social media presence with low engagement and inconsistent posting.', solution: 'We developed a comprehensive content strategy with daily stories, reels, and data-driven hashtag optimization to boost organic reach.', description: 'A full-scale Instagram growth campaign that transformed GreenLeaf from an unknown brand into a social media powerhouse.' },
  2:  { category: 'Social Media',   client: 'FitCore',    title: 'TikTok Brand Launch',       result: '2M+ Views',              metric: '10K Followers in 30 days', icon: '🎵', challenge: 'FitCore needed to establish a TikTok presence from zero to compete with viral fitness brands.', solution: 'Created trending fitness content with viral hooks, challenges, and influencer collaborations.', description: 'Launching FitCore on TikTok with viral content strategies.' },
  3:  { category: 'Social Media',   client: 'Luxe Living', title: 'LinkedIn B2B Strategy',    result: '300% More Leads',        metric: '+180% Profile Views',     icon: '💼', challenge: 'Luxe Living struggled to generate qualified B2B leads through traditional channels.', solution: 'Implemented thought leadership content, strategic networking, and LinkedIn Ads targeting decision-makers.', description: 'B2B lead generation through strategic LinkedIn presence.' },
  4:  { category: 'Web Design',     client: 'NovaTech',   title: 'SaaS Landing Page',         result: '150% Conversion Boost',  metric: '4.2s → 1.1s Load Time',  icon: '🌐', challenge: 'NovaTech\'s existing landing page had poor conversion rates and slow load times.', solution: 'Redesigned with conversion-optimized layout, micro-animations, and performance optimization.', description: 'A high-converting SaaS landing page built for speed and conversions.' },
  5:  { category: 'Web Design',     client: 'Orion Labs', title: 'E-Commerce Platform',       result: '$200K Month 1 Revenue',  metric: '90+ Lighthouse Score',    icon: '🛒', challenge: 'Orion Labs needed a scalable e-commerce solution for their product line.', solution: 'Built a custom React-based platform with optimized checkout, lazy loading, and mobile-first design.', description: 'Full e-commerce platform with premium UX and blazing performance.' },
  6:  { category: 'Web Design',     client: 'GreenLeaf',  title: 'Portfolio Website',         result: '3× More Inquiries',      metric: 'Mobile-First Design',     icon: '💻', challenge: 'GreenLeaf\'s old website was outdated and not mobile-friendly.', solution: 'Created a modern, responsive portfolio with smooth animations and clear call-to-actions.', description: 'Modern portfolio website that generates leads.' },
  7:  { category: 'Video Editing',  client: 'FitCore',    title: 'Product Launch Video',      result: '500K YouTube Views',     metric: '8.5% Click-Through Rate', icon: '🎬', challenge: 'FitCore needed a compelling video to launch their new product line.', solution: 'Produced a cinematic product video with dynamic transitions, motion graphics, and professional sound design.', description: 'A cinematic product launch video that drove viral engagement.' },
  8:  { category: 'Video Editing',  client: 'NovaTech',   title: 'Brand Story Series',        result: '1.2M Total Views',       metric: '45% Watch Rate',          icon: '🎥', challenge: 'NovaTech wanted to humanize their brand through storytelling.', solution: 'Created a 5-part brand documentary series with interviews, behind-the-scenes footage, and emotional storytelling.', description: 'Brand storytelling through documentary-style video series.' },
  9:  { category: 'Video Editing',  client: 'Luxe Living', title: 'Instagram Reels Pack',     result: '2.3M Reel Plays',        metric: '12× Organic Reach',       icon: '✨', challenge: 'Luxe Living needed scroll-stopping content for Instagram Reels.', solution: 'Designed a pack of 30 trend-based reels with professional editing, captions, and music.', description: 'High-performing Instagram Reels pack for maximum reach.' },
  10: { category: 'Graphic Design', client: 'Orion Labs', title: 'Complete Brand Identity',   result: 'Full Rebrand',           metric: '40% Brand Recognition ↑', icon: '🎨', challenge: 'Orion Labs needed a complete brand overhaul to appeal to a younger audience.', solution: 'Developed a new brand identity including logo, color palette, typography, and brand guidelines.', description: 'A complete brand identity transformation.' },
  11: { category: 'Graphic Design', client: 'GreenLeaf',  title: 'Social Media Templates',    result: '60 Custom Designs',      metric: 'Used Across 4 Platforms', icon: '🖼️', challenge: 'GreenLeaf needed consistent visual content across multiple platforms.', solution: 'Created 60 branded templates for Instagram, Facebook, LinkedIn, and Twitter.', description: 'Cross-platform social media template system.' },
  12: { category: 'Graphic Design', client: 'FitCore',    title: 'Campaign Poster Series',    result: '25 Event Posters',       metric: 'Print + Digital Ready',   icon: '📋', challenge: 'FitCore ran frequent events but lacked cohesive visual marketing materials.', solution: 'Designed 25 event posters with consistent branding, ready for both print and digital distribution.', description: 'Event poster series for fitness brand campaigns.' },
};

const categoryColors = {
  'Social Media':   { bg: 'from-blue-600 to-indigo-600',   light: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  'Web Design':     { bg: 'from-emerald-600 to-teal-600',  light: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  'Video Editing':  { bg: 'from-purple-600 to-pink-600',   light: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  'Graphic Design': { bg: 'from-orange-600 to-amber-600',  light: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
};

function CaseStudySkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 animate-pulse">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-full mb-6" />
        <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-8" />
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const { projectId } = useParams();
  const { t } = useLanguage();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll animations for parralax effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'portfolioItems', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          const fallback = DEFAULT_PROJECTS[projectId];
          if (fallback) setProject({ id: projectId, ...fallback });
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        const fallback = DEFAULT_PROJECTS[projectId];
        if (fallback) setProject({ id: projectId, ...fallback });
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0); // Scroll to top on mount
  }, [projectId]);

  if (loading) return <CaseStudySkeleton />;

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-6xl mb-6">🔍</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('caseStudy.notFound')}</h2>
          <Link to="/portfolio" className="text-blue-600 font-semibold hover:underline">{t('caseStudy.backBtn')}</Link>
        </div>
      </div>
    );
  }

  const colors = categoryColors[project.category] || categoryColors['Social Media'];
  const images = project.images || [];
  const heroImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=900&fit=crop';

  return (
    <>
      <SEO title={`${project.title} - Case Study`} description={project.description} image={heroImage} />
      
      <div className="min-h-screen bg-white dark:bg-gray-950 selection:bg-blue-500/30">
        
        {/* Elite Parallax Hero Section */}
        <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-end">
          <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gray-900/40 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent z-20" />
            <img src={heroImage} alt={project.title} className="w-full h-full object-cover scale-105" />
          </motion.div>

          <motion.div 
            style={{ opacity: opacity1 }}
            className="relative z-30 w-full max-w-7xl mx-auto px-6 pb-24"
          >
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-8 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> {t('caseStudy.backBtn')}
              </Link>
              <br/>
              <motion.span variants={fadeUp} className={`inline-block text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 bg-white/10 text-white backdrop-blur-md`}>
                {project.category}
              </motion.span>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-[1.1] tracking-tight">
                {project.title}
              </motion.h1>
              <motion.div variants={fadeUp} className="flex items-center gap-6 text-gray-300">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Client</span>
                  <span className="text-lg font-medium text-white">{project.client}</span>
                </div>
                {project.result && (
                  <>
                    <div className="w-px h-8 bg-gray-700" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Outcome</span>
                      <span className="text-lg font-medium text-emerald-400">{project.result}</span>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative z-40 bg-white dark:bg-gray-950 -mt-8 rounded-t-[3rem]">
          <div className="max-w-5xl mx-auto px-6 py-24">
            
            {/* The Story Header */}
            {project.description && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                className="text-2xl md:text-4xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-24 max-w-4xl"
              >
                "{project.description}"
              </motion.div>
            )}

            {/* Challenge & Solution Grid */}
            <div className="grid md:grid-cols-2 gap-12 mb-24">
              {project.challenge && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-xl shadow-inner border border-gray-200 dark:border-gray-800">
                      🎯
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('caseStudy.challenge')}</h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">{project.challenge}</p>
                </motion.div>
              )}
              {project.solution && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shadow-inner border border-blue-100 dark:border-blue-800/30">
                      💡
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('caseStudy.solution')}</h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">{project.solution}</p>
                </motion.div>
              )}
            </div>

            {/* Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className={`bg-gradient-to-br ${colors.bg} rounded-[2rem] p-12 mb-24 text-white shadow-2xl relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <p className="text-xs font-black text-white/50 uppercase tracking-[0.3em] mb-8 relative z-10">{t('caseStudy.results')}</p>
              
              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div>
                  <div className="text-6xl md:text-8xl font-black tracking-tighter mb-4">{project.metric || '+100%'}</div>
                  <p className="text-xl text-white/80 font-medium">Key Performance Indicator achieved in record time.</p>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="text-3xl md:text-5xl font-bold tracking-tight mb-3">{project.result}</div>
                  <div className="w-12 h-1 bg-white/30 rounded-full mb-4" />
                  <p className="text-white/70">Primary business impact driving revenue and engagement for {project.client}.</p>
                </div>
              </div>
            </motion.div>

            {/* Gallery Details */}
            {images.length > 1 && (
              <div className="mb-24 space-y-32">
                <div className="text-center">
                  <span className="block w-px h-24 bg-gray-200 dark:bg-gray-800 mx-auto mb-8"></span>
                  <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">{t('caseStudy.gallery')}</h2>
                </div>
                
                {images.slice(1).map((url, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                    className="relative rounded-[2rem] overflow-hidden shadow-2xl group border border-gray-100 dark:border-gray-800"
                  >
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                      src={url}
                      alt={`Project showcase ${i + 1}`}
                      className="w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Final Call to Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="mt-24 text-center border-t border-gray-100 dark:border-gray-800 pt-24"
            >
              <h3 className="text-4xl md:text-5xl font-display font-black text-gray-900 dark:text-white mb-6">Want similar results?</h3>
              <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Let's craft a digital strategy tailored exactly to your brand's ambitious goals.</p>
              
              <Link
                to="/pricing"
                data-cursor="GO"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-10 py-5 rounded-2xl transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:-translate-y-1"
              >
                {t('caseStudy.ctaBtn')} 
                <span className="text-xl">→</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}
