import { motion } from 'framer-motion'

export default function TacticTag({ label, index = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-subtle border border-border text-xs font-medium text-dim"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-ink/30 flex-shrink-0" />
      {label}
    </motion.span>
  )
}