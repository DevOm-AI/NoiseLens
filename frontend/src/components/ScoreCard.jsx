import { motion } from 'framer-motion'
import { getScoreColor, getScoreLabel, getScoreBadgeStyle } from '../utils/scores'

export default function ScoreCard({ label, score, description, delay = 0 }) {
  const color = getScoreColor(score)
  const label_ = getScoreLabel(score)
  const badgeStyle = getScoreBadgeStyle(score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="bg-surface rounded-xl p-5 border border-border shadow-card"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-muted uppercase tracking-widest font-mono mb-0.5">{label}</p>
          {description && <p className="text-xs text-dim mt-0.5 leading-relaxed">{description}</p>}
        </div>
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={badgeStyle}
          >
            {label_}
          </span>
          <span className="font-mono text-sm font-medium text-ink">{score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-border overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  )
}