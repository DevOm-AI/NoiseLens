import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ScanText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { analyzeContent } from '../utils/api'
import Navbar from '../components/Navbar'
import ScoreCard from '../components/ScoreCard'
import OverallScore from '../components/OverallScore'
import TacticTag from '../components/TacticTag'
import Spinner from '../components/Spinner'
import ErrorBanner from '../components/ErrorBanner'

const PLACEHOLDERS = [
  'AI WILL REPLACE ALL DEVELOPERS IN 6 MONTHS',
  'You won\'t believe what happened next...',
  'Nobody talks about this secret the elites don\'t want you to know',
  'I lost everything. Here\'s what I learned.',
  '10 signs you\'re being manipulated RIGHT NOW (thread)',
]

const SCORE_CARDS = [
  {
    key: 'information_density_score',
    label: 'Information Density',
    description: 'Ratio of actual information to emotional filler',
  },
  {
    key: 'emotional_pressure_score',
    label: 'Emotional Pressure',
    description: 'Degree to which emotions are leveraged to bypass reason',
  },
  {
    key: 'clickbait_score',
    label: 'Clickbait Intensity',
    description: 'Structural tricks designed to compel engagement',
  },
  {
    key: 'fear_exploitation_score',
    label: 'Fear Exploitation',
    description: 'Leveraging fear of loss, threat, or exclusion',
  },
  {
    key: 'sensationalism_score',
    label: 'Sensationalism',
    description: 'Exaggeration of significance beyond available evidence',
  },
]

export default function AnalyzerPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeContent(text)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleAnalyze()
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setText('')
  }

  const charCount = text.length
  const overLimit = charCount > 5000

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-dim transition-colors"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl text-ink tracking-tight mb-2">
            Content Analyzer
          </h1>
          <p className="text-sm text-dim">
            Paste any internet content — a headline, tweet, caption, or post — and receive a forensic manipulation report.
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4"
        >
          <div className={`relative rounded-xl border shadow-card bg-surface transition-colors ${overLimit ? 'border-red-200' : 'border-border focus-within:border-ink/20'}`}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Try: "${PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]}"`}
              rows={5}
              disabled={loading}
              className="w-full px-5 py-4 text-sm text-ink placeholder:text-muted bg-transparent rounded-xl resize-none focus:outline-none disabled:opacity-50 leading-relaxed"
            />
            <div className="px-5 py-3 border-t border-border flex items-center justify-between">
              <span className={`text-xs font-mono ${overLimit ? 'text-red-400' : 'text-muted'}`}>
                {charCount} / 5000
              </span>
              <span className="text-xs text-muted">⌘ + Enter to analyze</span>
            </div>
          </div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <div className="mb-4">
              <ErrorBanner message={error} onDismiss={() => setError(null)} />
            </div>
          )}
        </AnimatePresence>

        {/* Analyze button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-3 mb-12"
        >
          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim() || overLimit}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-canvas rounded-full text-sm font-medium hover:bg-ink/85 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Spinner size={16} />
                Analyzing...
              </>
            ) : (
              <>
                <ScanText size={15} />
                Analyze Manipulation
              </>
            )}
          </button>

          {result && !loading && (
            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-full border border-border text-sm text-dim hover:text-ink hover:border-ink/20 transition-colors"
            >
              Reset
            </button>
          )}
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex flex-col items-center gap-4">
                <Spinner size={28} />
                <div className="space-y-1">
                  <p className="text-sm text-dim">Running forensic analysis...</p>
                  <p className="text-xs text-muted">Examining manipulation vectors</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted font-mono uppercase tracking-widest">Analysis Report</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Overall score */}
              <OverallScore score={result.overall_manipulation_score} />

              {/* Individual scores grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SCORE_CARDS.map((card, i) => (
                  <ScoreCard
                    key={card.key}
                    label={card.label}
                    score={result[card.key]}
                    description={card.description}
                    delay={i * 0.06}
                  />
                ))}
              </div>

              {/* Detected tactics */}
              {result.detected_tactics && result.detected_tactics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-surface rounded-xl p-5 border border-border shadow-card"
                >
                  <p className="text-xs text-muted uppercase tracking-widest font-mono mb-4">
                    Detected Tactics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.detected_tactics.map((tactic, i) => (
                      <TacticTag key={tactic} label={tactic} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Trigger phrases */}
              {result.trigger_phrases && result.trigger_phrases.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-surface rounded-xl p-5 border border-border shadow-card"
                >
                  <p className="text-xs text-muted uppercase tracking-widest font-mono mb-4">
                    Trigger Phrases
                  </p>
                  <div className="space-y-2">
                    {result.trigger_phrases.map((phrase, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-muted text-xs font-mono mt-0.5 flex-shrink-0">→</span>
                        <span className="text-sm text-ink font-mono bg-subtle px-2.5 py-1 rounded-md border border-border">
                          "{phrase}"
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Analysis summary */}
              {result.analysis_summary && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-surface rounded-xl p-5 border border-border shadow-card"
                >
                  <p className="text-xs text-muted uppercase tracking-widest font-mono mb-3">
                    Forensic Summary
                  </p>
                  <p className="text-sm text-dim leading-relaxed">
                    {result.analysis_summary}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}