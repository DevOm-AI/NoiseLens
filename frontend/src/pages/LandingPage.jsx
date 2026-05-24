import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ScanText, Brain, Zap, Shield, BarChart2, Eye } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const FEATURES = [
  {
    icon: Brain,
    title: 'Psychological Profiling',
    description: 'Identifies 9 distinct manipulation vectors including fear exploitation, outrage engineering, and tribal framing.'
  },
  {
    icon: BarChart2,
    title: 'Calibrated Scoring',
    description: 'Each metric is scored 0–100 with forensic neutrality. No inflation. No false alarms.'
  },
  {
    icon: Eye,
    title: 'Trigger Phrase Detection',
    description: 'Pinpoints the exact phrases doing the manipulative heavy lifting inside any piece of content.'
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description: 'Results in seconds. Powered by a large language model tuned for analytical forensics.'
  },
  {
    icon: Shield,
    title: 'Neutral & Non-Judgmental',
    description: 'NoiseLens does not moralize. It observes, measures, and reports — nothing more.'
  },
  {
    icon: ScanText,
    title: 'Multi-Format Support',
    description: 'Works on headlines, tweets, YouTube titles, LinkedIn posts, reel captions, and any short-form content.'
  },
]

const EXAMPLES = [
  {
    text: '"AI WILL REPLACE ALL DEVELOPERS IN 6 MONTHS — Here\'s How To Survive"',
    tactics: ['Fear Appeal', 'False Urgency', 'Sensationalism'],
    score: 81,
  },
  {
    text: '"Nobody talks about this secret strategy that made me $40k in a weekend"',
    tactics: ['Curiosity Gap', 'Authority Simulation', 'Clickbait'],
    score: 77,
  },
  {
    text: '"The disturbing truth about what they\'re putting in your food right now"',
    tactics: ['Fear Exploitation', 'Outrage Engineering', 'Vague Threat'],
    score: 85,
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs text-dim font-mono mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Forensic content analysis — now available
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-5xl sm:text-6xl md:text-7xl text-ink leading-[1.05] tracking-tight mb-6"
          >
            See the mechanics
            <br />
            <span className="italic text-dim">behind the manipulation.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-lg text-dim max-w-xl mx-auto leading-relaxed mb-10"
          >
            NoiseLens analyzes internet content for emotional manipulation, attention engineering,
            and psychological pressure tactics — with clinical precision.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/analyze')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-canvas rounded-full text-sm font-medium hover:bg-ink/85 transition-colors"
            >
              Analyze Content
              <ArrowRight size={15} />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface text-dim rounded-full text-sm border border-border hover:text-ink hover:border-ink/20 transition-colors"
            >
              See how it works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Example analysis cards */}
      <section className="py-16 px-6 bg-subtle border-y border-border">
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp()} className="text-xs text-muted font-mono uppercase tracking-widest text-center mb-8">
            Example analyses
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXAMPLES.map((ex, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-surface rounded-xl p-5 border border-border shadow-card"
              >
                <p className="text-sm text-ink font-medium leading-snug mb-4">
                  {ex.text}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ex.tactics.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-subtle border border-border text-dim">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted font-mono">Manipulation Score</span>
                  <span
                    className="text-sm font-mono font-semibold"
                    style={{ color: ex.score > 75 ? '#C94040' : '#E8A838' }}
                  >
                    {ex.score}/100
                  </span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${ex.score}%`,
                      backgroundColor: ex.score > 75 ? '#C94040' : '#E8A838'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs text-muted font-mono uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink tracking-tight">
              Built for clarity,<br />
              <span className="italic text-dim">not comfort.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.08)}
                className="bg-surface rounded-xl p-6 border border-border shadow-card"
              >
                <div className="w-8 h-8 rounded-lg bg-subtle border border-border flex items-center justify-center mb-4">
                  <f.icon size={16} className="text-dim" />
                </div>
                <h3 className="font-medium text-ink text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-dim leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-subtle border-y border-border">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs text-muted font-mono uppercase tracking-widest mb-3">Process</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink tracking-tight">
              How NoiseLens works
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Paste your content',
                desc: 'Drop in any short-form internet content — a tweet, headline, YouTube title, LinkedIn post, or viral caption.',
              },
              {
                step: '02',
                title: 'AI forensic analysis',
                desc: 'Our LLM-powered analyzer examines the content across 9 psychological manipulation vectors with calibrated neutrality.',
              },
              {
                step: '03',
                title: 'Receive your report',
                desc: 'Scores, detected tactics, trigger phrases, and a forensic summary — all returned in seconds.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                {...fadeUp(i * 0.1)}
                className="flex gap-6 bg-surface rounded-xl p-6 border border-border shadow-card"
              >
                <span className="font-mono text-sm text-muted flex-shrink-0 pt-0.5">{item.step}</span>
                <div>
                  <h3 className="font-medium text-ink text-sm mb-1.5">{item.title}</h3>
                  <p className="text-xs text-dim leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.4)} className="text-center mt-12">
            <button
              onClick={() => navigate('/analyze')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-canvas rounded-full text-sm font-medium hover:bg-ink/85 transition-colors"
            >
              Run your first analysis
              <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}