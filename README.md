# NoiseLens

> **Analyze manipulation hidden inside internet content.**

NoiseLens is a full-stack forensic content analysis tool that deconstructs psychological manipulation tactics embedded in online content — tweets, headlines, YouTube titles, LinkedIn posts, reel captions, and viral short-form media.

It does not moralize. It does not judge. It measures.

---

## Live Demo

> Coming soon — deploy instructions below.

---

## What It Does

Most people consume internet content without recognizing the engineering behind it. Every viral post, every outrage headline, every "you won't believe this" caption is constructed — deliberately or instinctively — to exploit known psychological vulnerabilities.

NoiseLens runs any piece of text through a forensic AI pipeline and returns:

- **Quantified manipulation scores** across 6 dimensions
- **Detected psychological tactics** (e.g. Curiosity Gap, Fear Appeal, Tribal Framing)
- **Trigger phrases** — the exact words doing the manipulative work
- **A forensic summary** written with clinical neutrality

This is not a fact-checker. NoiseLens identifies *structural manipulation* — the mechanics of how content is engineered to bypass rational thought — independent of whether the underlying claim is true or false.

---

## Screenshots

| Landing Page | Analyzer | Results |
|---|---|---|
| Clean hero with example analysis cards | Textarea input with char counter | Circular gauge, score cards, trigger phrases |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, TailwindCSS, Framer Motion, Lucide Icons |
| **Backend** | Python 3.10+, FastAPI, Uvicorn |
| **AI Engine** | Groq API — `llama-3.3-70b-versatile` |
| **Fonts** | Instrument Serif (display), DM Sans (body), DM Mono (data) |
| **Routing** | React Router v6 |
| **HTTP** | Fetch API with AbortController (30s timeout) |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                                                         │
│   React SPA (Vite)                                      │
│   ├── LandingPage     — hero, features, how-it-works    │
│   └── AnalyzerPage    — input → results pipeline        │
└───────────────────────┬─────────────────────────────────┘
                        │  POST /analyze  (JSON)
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   FastAPI Backend                        │
│                                                         │
│   ├── Input validation (empty, length > 5000 chars)     │
│   ├── Groq API call (llama-3.3-70b-versatile)           │
│   ├── JSON fence stripping (regex)                      │
│   ├── Response schema validation                        │
│   └── Structured error handling (400/401/429/500/502)   │
└───────────────────────┬─────────────────────────────────┘
                        │  HTTPS
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    Groq Cloud API                       │
│                                                         │
│   Model: llama-3.3-70b-versatile                        │
│   Temp:  0.2 (high determinism)                         │
│   Tokens: 1200 max output                               │
│   Prompt: forensic analyst system prompt                │
└─────────────────────────────────────────────────────────┘
```

---

## Manipulation Vectors Analyzed

NoiseLens measures 9 psychological manipulation vectors, each scored 0–100:

| Vector | What It Measures |
|---|---|
| **Emotional Manipulation** | Exploiting emotions to bypass rational evaluation |
| **Outrage Engineering** | Deliberately triggering moral indignation for engagement |
| **Fear Exploitation** | Leveraging fear of loss, danger, or social exclusion |
| **Curiosity Gaps** | Withholding information to create compulsive consumption |
| **False Urgency** | Manufacturing time pressure that does not exist |
| **Tribal Language** | Us-vs-them framing, in-group/out-group signaling |
| **Authority Simulation** | Implying expertise or insider access without substance |
| **Sensationalism** | Exaggerating significance beyond available evidence |
| **Algorithmic Retention Engineering** | Structural tricks designed for clicks or watch time |

**Score calibration:**

| Range | Label |
|---|---|
| 0 – 20 | Minimal |
| 21 – 40 | Low |
| 41 – 60 | Moderate |
| 61 – 80 | Significant |
| 81 – 100 | Severe |

The model is explicitly prompted to avoid score inflation. Neutral content scores low. Only genuinely manipulative content scores high.

---

## API Reference

### `POST /analyze`

Analyzes text for psychological manipulation.

**Request**
```json
{
  "text": "AI will replace all developers in 6 months — here's how to survive"
}
```

**Response**
```json
{
  "overall_manipulation_score": 78,
  "information_density_score": 22,
  "emotional_pressure_score": 82,
  "clickbait_score": 75,
  "fear_exploitation_score": 80,
  "sensationalism_score": 71,
  "detected_tactics": [
    "Fear Appeal",
    "False Urgency",
    "Sensationalism",
    "Curiosity Gap"
  ],
  "trigger_phrases": [
    "replace all developers",
    "6 months",
    "here's how to survive"
  ],
  "analysis_summary": "This headline employs a classic fear-urgency combination: an absolute claim of professional obsolescence paired with a compressed timeline and a survival hook. The phrase 'replace all developers' is maximalist and unsupported. The 'here's how to survive' framing converts fear into a click imperative."
}
```

**Error Responses**

| Code | Cause |
|---|---|
| `400` | Empty input or input exceeding 5000 characters |
| `401` | Groq API key is invalid or missing |
| `429` | Groq rate limit reached |
| `500` | Internal server error |
| `502` | AI returned unparseable or incomplete response |

### `GET /health`

```json
{ "status": "ok", "service": "NoiseLens API" }
```

---

## Project Structure

```
noiselens/
├── README.md
│
├── backend/
│   ├── main.py              # FastAPI app — /analyze endpoint + Groq integration
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variable template
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js       # Dev proxy: /analyze → localhost:8000
    ├── tailwind.config.js   # Custom design tokens
    ├── postcss.config.js
    ├── .env.example
    │
    ├── public/
    │   └── favicon.svg
    │
    └── src/
        ├── App.jsx          # Router
        ├── main.jsx         # React entry
        ├── index.css        # Tailwind base + custom scrollbar
        │
        ├── components/
        │   ├── Navbar.jsx        # Fixed top nav with blur backdrop
        │   ├── Footer.jsx
        │   ├── OverallScore.jsx  # Animated SVG circular arc gauge
        │   ├── ScoreCard.jsx     # Animated progress bar card
        │   ├── TacticTag.jsx     # Pill badge for detected tactics
        │   ├── Spinner.jsx       # Minimal SVG spinner
        │   └── ErrorBanner.jsx   # Dismissable error state
        │
        ├── pages/
        │   ├── LandingPage.jsx   # Hero, features, how-it-works, example cards
        │   └── AnalyzerPage.jsx  # Full analyzer interface + results
        │
        └── utils/
            ├── api.js        # fetch wrapper with 30s AbortController timeout
            └── scores.js     # Score → color/label mapping utilities
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- Groq API key — free at [console.groq.com](https://console.groq.com)

---

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

`.env` contents:
```
GROQ_API_KEY=gsk_your_key_here
```

Start the server:
```bash
uvicorn main:app --reload --port 8000
```

Backend available at `http://localhost:8000`

---

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend available at `http://localhost:5173`

The Vite dev server automatically proxies `/analyze` and `/health` requests to `localhost:8000` — no CORS configuration needed during development.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | Your Groq API key | Yes |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend base URL | `http://localhost:8000` |

---

## Deployment

### Backend — Railway / Render

1. Push `backend/` to your host of choice
2. Set `GROQ_API_KEY` as an environment variable in the dashboard
3. Start command: `uvicorn main:app --host 0.0.0.0 --port 8000`

### Frontend — Vercel

```bash
cd frontend
npm run build
vercel deploy
```

Set `VITE_API_URL` to your deployed backend URL in Vercel's environment settings.

Update `main.py` CORS origins to include your production frontend URL:
```python
allow_origins=["https://your-frontend.vercel.app"]
```

---

## Design System

NoiseLens follows a deliberate **forensic minimalism** aesthetic — influenced by Linear, Vercel, and Raycast.

| Token | Value | Usage |
|---|---|---|
| `canvas` | `#FAFAFA` | Page background |
| `surface` | `#FFFFFF` | Cards, inputs |
| `border` | `#E8E8E8` | Dividers, card borders |
| `subtle` | `#F4F4F4` | Secondary backgrounds |
| `muted` | `#9A9A9A` | Labels, metadata |
| `dim` | `#6B6B6B` | Body text, descriptions |
| `ink` | `#1A1A1A` | Primary text, buttons |

Score colors are dynamically mapped:

| Score Range | Color | Meaning |
|---|---|---|
| 0 – 30 | `#4CAF82` (green) | Low manipulation |
| 31 – 60 | `#E8A838` (amber) | Moderate |
| 61 – 80 | `#E06B3A` (orange) | Significant |
| 81 – 100 | `#C94040` (red) | Severe |

No neon. No glow. No gradients. No cyberpunk.

---

## Security

- The Groq API key is **never exposed to the frontend**. All AI calls are proxied through the FastAPI backend.
- CORS is restricted to known origins.
- Input is sanitized and length-capped at 5000 characters server-side.
- `.env` is git-ignored. Only `.env.example` (with placeholder values) is committed.

---

## Prompt Engineering

The system prompt instructs the model to behave as a **forensic psychological analyst**, not an assistant. Key design decisions:

- Temperature set to `0.2` for high analytical determinism
- Model is explicitly told to avoid score inflation on neutral content
- Output is constrained to strict JSON — no preamble, no markdown fences
- Regex stripping handles edge cases where the model wraps output in code blocks
- All 9 required response keys are validated before the response is forwarded to the client

---

## Roadmap

- [ ] Analysis history (localStorage persistence)
- [ ] Export results as PNG / PDF report
- [ ] Batch mode — analyze multiple headlines at once
- [ ] Browser extension for inline content analysis
- [ ] Comparison mode — A/B two pieces of content
- [ ] API rate limiting + usage dashboard

---

## Contributing

Pull requests are welcome. For major changes, open an issue first.

```bash
git clone https://github.com/DevOm-AI/NoiseLens.git
cd NoiseLens
```

Follow the local setup instructions above for both frontend and backend.

---

## License

MIT — use it, fork it, build on it.

---

## Author

Built by **DevOm** — [@DevOm-AI](https://github.com/DevOm-AI)

---

> *"The most dangerous manipulation is the kind that doesn't feel like manipulation."*
