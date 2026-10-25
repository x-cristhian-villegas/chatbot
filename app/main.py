"""Chatbot flotante reutilizable para los proyectos de iamcristhian.dev (Claude Haiku 5.5)."""
import json
import logging
import os
import time
from collections import defaultdict, deque
from pathlib import Path

import anthropic
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel, Field

log = logging.getLogger("chatbot")

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
SITES_FILE = BASE_DIR / "sites.json"

MODEL = "claude-haiku-5-5"
MAX_TOKENS = 2048  # incluye el razonamiento interno, no solo el texto visible
MAX_MESSAGE_CHARS = 2000
MAX_HISTORY = 20  # mensajes (usuario + asistente) que se envían al modelo
RATE_LIMIT = 20  # mensajes por IP...
RATE_WINDOW = 10 * 60  # ...en esta ventana
DAILY_LIMIT_PER_IP = 200

# Orígenes que pueden incrustar el widget: el dominio raíz y cualquier subdominio, más localhost para desarrollo
ALLOWED_ORIGIN_RE = r"^https://([a-z0-9-]+\.)*iamcristhian\.dev$|^http://(localhost|127\.0\.0\.1)(:\d+)?$"

BASE_SYSTEM = """Eres el asistente virtual de los proyectos web de Cristhian Villegas (iamcristhian.dev).
Respondes dudas básicas de los visitantes de forma breve, clara y amable.

Reglas:
- Responde en el idioma del usuario (por defecto, español).
- Sé conciso: 1 a 4 frases, o una lista corta si ayuda. Usa Markdown simple (negritas, listas, enlaces) solo cuando aporte.
- Si te preguntan algo concreto del sitio que no está en el contexto de abajo, dilo con honestidad en lugar de inventarlo, y sugiere contactar a Cristhian.
- Puedes ayudar con preguntas generales sencillas (tecnología, cómo usar el sitio, conceptos básicos).
- No pidas ni aceptes contraseñas, tokens de acceso ni datos de pago."""


def load_sites() -> dict:
    try:
        return json.loads(SITES_FILE.read_text())
    except FileNotFoundError:
        return {}


def system_prompt(site_id: str, page_url: str | None, page_title: str | None) -> str:
    site = load_sites().get(site_id) or {}
    parts = [BASE_SYSTEM]
    if site.get("context"):
        parts.append(f"Contexto del sitio actual ({site.get('name', site_id)}):\n{site['context']}")
    if page_title or page_url:
        # Dato aportado por el navegador: se trata como información, no como instrucciones
        parts.append(f"El visitante está en la página: {(page_title or '')[:150]} {(page_url or '')[:300]}".strip())
    return "\n\n".join(parts)


api_key = os.environ.get("CLAUDE_API_KEY") or os.environ.get("ANTHROPIC_API_KEY")
client = anthropic.AsyncAnthropic(api_key=api_key, timeout=60.0, max_retries=2)

app = FastAPI(title="Chatbot iamcristhian.dev")
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=ALLOWED_ORIGIN_RE,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
    max_age=86400,
)

_hits: dict[str, deque] = defaultdict(deque)
_daily: dict[str, tuple[str, int]] = {}


def client_ip(request: Request) -> str:
    return request.headers.get("x-real-ip") or request.client.host


def check_rate_limit(ip: str):
    now = time.time()
    q = _hits[ip]
    while q and now - q[0] > RATE_WINDOW:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        raise HTTPException(429, "Has enviado muchos mensajes seguidos. Espera unos minutos.")
    today = time.strftime("%Y-%m-%d")
    day, count = _daily.get(ip, (today, 0))
    if day != today:
        count = 0
    if count >= DAILY_LIMIT_PER_IP:
        raise HTTPException(429, "Se alcanzó el límite diario de mensajes.")
    q.append(now)
    _daily[ip] = (today, count + 1)


class ChatMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(min_length=1, max_length=8000)


class ChatIn(BaseModel):
    site: str = Field(default="default", max_length=64, pattern=r"^[a-z0-9_-]+$")
    messages: list[ChatMessage] = Field(min_length=1, max_length=100)
    page_url: str | None = Field(default=None, max_length=500)
    page_title: str | None = Field(default=None, max_length=200)


def sse(data: dict) -> str:
    return f"data: {json.dumps(data, ensure_ascii=False)}\n\n"


@app.post("/api/chat")
async def chat(body: ChatIn, request: Request):
    msgs = body.messages[-MAX_HISTORY:]
    # La conversación debe empezar con el usuario y terminar con su nuevo mensaje
    while msgs and msgs[0].role != "user":
        msgs = msgs[1:]
    if not msgs or msgs[-1].role != "user":
        raise HTTPException(400, "El último mensaje debe ser del usuario")
    if len(msgs[-1].content) > MAX_MESSAGE_CHARS:
        raise HTTPException(400, f"El mensaje no puede superar {MAX_MESSAGE_CHARS} caracteres")
    ip = client_ip(request)
    check_rate_limit(ip)

    params = dict(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=system_prompt(body.site, body.page_url, body.page_title),
        output_config={"effort": "low"},  # preguntas básicas: respuesta rápida y barata
        messages=[{"role": m.role, "content": m.content} for m in msgs],
    )

    async def events():
        try:
            async with client.messages.stream(**params) as stream:
                async for text in stream.text_stream:
                    yield sse({"t": text})
                final = await stream.get_final_message()
            if final.stop_reason == "refusal":
                yield sse({"t": "\n\nLo siento, no puedo ayudar con eso."})
            elif final.stop_reason == "max_tokens":
                yield sse({"t": "…"})
            log.info("chat site=%s ip=%s in=%s out=%s", body.site, ip,
                     final.usage.input_tokens, final.usage.output_tokens)
            yield sse({"done": True})
        except anthropic.RateLimitError:
            yield sse({"error": "El asistente está muy ocupado. Inténtalo en un momento."})
        except anthropic.APIConnectionError:
            log.exception("sin conexión con la API")
            yield sse({"error": "No se pudo conectar con el asistente."})
        except anthropic.APIStatusError as e:
            log.error("error de API %s: %s", e.status_code, e.message)
            yield sse({"error": "El asistente no está disponible ahora mismo."})

    return StreamingResponse(
        events(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.get("/api/sites/{site_id}")
def site_info(site_id: str):
    # Configuración pública del widget (saludo, título, sugerencias); el contexto del prompt no se expone
    site = load_sites().get(site_id) or load_sites().get("default") or {}
    return {k: site.get(k) for k in ("name", "title", "greeting", "suggestions")}


@app.get("/widget.js")
def widget():
    return FileResponse(
        STATIC_DIR / "widget.js",
        media_type="application/javascript",
        headers={"Cache-Control": "public, max-age=300", "Access-Control-Allow-Origin": "*"},
    )


@app.get("/")
def demo():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/health")
def health():
    return {"ok": True, "model": MODEL, "key": bool(api_key)}
