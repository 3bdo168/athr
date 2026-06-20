import { useContext } from 'react';
import { motion } from 'framer-motion';
import { AdminContext } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Testimonials() {
  const { testimonials } = useContext(AdminContext);
  const { t } = useLanguage();
  const activeTestimonials = testimonials.filter(t2 => t2.status === 'Active');

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center max-w-lg mx-auto mb-14"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-primary-600 dark:text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
            {t('testimonials.tag')}
          </motion.p>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
            className="font-display font-bold text-gray-900 dark:text-white text-[clamp(1.8rem,4vw,2.8rem)] leading-tight tracking-tight">
            {t('testimonials.title')}
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-5"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        >
          {activeTestimonials.map(({ id, name, role, avatar, text }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-7
                         border border-gray-100 dark:border-gray-700
                         shadow-card hover:shadow-card-hover hover:-translate-y-1
                         transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-0.5 mb-5">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-6">"{text}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-gray-700">
                <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-blue-900/40 text-primary-700 dark:text-blue-300 flex items-center justify-center text-[11px] font-bold shrink-0">
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none mb-1">{name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}