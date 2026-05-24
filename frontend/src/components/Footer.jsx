export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 mt-24">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-ink flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-sm bg-canvas" />
          </div>
          <span className="text-sm font-display text-ink">NoiseLens</span>
        </div>
        <p className="text-xs text-muted text-center">
          Analyze manipulation hidden inside internet content.
        </p>
        <p className="text-xs text-muted">
          Built for clarity. Not for clicks.
        </p>
      </div>
    </footer>
  )
}