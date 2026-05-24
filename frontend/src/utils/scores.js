/**
 * Returns a CSS color value based on a 0-100 score.
 * Low = calm green, Mid = amber, High = alert red.
 */
export function getScoreColor(score) {
  if (score <= 30) return '#4CAF82'   // calm green
  if (score <= 60) return '#E8A838'   // amber
  if (score <= 80) return '#E06B3A'   // orange
  return '#C94040'                     // red
}

/**
 * Returns a label for a score.
 */
export function getScoreLabel(score) {
  if (score <= 20) return 'Minimal'
  if (score <= 40) return 'Low'
  if (score <= 60) return 'Moderate'
  if (score <= 80) return 'Significant'
  return 'Severe'
}

/**
 * Returns a background class for a score badge.
 */
export function getScoreBadgeStyle(score) {
  if (score <= 30) return { background: '#F0FAF5', color: '#2D7A57' }
  if (score <= 60) return { background: '#FDF6E9', color: '#A06B10' }
  if (score <= 80) return { background: '#FDF1EA', color: '#A04010' }
  return { background: '#FDF0F0', color: '#902020' }
}