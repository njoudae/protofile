import json
import logging
import os
import sys
from typing import Any

from dotenv import load_dotenv

# Load environment variables from .env.local
project_root = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(project_root, ".env.local"))

# Add src to Python path to find generation, embeddings, etc.
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field, field_validator

from backend.rate_limit import RateLimitExceeded, SharedRateLimiter

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nejoood-rag-backend")

app = FastAPI(title="Nejood Profile RAG API")
rate_limiter = SharedRateLimiter()


class QuestionRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=300)

    @field_validator("question")
    @classmethod
    def validate_question(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Question cannot be empty.")
        if len(cleaned) > 300:
            raise ValueError("Question exceeds 300 characters.")
        return cleaned


async def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _normalize_answer(payload: Any) -> str:
    if isinstance(payload, dict):
        if "answer" in payload and isinstance(payload["answer"], str):
            return payload["answer"]
        if "result" in payload and isinstance(payload["result"], str):
            return payload["result"]
    if payload is None:
        return ""
    return str(payload)


@app.post("/api/chat")
async def chat(request: Request, payload: QuestionRequest):
    client_ip = await _client_ip(request)

    try:
        rate_limiter.check_limits(client_ip)
    except RateLimitExceeded:
        raise HTTPException(status_code=429, detail="Too many requests.")

    try:
        from generation.rag_chat import ask

        result = ask(payload.question)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Invalid question.") from exc
    except Exception as exc:  # pragma: no cover - defensive
        logger.exception("Chat generation failed")
        raise HTTPException(status_code=500, detail="Chat generation failed.") from exc

    try:
        rate_limiter.record_success(client_ip)
    except Exception:  # pragma: no cover
        logger.exception("Failed to record a successful generation")

    answer = _normalize_answer(result)
    if not answer:
        raise HTTPException(status_code=500, detail="Chat generation failed.")

    return {"answer": answer}


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return {"detail": exc.detail}, exc.status_code


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/")
async def root() -> dict[str, str]:
    return {"status": "ok"}
