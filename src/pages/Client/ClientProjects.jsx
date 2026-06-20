import { motion } from 'framer-motion';

export default function ClientProjects() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-blue-500 font-black uppercase tracking-[0.2em] text-xs mb-3">
            <span className="w-8 h-[2px] bg-blue-600" />
            Your Projects
            <span className="w-8 h-[2px] bg-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Projects Overview</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Track the status of your ongoing and completed projects with our team.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-[2rem] border border-gray-800/60 p-16 shadow-2xl mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="w-24 h-24 bg-gray-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner border border-gray-700/50">
            🚧
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
          <p className="text-gray-400">
            We are working hard to bring this feature to you. Soon you'll be able to view all your project details right here.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
