import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
}

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          className="flex-1"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}