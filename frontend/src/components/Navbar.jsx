import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const location = useLocation()
  const isAnalyzer = location.pathname === '/analyze'

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-canvas/80 backdrop-blur-md border-b border-border"
    >
      <Link to="/" className="flex items-center gap-2 group">
        {/* Logo mark */}
        <div className="w-6 h-6 rounded-md bg-ink flex items-center justify-center">
          <div className="w-2 h-2 rounded-sm bg-canvas opacity-90" />
        </div>
        <span className="font-display text-ink text-lg tracking-tight">NoiseLens</span>
      </Link>

      <nav className="flex items-center gap-6">
        {!isAnalyzer && (
          <>
            <a href="#features" className="text-sm text-dim hover:text-ink transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-dim hover:text-ink transition-colors">How it works</a>
          </>
        )}
        <Link
          to="/analyze"
          className="text-sm px-4 py-1.5 rounded-full bg-ink text-canvas hover:bg-ink/80 transition-colors font-medium"
        >
          Try it
        </Link>
      </nav>
    </motion.header>
  )
}