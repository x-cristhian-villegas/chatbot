<!--
Base de conocimiento PÚBLICA de Creaciones Angy (visitantes y clientes).
Fuente: código del monorepo creaciones-angy (plantillas Angular, servicios de catálogo y pedidos, migraciones Flyway).
Las etiquetas entre comillas/negritas son textos exactos de la pantalla. No incluir nada del panel, costos,
proveedores internos ni arquitectura. No poner teléfonos ni correos: se configuran en el sitio.
-->

# Creaciones Angy — guía para clientes

**Creaciones Angy** (https://creaciones-angy.com) es una tienda en línea mexicana de velas y piezas hechas a mano, y de materiales para que tú también crees las tuyas. Lema del sitio: «Velas y piezas hechas a mano con cariño, y todo lo que necesitas para crear las tuyas». Angy vierte cada vela a mano en pequeños lotes y comparte los mismos materiales que usa en su taller.

Cómo se compra, en resumen: **eliges productos → los agregas al carrito → llenas tus datos → pulsas «Enviar pedido por WhatsApp»**. Se genera un folio (por ejemplo **CA-000123**) y se abre WhatsApp con el resumen listo para enviar. La disponibilidad, la forma de pago y la entrega se confirman por WhatsApp con Angy. En el sitio **no se paga en línea**.

## Qué vende la tienda

Las categorías se administran desde la tienda y pueden cambiar; las de inicio son:

| Categoría | Qué incluye |
|---|---|
| 🕯️ **Velas** | Velas decorativas y para regalo |
| 🌸 **Velas aromáticas** (dentro de Velas) | Velas con fragancia |
| 🧁 **Moldes** | Moldes de silicón para velas y resina |
| 💧 **Resina** | Resina epóxica y accesorios |
| 💎 **Figuras de resina** | Figuras, llaveros y piezas hechas en resina |
| 🧺 **Material para velas** | Ceras, mechas, fragancias, colorantes y envases |
| ✂️ **Papelería creativa** | Papelería decorativa y artículos personalizados |

Algunas categorías aparecen en el menú superior y en el pie de página; todas se pueden explorar desde el inicio en **«Explora por categoría»** (cada tarjeta muestra cuántos productos tiene) o desde el **Catálogo**. Filtrar por una categoría incluye también sus subcategorías (por ejemplo, «Velas» incluye «Velas aromáticas»).

¿Pedidos para eventos, recuerdos, mayoreo o algo hecho a tu gusto? El sitio invita a escribir por WhatsApp para platicarlo.

## Recorrido por el sitio

- **Inicio (/)**: buscador grande («¿Qué quieres crear hoy? Prueba «vela lavanda» o escribe aroma:»), atajos **«Populares:»** (vela aromática, molde de silicón, cera de soya, resina), **«Explora por categoría»**, **«Recién salidos del taller»** (productos destacados o los más nuevos; enlace **«Ver novedades →»**), la sección **«Pedir es así de fácil»** (1 Elige · 2 Envía tu pedido · 3 Recibe) y el botón **«¿Dudas? Escríbenos por WhatsApp»**.
- **Menú superior**: **«Catálogo»**, algunas categorías, **«Iniciar sesión»** (o tu nombre si ya entraste) y el ícono del **carrito** con el número de artículos.
- **Pie de página**: columna **«Tienda»** (**«Catálogo completo»** y categorías), columna **«Información»** (**«Aviso de privacidad»**, **«Términos y condiciones»**, **«Política de cookies»**, **«Configurar cookies»**), **«Síguenos»** (redes sociales, si están configuradas) y el botón **«Escríbenos por WhatsApp»**.

## Buscar en el catálogo (/catalogo)

La página de catálogo funciona como un buscador tipo Google.

### Búsqueda por texto
- Escribe lo que buscas en la barra y pulsa **Enter** o el botón **«Buscar»**. Ejemplos: «vela lavanda», «molde silicón», «cera de soya».
- La búsqueda entiende español, ignora acentos y tolera pequeños errores de escritura. Si no hay coincidencia exacta puede aparecer **«Quizás quisiste decir: …»** con una sugerencia que puedes pulsar.
- Arriba de los resultados se muestra algo como «Cerca de 12 resultados (0.05 segundos)».
- Cada resultado muestra nombre, fragmento de la descripción (con las palabras buscadas resaltadas), precio, **«● Disponible»** o **«Agotado»**, la marca (si aplica) y el botón **«Agregar al carrito»** (solo si está disponible).

### Pestañas «Todo» e «Imágenes» y orden
- **«🔍 Todo»**: lista de resultados con texto.
- **«🖼️ Imágenes»**: cuadrícula de fotos con nombre y precio.
- Junto a las pestañas hay un selector para ordenar: **«Más relevantes»**, **«Más recientes»**, **«Precio: menor a mayor»**, **«Precio: mayor a menor»**, **«Nombre (A–Z)»**.
- Debajo de la barra pueden aparecer botones rápidos de categorías para filtrar con un clic.
- Al final hay paginación con **«‹ Anterior»**, números de página y **«Siguiente ›»**.

### Filtros en la barra (fichas)
La misma barra permite agregar filtros como “fichas”. Al hacer clic en la barra aparece **«Filtrar por»** con las opciones disponibles y cuántos productos hay en cada valor. El flujo es: **elige el filtro → elige «es» (=) o «no es» (≠) → elige el valor**. La ficha queda en la barra y los resultados se actualizan.

También se puede escribir directamente: escribe la clave con dos puntos (por ejemplo `aroma:`) y la barra abre ese filtro para que elijas el valor.

Filtros que puede ver un cliente:

| Clave | Para qué sirve | Ejemplos |
|---|---|---|
| `categoria:` | Categoría (incluye sus subcategorías) | `categoria:velas`, `categoria:material-para-velas` |
| `tipo:` | Tipo de producto (cuando el producto lo tiene) | `tipo:cera-de-soya` |
| `marca:` | Marca (solo aparece si hay productos con marca visible, p. ej. «Creaciones Angy») | `marca:creaciones-angy` |
| `aroma:` · `color:` · `material:` · `tamano:` · `forma:` | Atributos del producto (Aroma, Color, Material, Tamaño, Forma) | `aroma:lavanda`, `color:rosa` |
| `precio:` | Precio en pesos | `precio:<200`, `precio:>=100`, `precio:100-300`, `precio:=150` |
| `disponible:` | Solo disponibles o solo agotados | `disponible:si`, `disponible:no` |

Reglas útiles:
- **Negación («no es»)**: elige «no es» o escribe un guion antes de la clave, p. ej. `-aroma:canela` = todo menos canela.
- **Varios valores del mismo filtro** se suman (por ejemplo aroma lavanda **o** vainilla); **filtros distintos** se combinan (categoría velas **y** precio menor a 200).
- **Precio**: no admite «no es». Acepta `<`, `<=`, `>`, `>=`, `=` o un rango `mín-máx` (ejemplo de ayuda en pantalla: «(ej. <200, 100-300, >500)»). También sugiere rangos como «Menos de $…», «$… a $…», «Más de $…».
- **Disponible**: solo acepta «Sí» o «No».
- Solo aparecen los filtros que tienen valores en los resultados actuales (si no ves `color:`, es que ningún producto de esa búsqueda tiene color registrado).
- Para quitar una ficha pulsa su **×**; con la barra vacía, la tecla **Backspace** borra la última ficha. La **×** grande de la derecha («Borrar búsqueda y filtros») limpia todo.
- Máximo 20 filtros a la vez.
- Las búsquedas y filtros quedan en la dirección de la página, así que puedes copiar el enlace y compartirlo.

Si no hay resultados, el sitio sugiere: revisar la ortografía o usar palabras más generales, quitar filtros, o escribir por WhatsApp si buscas algo especial.

## Página de producto (/producto/…)

- Ruta de navegación (Catálogo › categoría › subcategoría).
- **Galería**: imagen principal y, si hay varias, miniaturas para cambiar de foto.
- Marca (si el producto la muestra), nombre, resumen, **precio en MXN** y, si aplica, **«Contenido:»** (p. ej. 200 g).
- Si está disponible: selector de cantidad (**−** / **+**), botón **«Agregar al carrito»** y enlace **«Ir al carrito y pedir por WhatsApp →»**.
- Si está agotado: aviso «Por ahora está agotado. Escríbenos y te avisamos cuando vuelva.»
- Características (Aroma, Color, Material, Tipo…): cada valor es un enlace que busca productos con esa misma característica.
- Sección **«Descripción»** con los detalles (cómo está hecho, aroma, tamaño, cuidados…).
- Si un producto ya no existe o se retiró: «Este producto ya no está disponible» con el botón **«Ver el catálogo»**.

Las piezas son artesanales: puede haber ligeras variaciones de color, forma o tamaño respecto a las fotos.

## Carrito (/carrito)

Se abre con el ícono del carrito del menú superior. Título: **«Tu carrito»**.

- Cada producto muestra foto, nombre, precio «c/u», cantidad con **−** / **+**, subtotal y el bote **🗑** para quitarlo. Bajar la cantidad a 0 también lo quita.
- Máximo **99 piezas por producto**; para mayoreo, escribir por WhatsApp.
- El carrito se guarda en tu navegador (en este dispositivo). No necesitas cuenta para usarlo. Los precios se vuelven a validar al enviar el pedido.
- Si está vacío: «Tu carrito está vacío.» y el botón **«Explorar el catálogo»**.

### Datos que pide el formulario «Tus datos»
| Campo | Obligatorio | Notas |
|---|---|---|
| **Nombre** | Sí | Si iniciaste sesión, se llena solo |
| **WhatsApp / teléfono** | Sí | 10 dígitos (ej. 55 1234 5678) |
| **Correo** (opcional) | No | Si iniciaste sesión, se llena solo |
| **Entrega** | Sí | Elige un método (ver abajo) |
| **Dirección de entrega** | Sí, si no eliges recoger | Aparece solo con envío |
| **Notas** (opcional: aroma, dedicatoria, fecha…) | No | Detalles especiales |

### Métodos de entrega
Los métodos los define la tienda; los de inicio son:
- **Recoger en punto de entrega** — se acuerda el lugar y la hora por WhatsApp. Envío: «Sin costo».
- **Envío local** — entrega en la ciudad; el costo se confirma.
- **Paquetería** — envío nacional; el costo se cotiza.

En los totales verás **Subtotal**, **Envío** («Sin costo», un monto fijo si la tienda lo definió, o «Por confirmar») y **Total**.

### Enviar el pedido
1. Revisa productos y cantidades.
2. Llena **«Tus datos»** y elige la **Entrega**.
3. Pulsa **«Enviar pedido por WhatsApp»**.
4. Se registra el pedido con un **folio** (formato **CA-000001**) y se abre WhatsApp con un mensaje como: «¡Hola, Creaciones Angy! Quiero hacer el pedido *CA-000001*: …» con productos, total, entrega, nombre, dirección y notas.
5. Verás la pantalla **«¡Pedido CA-… registrado!»** con el total. **Falta enviar el mensaje en WhatsApp** para que Angy lo confirme contigo. Si WhatsApp no se abrió (el navegador puede bloquear la ventana), pulsa **«Abrir WhatsApp y enviar»**. Con **«Ver el mensaje»** puedes ver el texto. **«Seguir explorando»** regresa al catálogo.
6. Al enviar, el carrito se vacía.

Después, por WhatsApp se confirman disponibilidad, **forma de pago** y **entrega** (y el costo de envío si aplica). Según los términos, el pedido queda apartado una vez confirmada la disponibilidad y la forma de pago. Se respeta el precio del momento del pedido.

Mensajes que pueden aparecer al enviar:
- «Ya no están disponibles: … Quítalos del carrito para continuar.» → quita esos productos con 🗑 y vuelve a enviar.
- «Indica la dirección de entrega» → falta la dirección para envío.
- «Hiciste varios pedidos seguidos. Espera unos minutos o escríbenos por WhatsApp.»
- «La tienda aún no configuró su WhatsApp para pedidos. Intenta más tarde.» o «La tienda se está configurando; intenta en unos minutos.» → problema temporal de la tienda; intentar más tarde o usar el botón de WhatsApp del sitio.

## Cuenta de cliente

No es obligatorio tener cuenta para comprar. Con cuenta, tus datos se llenan solos y tus pedidos quedan guardados en **«Mis pedidos»**.

- **Entrar o registrarte**: pulsa **«Iniciar sesión»** (ícono 👤 arriba a la derecha). Se abre la página de acceso de Creaciones Angy, donde puedes entrar con tu correo y contraseña, **crear una cuenta nueva** o **entrar con Google**. Si te registras con correo, se te pide verificarlo. La contraseña debe tener al menos 10 caracteres y no puede ser tu correo. Si la olvidaste, la página de acceso permite restablecerla. Hay opción de recordar la sesión.
- **Menú de tu cuenta** (pulsa tu nombre): **«Mis pedidos»**, **«Mi perfil»** (abre la gestión de tu cuenta: datos, contraseña, sesiones) y **«Cerrar sesión»**.
- **«Mis pedidos»** (/cuenta/pedidos): tabla con **Folio**, **Fecha**, **Estado**, **Artículos** y **Total** (los últimos 50). Solo aparecen los pedidos hechos **con la sesión iniciada**; los hechos sin cuenta no se pueden ligar después. Si no hay: «Aún no tienes pedidos con esta cuenta.»
- Estados que puede tener un pedido: **Nuevo** (recibido, pendiente de confirmar), **Confirmado**, **Pagado**, **Enviado** (en camino o listo para recoger), **Entregado** y **Cancelado**. El estado lo actualiza la tienda.

## Cookies y privacidad

- Al entrar por primera vez aparece el aviso **«🍪 Usamos cookies»** con los botones **«Configurar»**, **«Solo necesarias»** y **«Aceptar»**. En **«Configurar»** hay casillas: **«Necesarias (siempre activas)»**, **«Preferencias»** y **«Estadísticas»**, y el botón **«Guardar selección»**.
- El sitio solo usa almacenamiento necesario: tu carrito, tu preferencia de cookies y la sesión de tu cuenta. Las de preferencias y estadísticas hoy no se usan. Tu elección se recuerda unos 6 meses.
- Para cambiar tu elección: enlace **«Configurar cookies»** en el pie de página, o **«Cambiar mis preferencias»** en la página **«Política de cookies»** (/cookies).
- **«Aviso de privacidad»** (/privacidad): qué datos se recaban (nombre, teléfono/WhatsApp, correo opcional, dirección si eliges envío y el detalle de los pedidos), para qué (atender y entregar pedidos, comunicarse contigo, historial de tu cuenta), que no se venden ni comparten con fines publicitarios, y cómo ejercer tus derechos ARCO (escribiendo al correo indicado en esa página; respuesta en máximo 20 días hábiles).
- **«Términos y condiciones»** (/terminos): pedidos confirmados por WhatsApp; precios en pesos mexicanos (MXN), pueden cambiar sin aviso pero se respeta el del momento del pedido; el envío se indica o cotiza antes de confirmar; variaciones naturales en piezas hechas a mano; **si tu producto llega dañado, avisa dentro de las 48 horas con fotografías**; recomendaciones de uso seguro de velas (nunca dejarlas encendidas sin supervisión, lejos de niños, mascotas y materiales inflamables).

## Contacto

El contacto es por **WhatsApp**, con los botones del sitio: **«Escríbenos por WhatsApp»** (pie de página) y **«¿Dudas? Escríbenos por WhatsApp»** (inicio). Las redes sociales, si están configuradas, aparecen en **«Síguenos»** en el pie. El asistente no da números ni correos: indica usar esos botones.

## Preguntas frecuentes

**¿Cómo hago un pedido?** → Agrega productos con **«Agregar al carrito»**, abre el carrito, llena **«Tus datos»**, elige la entrega y pulsa **«Enviar pedido por WhatsApp»**. Luego envía el mensaje que se abre en WhatsApp.

**¿Puedo pagar en línea / con tarjeta en el sitio?** → No. El pago se acuerda directamente por WhatsApp después de enviar tu pedido.

**¿Qué formas de pago aceptan?** → Se acuerdan por WhatsApp al confirmar el pedido; el sitio no las detalla.

**¿Cuánto cuesta el envío?** → Recoger no tiene costo. Para «Envío local» o «Paquetería», el carrito muestra el costo si la tienda lo fijó; si dice «Por confirmar», se te confirma por WhatsApp.

**¿Hacen envíos a todo México?** → Existe la opción «Paquetería» (envío nacional, costo cotizado). Los detalles se confirman por WhatsApp.

**Ya pulsé «Enviar pedido por WhatsApp» pero no se abrió WhatsApp.** → En la pantalla de confirmación pulsa **«Abrir WhatsApp y enviar»**. El pedido ya quedó registrado con su folio.

**¿Mi pedido ya está confirmado?** → Todavía no: queda «Nuevo» hasta que Angy lo confirme contigo por WhatsApp. Si tienes cuenta y lo hiciste con sesión iniciada, revisa su estado en **«Mis pedidos»**.

**¿Qué es el folio CA-…?** → El número de tu pedido. Úsalo al hablar con la tienda por WhatsApp.

**No veo mi pedido en «Mis pedidos».** → Solo aparecen los pedidos hechos con la sesión iniciada en esa misma cuenta. Para uno hecho sin sesión, pregunta por WhatsApp con tu folio.

**¿Puedo cambiar o cancelar mi pedido?** → Desde el sitio no; escribe por WhatsApp con tu folio.

**¿Necesito cuenta para comprar?** → No. La cuenta solo sirve para llenar tus datos más rápido y ver tus pedidos.

**¿Puedo entrar con Google?** → Sí, en la página que se abre al pulsar **«Iniciar sesión»**.

**Olvidé mi contraseña.** → Pulsa **«Iniciar sesión»** y usa la opción para restablecer la contraseña de la página de acceso.

**¿Cómo cambio mis datos o contraseña?** → Menú de tu nombre → **«Mi perfil»**.

**¿Cómo busco velas de un aroma?** → En la barra escribe `aroma:` y elige el valor (p. ej. lavanda), o busca «vela lavanda».

**¿Cómo veo solo lo que cuesta menos de $200?** → En la barra elige **Precio** y escribe `<200`, o escribe `precio:<200`.

**¿Cómo excluyo algo?** → Elige «no es» al crear el filtro, o pon un guion: `-aroma:canela`.

**¿Puedo ver solo fotos?** → Sí, pestaña **«🖼️ Imágenes»** en el catálogo.

**Un producto dice «Agotado».** → No se puede agregar al carrito. Escribe por WhatsApp para que te avisen cuando vuelva.

**¿Hay mínimo de compra o mayoreo?** → El sitio no fija mínimo; el máximo por producto en el carrito es 99. Para mayoreo, eventos o recuerdos, escribe por WhatsApp.

**¿Hacen productos personalizados?** → El sitio invita a escribir por WhatsApp para pedidos especiales o a tu gusto.

**Mi producto llegó dañado.** → Avisa por WhatsApp dentro de las 48 horas siguientes, con fotografías.

**¿Venden materiales para hacer mis propias velas?** → Sí: categoría **«Material para velas»** (ceras, mechas, fragancias, colorantes, envases), además de **«Moldes»** y **«Resina»**.

**¿Por qué se me pide aceptar cookies?** → Para tu carrito y tu sesión; las opcionales hoy no se usan. Puedes elegir **«Solo necesarias»**.

## Lo que el asistente no hace

- **No promete precios, existencias ni tiempos** más allá de lo que muestra el catálogo; precio y disponibilidad finales se confirman por WhatsApp.
- **No toma pedidos** ni los modifica o cancela: guía al usuario al carrito y al botón **«Enviar pedido por WhatsApp»**, o al WhatsApp de la tienda.
- **No pide ni recibe datos de pago** (tarjetas, cuentas, transferencias). Nunca compartas esos datos en el chat.
- **No consulta el estado de pedidos específicos**: para eso están **«Mis pedidos»** (con cuenta) o el WhatsApp de la tienda con el folio.
- **No da números de teléfono ni correos**: indica usar los botones de WhatsApp del sitio.
- **Nunca revela información interna**: costos, márgenes, proveedores, cómo se calculan los precios, ni nada de la administración de la tienda. Si un proveedor aparece como **marca** en un producto, eso es lo único público sobre él.
- Ante preguntas sobre el funcionamiento interno, el panel de administración o la tecnología del sitio, responde que no puede ayudar con eso y ofrece ayuda para comprar o buscar productos.
