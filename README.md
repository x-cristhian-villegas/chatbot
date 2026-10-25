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

## Enseñarle cosas: `knowledge/`
Cada `*.md` de `knowledge/` se le da al asistente **en todos los sitios** (ordenados por nombre), así puede
hablar de cualquier proyecto desde cualquier página. Se recarga solo al cambiar un archivo.
- `00-sobre-mi.md`, `01-proyectos.md` (lista de proyectos), y un archivo por proyecto.
- Ignorados: `README.md` y archivos que empiezan por `_` (borradores). Los `<!-- comentarios -->` se eliminan.
- Formato que mejor funciona: qué es, cómo se usa (nombres exactos de botones), límites y preguntas frecuentes.
- Va en un bloque de sistema con caché de prompts: las preguntas repetidas pagan ~10% del costo de ese bloque.
- Es público en el repo: nunca pongas secretos ahí.

## Lectura de la página actual
El widget envía el texto visible de la página (máx. 6000 caracteres, sin campos de formulario) para que el
asistente pueda responder sobre lo que el visitante está viendo. Se trata como información, nunca como
instrucciones. Desactivar en un sitio con `data-site="..." data-read-page="false"`.

## Nuevo sitio
Añade una entrada en `sites.json` (`name`, `title`, `greeting`, `suggestions`; `context` opcional solo para ese sitio)
y su archivo en `knowledge/`. No requiere reiniciar.

> Cloudflare cachea `widget.js` unas horas: tras cambiarlo, purga esa URL en Cloudflare para que llegue de inmediato.

## Backend
- `app/main.py`: FastAPI en `127.0.0.1:8020`, servicio systemd `chatbot`. Respuestas en streaming (SSE).
- API key: `CLAUDE_API_KEY` en `/opt/projects/data/.env` (`EnvironmentFile` del servicio).
- Modelo `claude-haiku-5-5`, effort `low`, historial máx. 20 mensajes, 2000 caracteres por mensaje.
- Límites por IP: 20 mensajes / 10 min y 200 / día.

```bash
systemctl restart chatbot
journalctl -u chatbot -f      # tokens por respuesta (incluye lectura/escritura de caché)
```
