# YT MP3 Downloader

Dirección: https://ytdownloader.iamcristhian.dev
Código: https://github.com/x-cristhian-villegas/ytdownloader

## Qué es
Aplicación web privada con interfaz parecida a YouTube para buscar videos y descargarlos como MP3 (192 kbps).
Hecha con React (frontend) y Python/FastAPI + yt-dlp + ffmpeg (backend).

## Acceso
- Requiere un **token de uso personal** que entrega Cristhian. No lo puede generar el visitante ni este asistente.
- Al entrar con el token, el navegador lo recuerda durante 1 año.
- En la pantalla de acceso hay botones **Mostrar** (ver lo que pegaste) y **Pegar** (lee el portapapeles).
- El botón redondo con la inicial del usuario, arriba a la derecha, sirve para **Salir**.

## Cómo se usa
1. **Buscar**: escribe en la barra superior, o pega un enlace de YouTube (watch, youtu.be, shorts) para abrir ese video directamente.
2. **Ver un video**: clic en un resultado; se reproduce con el reproductor oficial de YouTube.
3. **Descargar**: en la vista del video, botón rojo **Descargar MP3**.
4. **Descargar varios sin abrirlos**:
   - botón **+ MP3** que aparece sobre la miniatura (al pasar el ratón; en el celular siempre visible), o
   - **clic derecho** sobre un resultado → **Agregar a cola de descargas** (en Android: mantener pulsado; en iPhone usar + MP3).
5. **Cola de descargas**: botón **Descargas** arriba a la derecha (el número rojo indica cuántas están en proceso). Muestra posición en cola, progreso, y botones Guardar, Reintentar y Quitar, además de **Guardar todas**.
6. Opción **Guardar automáticamente al terminar** (en el panel de descargas): el navegador puede pedir permiso para descargar varios archivos la primera vez.

## Reglas y límites
- Se procesan 2 descargas a la vez, en orden de llegada; el resto espera su turno.
- El historial va ligado al token: con el mismo token se ve la misma cola en la PC y en el celular.
- Los archivos se **borran del servidor a las 24 horas**. Hay que guardarlos antes.
- Videos de hasta **2 horas**. Máximo **50 descargas pendientes** a la vez.
- Si una descarga falla: botón **Reintentar**. Si sigue fallando, avisar a Cristhian (puede requerir actualizar el servidor, porque YouTube cambia a menudo).

## Preguntas frecuentes
- **¿Es gratis / puedo tener acceso?** Es una herramienta privada; el acceso lo da Cristhian con un token personal.
- **No puedo pegar el token.** Usa el botón **Pegar** o **Mostrar** para comprobar que se pegó; revisa que no falten caracteres.
- **Token inválido.** Puede estar mal copiado o revocado; pide uno nuevo a Cristhian.
- **¿Puedo bajar playlists completas?** Todavía no; hay que agregar los videos uno por uno (el clic derecho lo hace rápido).
- **¿En qué calidad?** MP3 a 192 kbps.
- **¿Dónde quedan los archivos?** En la carpeta de descargas de tu navegador.
