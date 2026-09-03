import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


class RateLimitExceeded(RuntimeError):
    pass


class SharedRateLimiter:
    """Persistent rate limiting with a Redis-ready abstraction and a local file fallback."""

    def __init__(self, storage_path: str | None = None, redis_url: str | None = None):
        self.storage_path = Path(storage_path or os.getenv("RATE_LIMIT_STORE_PATH", ".rate-limit-store.json"))
        self.storage_path.parent.mkdir(parents=True, exist_ok=True)
        self.redis_url = redis_url or os.getenv("REDIS_URL") or os.getenv("UPSTASH_REDIS_REST_URL")
        self.redis = None

        if self.redis_url:
            try:
                import redis

                self.redis = redis.from_url(self.redis_url, decode_responses=True)
                self.redis.ping()
            except Exception:
                self.redis = None

    def _load_state(self) -> dict[str, Any]:
        if not self.storage_path.exists():
            return {}
        try:
            return json.loads(self.storage_path.read_text(encoding="utf-8"))
        except Exception:
            return {}

    def _save_state(self, state: dict[str, Any]) -> None:
        self.storage_path.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")

    def _cleanup_state(self, state: dict[str, Any], now: int) -> dict[str, Any]:
        minute_window = now // 60
        minute_keys = [key for key in state if key.startswith("minute:")]
        for key in minute_keys:
            bucket = int(key.split(":", 2)[1])
            if bucket < minute_window - 5:
                del state[key]

        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        for key in list(state.keys()):
            if key.startswith("day:") and not key.endswith(today):
                if key.startswith(f"day:{today}"):
                    continue
                del state[key]
        return state

    def _count_minute_requests(self, state: dict[str, Any], key: str) -> int:
        return int(state.get(key, 0))

    def check_limits(self, ip: str) -> None:
        ip = ip or "unknown"
        now = int(time.time())
        minute_bucket = now // 60
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        state = self._load_state()
        state = self._cleanup_state(state, now)

        minute_key = f"minute:{minute_bucket}:{ip}"
        minute_count = self._count_minute_requests(state, minute_key)
        if minute_count >= 5:
            raise RateLimitExceeded("Too many requests for this IP.")

        ip_daily_key = f"day:{today}:ip:{ip}"
        global_daily_key = f"day:{today}:global"

        if int(state.get(ip_daily_key, 0)) >= 20:
            raise RateLimitExceeded("Daily generation limit reached for this IP.")

        if int(state.get(global_daily_key, 0)) >= 300:
            raise RateLimitExceeded("Global daily generation limit reached.")

        state[minute_key] = minute_count + 1
        self._save_state(state)

    def record_success(self, ip: str) -> None:
        ip = ip or "unknown"
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        state = self._load_state()
        state = self._cleanup_state(state, int(time.time()))

        state[f"day:{today}:ip:{ip}"] = int(state.get(f"day:{today}:ip:{ip}", 0)) + 1
        state[f"day:{today}:global"] = int(state.get(f"day:{today}:global", 0)) + 1
        self._save_state(state)
