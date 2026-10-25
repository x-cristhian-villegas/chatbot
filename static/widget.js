/*
 * Chat flotante de iamcristhian.dev
 * Uso:
 *   <script src="https://chat.iamcristhian.dev/widget.js" data-site="ytdownloader" defer></script>
 * Atributos opcionales: data-color="#ff0033", data-position="left|right", data-api="https://...",
 *   data-read-page="false" (no enviar el texto visible de la página al asistente)
 * API JS: window.IamcChat.open(), .close(), .toggle(), .reset()
 */
(function () {
  if (window.IamcChat) return

  const script = document.currentScript
  const cfg = {
    site: script?.dataset.site || 'default',
    color: script?.dataset.color || '#3b5bfd',
    position: script?.dataset.position === 'left' ? 'left' : 'right',
    api: script?.dataset.api || (script ? new URL(script.src).origin : ''),
    readPage: script?.dataset.readPage !== 'false',
  }
  const STORE_KEY = `iamc-chat:${cfg.site}`
  const MAX_CHARS = 2000
  const MAX_PAGE_CHARS = 6000

  // Texto visible de la página (sin scripts, formularios ni el propio widget) para que el asistente sepa qué ve el visitante
  function pageText() {
    if (!cfg.readPage) return null
    try {
      const src = document.querySelector('main, [role=main], article') || document.body
      const clone = document.createElement('div')
      clone.append(...[...src.childNodes].map((n) => n.cloneNode(true)))
      clone.querySelectorAll('script, style, noscript, template, svg, iframe, input, textarea, select, #iamc-chat, [aria-hidden=true]').forEach((n) => n.remove())
      // innerText respeta los saltos de línea visibles, pero solo en nodos montados y no ocultos con visibility
      clone.setAttribute('aria-hidden', 'true')
      clone.style.cssText = 'position:fixed;left:-99999px;top:0;width:1000px;opacity:0;pointer-events:none;'
      document.body.appendChild(clone)
      const text = clone.innerText
      clone.remove()
      return text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim().slice(0, MAX_PAGE_CHARS) || null
    } catch {
      return null
    }
  }

  const store = {
    load() {
      try {
        return JSON.parse(sessionStorage.getItem(STORE_KEY)) || { messages: [], open: false }
      } catch {
        return { messages: [], open: false }
      }
    },
    save(state) {
      try {
        sessionStorage.setItem(STORE_KEY, JSON.stringify({ messages: state.messages.slice(-40), open: state.open }))
      } catch {
        /* sin almacenamiento: la conversación dura solo en esta página */
      }
    },
  }

  const state = { ...store.load(), busy: false, info: null }

  // ---------- Markdown mínimo y seguro ----------
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
  function inline(s) {
    return s
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>')
  }
  function markdown(text) {
    const lines = esc(text).split('\n')
    let html = ''
    let list = null
    for (const raw of lines) {
      const line = raw.trimEnd()
      const ul = line.match(/^\s*[-*•]\s+(.*)/)
      const ol = line.match(/^\s*\d+[.)]\s+(.*)/)
      const kind = ul ? 'ul' : ol ? 'ol' : null
      if (kind !== list) {
        if (list) html += `</${list}>`
        if (kind) html += `<${kind}>`
        list = kind
      }
      if (kind) html += `<li>${inline((ul || ol)[1])}</li>`
      else if (/^#{1,6}\s/.test(line)) html += `<p><strong>${inline(line.replace(/^#+\s/, ''))}</strong></p>`
      else if (line.trim()) html += `<p>${inline(line)}</p>`
    }
    if (list) html += `</${list}>`
    return html
  }

  // ---------- DOM (Shadow DOM: no hereda ni contamina estilos del sitio) ----------
  const host = document.createElement('div')
  host.id = 'iamc-chat'
  host.style.cssText = 'all: initial; position: fixed; z-index: 2147483000;'
  const root = host.attachShadow({ mode: 'open' })
  const side = cfg.position

  root.innerHTML = `
<style>
  :host { --c: ${cfg.color}; --bg: #ffffff; --surface: #f3f4f6; --text: #111827; --muted: #6b7280; --border: #e5e7eb; --user-text: #ffffff; }
  @media (prefers-color-scheme: dark) {
    :host { --bg: #18181b; --surface: #27272a; --text: #f4f4f5; --muted: #a1a1aa; --border: #3f3f46; }
  }
  * { box-sizing: border-box; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
  .launcher {
    position: fixed; bottom: 20px; ${side}: 20px; width: 56px; height: 56px; border-radius: 50%;
    border: 0; background: var(--c); color: #fff; cursor: pointer; display: grid; place-items: center;
    box-shadow: 0 6px 20px rgba(0,0,0,.25); transition: transform .15s;
  }
  .launcher:hover { transform: scale(1.06); }
  .launcher svg { width: 26px; height: 26px; }
  .panel {
    position: fixed; bottom: 88px; ${side}: 20px; width: 370px; height: min(560px, calc(100vh - 110px));
    display: none; flex-direction: column; overflow: hidden;
    background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,.25); font-size: 14px; line-height: 1.45;
  }
  .panel.open { display: flex; animation: pop .16s ease-out; }
  @keyframes pop { from { opacity: 0; transform: translateY(8px) scale(.98); } }
  header { display: flex; align-items: center; gap: 10px; padding: 12px 12px 12px 16px; background: var(--c); color: #fff; }
  header .dot { width: 9px; height: 9px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 0 2px rgba(255,255,255,.35); }
  header h2 { margin: 0; font-size: 15px; font-weight: 600; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  header button { border: 0; background: transparent; color: #fff; cursor: pointer; width: 32px; height: 32px; border-radius: 8px; font-size: 16px; opacity: .9; }
  header button:hover { background: rgba(255,255,255,.18); opacity: 1; }
  .log { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; overscroll-behavior: contain; }
  .msg { max-width: 85%; padding: 9px 12px; border-radius: 14px; word-wrap: break-word; overflow-wrap: anywhere; }
  .msg.bot { align-self: flex-start; background: var(--surface); border-bottom-left-radius: 4px; }
  .msg.user { align-self: flex-end; background: var(--c); color: var(--user-text); border-bottom-right-radius: 4px; white-space: pre-wrap; }
  .msg.error { align-self: center; background: transparent; color: #dc2626; font-size: 13px; text-align: center; }
  .msg p { margin: 0 0 6px; } .msg p:last-child { margin-bottom: 0; }
  .msg ul, .msg ol { margin: 4px 0 6px; padding-left: 20px; }
  .msg code { background: rgba(127,127,127,.18); padding: 1px 4px; border-radius: 4px; font-size: 12.5px; font-family: ui-monospace, monospace; }
  .msg a { color: var(--c); }
  .typing { display: inline-flex; gap: 4px; padding: 4px 2px; }
  .typing i { width: 7px; height: 7px; border-radius: 50%; background: var(--muted); animation: blink 1.2s infinite; }
  .typing i:nth-child(2) { animation-delay: .2s; } .typing i:nth-child(3) { animation-delay: .4s; }
  @keyframes blink { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 14px 10px; }
  .chips button { border: 1px solid var(--border); background: var(--bg); color: var(--text); padding: 6px 10px; border-radius: 999px; font-size: 12.5px; cursor: pointer; }
  .chips button:hover { border-color: var(--c); color: var(--c); }
  form { display: flex; gap: 8px; align-items: flex-end; padding: 10px; border-top: 1px solid var(--border); }
  textarea {
    flex: 1; resize: none; max-height: 120px; min-height: 40px; padding: 10px 12px; border-radius: 12px;
    border: 1px solid var(--border); background: var(--surface); color: var(--text); font-size: 14px; outline: none; line-height: 1.35;
  }
  textarea:focus { border-color: var(--c); }
  .send { width: 40px; height: 40px; flex-shrink: 0; border: 0; border-radius: 12px; background: var(--c); color: #fff; cursor: pointer; display: grid; place-items: center; }
  .send:disabled { opacity: .45; cursor: default; }
  .send svg { width: 18px; height: 18px; }
  .foot { text-align: center; font-size: 10.5px; color: var(--muted); padding: 0 0 8px; }
  @media (max-width: 480px) {
    .panel { inset: 0; width: 100%; height: 100%; border-radius: 0; bottom: 0; ${side}: 0; }
    .panel.open ~ .launcher { display: none; }
  }
</style>
<div class="panel" role="dialog" aria-label="Chat de ayuda">
  <header>
    <span class="dot"></span><h2>Asistente</h2>
    <button class="reset" title="Nueva conversación" aria-label="Nueva conversación">↺</button>
    <button class="close" title="Cerrar" aria-label="Cerrar">✕</button>
  </header>
  <div class="log" aria-live="polite"></div>
  <div class="chips"></div>
  <form>
    <textarea rows="1" placeholder="Escribe tu pregunta…" maxlength="${MAX_CHARS}" aria-label="Mensaje"></textarea>
    <button class="send" type="submit" aria-label="Enviar">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4 21 12 3.4 3.6l-.01 6.53L15 12 3.39 13.87z"/></svg>
    </button>
  </form>
  <div class="foot">Asistente con IA · puede cometer errores</div>
</div>
<button class="launcher" aria-label="Abrir chat de ayuda">
  <svg class="ico-chat" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2zm3 6h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
</button>`

  const $ = (s) => root.querySelector(s)
  const panel = $('.panel')
  const log = $('.log')
  const chips = $('.chips')
  const input = $('textarea')
  const sendBtn = $('.send')
  const launcher = $('.launcher')

  function bubble(role, text) {
    const el = document.createElement('div')
    el.className = `msg ${role}`
    if (role === 'bot') el.innerHTML = markdown(text)
    else el.textContent = text
    log.appendChild(el)
    return el
  }

  function render() {
    log.innerHTML = ''
    bubble('bot', state.info?.greeting || '¡Hola! 👋 ¿En qué te puedo ayudar?')
    for (const m of state.messages) bubble(m.role === 'user' ? 'user' : 'bot', m.content)
    chips.innerHTML = ''
    if (!state.messages.length) {
      for (const s of state.info?.suggestions || []) {
        const b = document.createElement('button')
        b.type = 'button'
        b.textContent = s
        b.onclick = () => send(s)
        chips.appendChild(b)
      }
    }
    log.scrollTop = log.scrollHeight
  }

  function setOpen(open) {
    state.open = open
    panel.classList.toggle('open', open)
    launcher.setAttribute('aria-label', open ? 'Cerrar chat de ayuda' : 'Abrir chat de ayuda')
    store.save(state)
    if (open) {
      log.scrollTop = log.scrollHeight
      setTimeout(() => input.focus(), 50)
    }
  }

  function autosize() {
    input.style.height = 'auto'
    input.style.height = Math.min(input.scrollHeight, 120) + 'px'
    sendBtn.disabled = state.busy || !input.value.trim()
  }

  async function send(text) {
    text = text.trim().slice(0, MAX_CHARS)
    if (!text || state.busy) return
    state.busy = true
    state.messages.push({ role: 'user', content: text })
    store.save(state)
    input.value = ''
    autosize()
    chips.innerHTML = ''
    bubble('user', text)
    const out = bubble('bot', '')
    out.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>'
    log.scrollTop = log.scrollHeight

    let reply = ''
    let error = null
    try {
      const r = await fetch(`${cfg.api}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: cfg.site,
          messages: state.messages,
          page_url: location.href.split('#')[0],
          page_title: document.title,
          page_text: pageText(),
        }),
      })
      if (!r.ok || !r.body) {
        const body = await r.json().catch(() => ({}))
        throw new Error(typeof body.detail === 'string' ? body.detail : 'No se pudo enviar el mensaje.')
      }
      const reader = r.body.getReader()
      const decoder = new TextDecoder()
      let buf = ''
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        let idx
        while ((idx = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, idx)
          buf = buf.slice(idx + 2)
          if (!chunk.startsWith('data: ')) continue
          const ev = JSON.parse(chunk.slice(6))
          if (ev.t) {
            reply += ev.t
            out.innerHTML = markdown(reply)
            log.scrollTop = log.scrollHeight
          }
          if (ev.error) error = ev.error
        }
      }
    } catch (e) {
      error = e.message || 'Error de conexión.'
    }

    if (reply.trim()) {
      state.messages.push({ role: 'assistant', content: reply })
    } else {
      out.remove()
      // Se quita el mensaje del usuario para que la conversación siga alternando usuario/asistente
      state.messages.pop()
      input.value = text
    }
    if (error) bubble('error', error)
    state.busy = false
    store.save(state)
    autosize()
    log.scrollTop = log.scrollHeight
  }

  launcher.onclick = () => setOpen(!state.open)
  $('.close').onclick = () => setOpen(false)
  $('.reset').onclick = () => {
    if (state.busy) return
    state.messages = []
    store.save(state)
    render()
    input.focus()
  }
  $('form').onsubmit = (e) => {
    e.preventDefault()
    send(input.value)
  }
  input.addEventListener('input', autosize)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault()
      send(input.value)
    }
  })
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.open) setOpen(false)
  })

  function mount() {
    document.body.appendChild(host)
    render()
    autosize()
    if (state.open) setOpen(true)
    fetch(`${cfg.api}/api/sites/${encodeURIComponent(cfg.site)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((info) => {
        if (!info) return
        state.info = info
        if (info.title) $('header h2').textContent = info.title
        if (!state.busy) render()
      })
      .catch(() => {})
  }

  if (document.body) mount()
  else document.addEventListener('DOMContentLoaded', mount)

  window.IamcChat = {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(!state.open),
    reset: () => $('.reset').click(),
  }
})()
