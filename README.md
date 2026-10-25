# chatbot

Asistente flotante (Claude Haiku 5.5) reutilizable en todos los proyectos de iamcristhian.dev.
URL: https://chat.iamcristhian.dev (demo en `/`)

## Añadirlo a un proyecto
Antes de `</body>`:
```html
<script src="https://chat.iamcristhian.dev/widget.js" data-site="default" defer></script>
```
- `data-site`: clave en `sites.json` (saludo, sugerencias y contexto del sitio). Desconocida = genérico.
- `data-color` (ej. `#ff0033`), `data-position` (`right` | `left`).
- API JS: `IamcChat.open()`, `.close()`, `.toggle()`, `.reset()`.

Funciona en cualquier página (React, HTML, etc.): Shadow DOM, sin dependencias, la conversación vive en
`sessionStorage` de la pestaña. Solo orígenes `https://*.iamcristhian.dev` (y localhost) pueden usar la API (CORS).

## Nuevo sitio
Añade una entrada en `sites.json` (`name`, `title`, `greeting`, `suggestions`, `context`). Se lee en cada petición: no requiere reiniciar.

## Backend
- `app/main.py`: FastAPI en `127.0.0.1:8020`, servicio systemd `chatbot`. Respuestas en streaming (SSE).
- API key: `CLAUDE_API_KEY` en `/opt/projects/data/.env` (`EnvironmentFile` del servicio).
- Modelo `claude-haiku-5-5`, effort `low`, historial máx. 20 mensajes, 2000 caracteres por mensaje.
- Límites por IP: 20 mensajes / 10 min y 200 / día.

```bash
systemctl restart chatbot
journalctl -u chatbot -f      # incluye tokens usados por respuesta
```
