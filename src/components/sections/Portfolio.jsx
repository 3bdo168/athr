import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
const colorMap = {
  'Social Media': { bg: 'bg-emerald-50', accent: 'text-emerald-700 bg-emerald-100' },
  'Web Design':   { bg: 'bg-violet-50',  accent: 'text-violet-700 bg-violet-100' },
  'Video Editing':{ bg: 'bg-orange-50',  accent: 'text-orange-700 bg-orange-100' },
  'Graphic Design':{ bg: 'bg-rose-50',   accent: 'text-rose-700 bg-rose-100' },
};

export default function Portfolio() {
  const { portfolioItems } = useContext(AdminContext);
  const displayed = portfolioItems.slice(0, 6);

  return (
    <section id="portfolio" className="py-section bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary-600 text-sm font-medium tracking-widest uppercase mb-3">
            Our Work
          </p>
          <h2 className="text-display-lg font-display font-bold text-gray-900">
            Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayed.map(({ id, category, client, title, result, metric, icon }) => {
            const { bg, accent } = colorMap[category] || { bg: 'bg-gray-50', accent: 'text-gray-700 bg-gray-100' };
            return (
              <div
                key={id}
                className={`${bg} rounded-2xl p-7 border border-transparent hover:border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-medium text-gray-500 tracking-wide uppercase">{category}</span>
                  <span className="text-2xl">{icon}</span>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{client}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-5 leading-snug">{title}</h3>
                <div className="space-y-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${accent}`}>
                    📈 {result}
                  </div>
                  <p className="text-sm text-gray-500 pl-1">{metric}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}