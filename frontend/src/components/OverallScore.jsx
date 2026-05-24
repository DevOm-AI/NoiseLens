import { motion } from 'framer-motion'
import { getScoreColor, getScoreLabel } from '../utils/scores'

export default function OverallScore({ score }) {
  const color = getScoreColor(score)
  const label = getScoreLabel(score)

  // Circular arc math
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-surface rounded-2xl p-8 border border-border shadow-panel flex flex-col items-center text-center"
    >
      <p className="text-xs text-muted uppercase tracking-widest font-mono mb-6">Overall Manipulation Score</p>

      {/* Circular score */}
      <div className="relative w-28 h-28 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="#EBEBEB"
            strokeWidth="5"
          />
          {/* Score arc */}
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-semibold font-mono text-ink"
          >
            {score}
          </motion.span>
        </div>
      </div>

      <div
        className="text-sm font-medium px-3 py-1 rounded-full"
        style={{
          backgroundColor: `${color}18`,
          color: color,
        }}
      >
        {label} Manipulation
      </div>
    </motion.div>
  )
}