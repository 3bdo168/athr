import { motion } from 'framer-motion';

export default function ClientAssets() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-emerald-500 font-black uppercase tracking-[0.2em] text-xs mb-3">
            <span className="w-8 h-[2px] bg-emerald-600" />
            Your Assets
            <span className="w-8 h-[2px] bg-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Digital Assets & Files</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Access and download your project deliverables securely in one place.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-[2rem] border border-gray-800/60 p-16 shadow-2xl mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="w-24 h-24 bg-gray-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner border border-gray-700/50">
            📦
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
          <p className="text-gray-400">
            We are working hard to bring this feature to you. Soon you'll be able to download your assets directly from here.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
