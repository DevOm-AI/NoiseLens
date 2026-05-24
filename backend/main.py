from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import json
import os
import re
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="NoiseLens API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are a forensic psychological analyst specializing in media manipulation, attention engineering, and persuasion tactics used in online content.

Your role is purely analytical. You do NOT offer advice, encouragement, or judgment of the creator's intent. You identify patterns forensically — like a content auditor studying the mechanics of a piece.

Analyze the provided text for the following psychological manipulation vectors:

1. EMOTIONAL MANIPULATION — Exploiting emotions (fear, anger, sadness, excitement) to bypass rational thought
2. OUTRAGE ENGINEERING — Deliberately provoking anger or moral indignation to drive engagement
3. FEAR EXPLOITATION — Leveraging fear of loss, danger, or exclusion
4. CURIOSITY GAPS — Withholding information to create compulsive desire to consume more
5. FALSE URGENCY — Manufacturing time pressure that does not exist
6. TRIBAL LANGUAGE — Us-vs-them framing, in-group/out-group signaling
7. AUTHORITY SIMULATION — Implying expertise, insider access, or credibility without substance
8. SENSATIONALISM — Exaggerating significance or severity beyond evidence
9. ALGORITHMIC RETENTION ENGINEERING — Structural tricks designed to maximize watch time or clicks
10. INFORMATION DENSITY — The ratio of actual information to emotional filler

Scores: 0 = absent, 1-30 = low, 31-60 = moderate, 61-85 = significant, 86-100 = severe

Be calibrated. Not every viral post is maximally manipulative. If something scores low, say so. Avoid overstating manipulation in neutral content. Avoid understating it in clearly manipulative content.

You MUST respond ONLY with a valid JSON object. No preamble, no explanation outside the JSON, no markdown code fences. Pure JSON only.

Response format:
{
  "overall_manipulation_score": <integer 0-100>,
  "information_density_score": <integer 0-100>,
  "emotional_pressure_score": <integer 0-100>,
  "clickbait_score": <integer 0-100>,
  "fear_exploitation_score": <integer 0-100>,
  "sensationalism_score": <integer 0-100>,
  "detected_tactics": [<list of tactic name strings>],
  "trigger_phrases": [<list of exact phrases from the text that are manipulation vectors>],
  "analysis_summary": "<2-4 sentence forensic summary of the content's manipulation profile>"
}"""


class AnalyzeRequest(BaseModel):
    text: str


@app.post("/analyze")
async def analyze_content(request: AnalyzeRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text content is required.")

    text = request.text.strip()
    if len(text) > 5000:
        raise HTTPException(status_code=400, detail="Text must be under 5000 characters.")

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Analyze this content:\n\n{text}"}
            ],
            temperature=0.2,
            max_tokens=1200,
        )

        raw_response = completion.choices[0].message.content.strip()

        # Strip markdown fences if model wraps JSON in them
        raw_response = re.sub(r"^```(?:json)?\s*", "", raw_response)
        raw_response = re.sub(r"\s*```$", "", raw_response)

        result = json.loads(raw_response)

        # Validate required keys exist
        required_keys = [
            "overall_manipulation_score", "information_density_score",
            "emotional_pressure_score", "clickbait_score",
            "fear_exploitation_score", "sensationalism_score",
            "detected_tactics", "trigger_phrases", "analysis_summary"
        ]
        for key in required_keys:
            if key not in result:
                raise ValueError(f"Missing key in response: {key}")

        return result

    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="AI returned an unparseable response. Please try again.")
    except ValueError as e:
        raise HTTPException(status_code=502, detail=f"Incomplete AI response: {str(e)}")
    except Exception as e:
        error_msg = str(e)
        if "rate_limit" in error_msg.lower():
            raise HTTPException(status_code=429, detail="Rate limit reached. Please wait a moment and try again.")
        if "api_key" in error_msg.lower() or "authentication" in error_msg.lower():
            raise HTTPException(status_code=401, detail="API key is invalid or missing.")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {error_msg}")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "NoiseLens API"}