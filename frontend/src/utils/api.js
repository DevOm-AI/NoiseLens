const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Analyze content for psychological manipulation tactics.
 * @param {string} text - The content to analyze
 * @returns {Promise<object>} - Structured analysis result
 */
export async function analyzeContent(text) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000) // 30s timeout

  try {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || `Server error: ${response.status}`)
    }

    return data
  } catch (err) {
    clearTimeout(timeout)
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. The analysis took too long — please try again.')
    }
    throw err
  }
}