import { AlertTriangle, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ErrorBanner({ message, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700"
    >
      <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
      <p className="text-sm flex-1">{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
          <X size={14} />
        </button>
      )}
    </motion.div>
  )
}