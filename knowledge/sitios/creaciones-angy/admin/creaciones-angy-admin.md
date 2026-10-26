<!--
Base de conocimiento para ADMINISTRADORES de Creaciones Angy (panel /admin).
Fuente: plantillas del panel (Angular) y reglas del backend (catálogo, pedidos, cotizador) y migraciones Flyway.
Las etiquetas entre comillas/negritas son textos exactos de la pantalla.
Repositorio PÚBLICO: no poner secretos, IPs, puertos, rutas del servidor ni detalles de infraestructura.
-->

# Creaciones Angy — guía del panel de administración

El panel está en **https://creaciones-angy.com/admin**. Lo usan Angy y su equipo para administrar productos, pedidos, precios y ajustes de la tienda.

## Acceso al panel

- Se necesita una cuenta con el **rol de administración** («admin») de la tienda. Las cuentas y roles se administran en **Keycloak**, el servicio de acceso de la tienda (**acceso.creaciones-angy.com**): ahí se busca al usuario y se le asigna el rol `admin` del cliente de la tienda (`creaciones-angy-web`).
- Se puede entrar con correo y contraseña o con **Google**.
- Con sesión de administrador, la tienda muestra el enlace **«Panel»** en el menú superior y **«Panel de administración»** en el menú de la cuenta.
- Si una cuenta sin el rol abre /admin, ve «No tienes acceso a esta sección — Inicia sesión con una cuenta de administración.»
- Si acabas de recibir el rol y no ves el Panel: **«Cerrar sesión»** y vuelve a entrar (el permiso se carga al iniciar sesión).

### Menú lateral
| Sección | Para qué |
|---|---|
| 📊 **«Tablero»** | Resumen del día |
| 🧾 **«Pedidos»** | Pedidos recibidos y su estado |
| 🕯️ **«Productos»** | Alta, edición y publicación de productos |
| 🧮 **«Cotizador»** | Costeo y precio sugerido |
| 🚚 **«Proveedores»** | A quién le compras |
| 🗂️ **«Categorías y filtros»** | Categorías, tipos de producto y atributos de filtro |
| ⚙️ **«Catálogos y ajustes»** | Unidades, monedas, estados, canales, entregas y datos del negocio |
| **«↗ Ver la tienda»** | Abre la tienda en otra pestaña |
| **«Cerrar sesión»** | Sale de la cuenta |

En celular, el menú se abre con **☰**. Arriba a la derecha aparece el nombre o correo de quien entró.

## Tablero

Saludo «Hola, … 👋 — Así va la tienda hoy.» y tarjetas que se pueden pulsar:
- **«Pedidos nuevos»** → lista de pedidos en estado Nuevo.
- **«Productos publicados»** (de N totales) → productos con `publicado:si`.
- **«Sin miniatura (no publicables)»** → productos con `miniatura:no` (se resalta si hay alguno).
- **«Publicados y agotados»** → `publicado:si` + `disponible:no`.
- **«Proveedores»** y **«Insumos en el cotizador»**.

También: **«Últimos pedidos»** (con **«Ver todos →»**), **«Atajos»** (**«+ Nuevo producto»**, **«🧮 Nueva cotización»**, **«🚚 Proveedores»**, **«⚙️ WhatsApp y datos del negocio»**) y **«Pedidos por estado»** con conteos.

## Pedidos

### Cómo llegan
El cliente arma su carrito en la tienda y pulsa «Enviar pedido por WhatsApp». El pedido se registra con folio **CA-000001** (consecutivo), estado **Nuevo**, y al cliente se le abre WhatsApp con el resumen para que te lo envíe. Si está configurado el **«Correo de contacto»**, también llega un aviso por correo «Nuevo pedido CA-…» con el botón «Ver en el panel». El precio de cada producto se toma del catálogo en el momento del pedido (no del navegador del cliente).

### Lista de pedidos
- Pestañas por estado: **«Todos»**, **Nuevo**, **Confirmado**, **Pagado**, **Enviado**, **Entregado**, **Cancelado** (cada una con su conteo).
- Caja de búsqueda **«Folio, cliente o teléfono»** (pulsa Enter).
- Columnas: Folio, Fecha, Cliente (y teléfono), Estado, Artículos, Total. Pulsa una fila para abrir el detalle.

### Detalle de un pedido
- **«Productos»**: producto (enlace a su ficha), SKU, **proveedor**, cantidad, precio, subtotal; **Subtotal**, **Envío** («Por confirmar» si no se ha fijado) y **Total**.
- **«Historial»**: cada cambio de estado con fecha, usuario y comentario.
- **«Estado»**: estado actual, selector **«Cambiar a»**, **«Comentario (opcional)»** (ej. «Pagó por transferencia…») y botón **«Actualizar estado»**.
- **«Cliente»**: nombre, teléfono, correo, entrega, dirección y notas. Si no es «Recoger», hay un campo **«Costo de envío»** con **«Guardar»**: al guardarlo se recalcula el total.
- Botón **«WhatsApp al cliente»**: abre un chat con el cliente con el mensaje «¡Hola …! Te escribo de Creaciones Angy sobre tu pedido CA-…». (A números de 10 dígitos se les antepone 52.)

### Flujo de estados (configuración inicial)
**NUEVO → CONFIRMADO → PAGADO → ENVIADO → ENTREGADO**, o **CANCELADO** en cualquier momento.
- Nuevo: recibido, pendiente de confirmar · Confirmado: confirmado con el cliente · Pagado: pago recibido · Enviado: en camino o listo para recoger · Entregado: entregado al cliente · Cancelado.
- **Entregado** y **Cancelado** son **finales**: un pedido en estado final ya no se puede cambiar («El pedido ya está … y no se puede cambiar»).
- Puedes pasar a cualquier estado no final (no es obligatorio seguir el orden), y cada cambio queda en el historial.

**Cómo cambiar el estado:** abre el pedido → en **«Estado»** elige el nuevo en **«Cambiar a»** → (opcional) escribe un comentario → **«Actualizar estado»**.

## Productos

### Lista
- Botón **«+ Nuevo producto»**.
- Barra de búsqueda con fichas (ver «Barra de búsqueda y filtros del panel»). En el panel también busca por **SKU** y **SKU del proveedor**, y muestra productos no publicados.
- Columnas: miniatura (📷 si no tiene), Producto (SKU · categoría), Proveedor, Precio, **Costo** (con moneda si no es MXN), Estado (**Publicado** / **Borrador**, **Insumo**, **Agotado**).

### Crear un producto paso a paso
1. **Productos → «+ Nuevo producto»**.
2. Sección **«Información»**: **Nombre**; **Resumen** (aparece en los resultados de búsqueda); **Categoría** (obligatoria); **Tipo de producto** (opcional, ver abajo); **Proveedor \*** (**obligatorio**; los inactivos no se pueden elegir; enlace «Administrar proveedores»); **SKU del proveedor**; **SKU interno** (vacío = automático).
3. **«Descripción»**: editor con formato (títulos, negritas, listas, citas, enlaces) e imágenes con el botón 🖼 de la barra. Para insertar imágenes en la descripción el producto debe estar guardado.
4. **«Atributos para los filtros»**: **«+ Atributo»** → elige el atributo (Aroma, Color, Material, Tamaño, Forma…) y escribe el valor (ej. «Lavanda»). Esto crea los filtros del catálogo (ej. `aroma:lavanda`). **✕** quita la fila.
5. **«Precio, costo y contenido»**: **Precio de venta (MXN)**; **Costo (privado)** con su **moneda** (MXN, USD…); si ambos están en MXN se muestra el **margen** ($ y % del precio). **Contenido** y **Unidad** (ej. 1 kg, 200 g, 500 ml, 1 pza); si la unidad es de masa o volumen aparece **Densidad g/ml** (fragancias, aceites). **Existencia** (opcional, solo informativa: no cambia sola la disponibilidad).
6. **«Opciones»**:
   - **«Disponible (si no, se muestra «Agotado»)»**.
   - **«Destacado en la portada»**: aparece en «Recién salidos del taller» del inicio (hasta 12; si no hay destacados se muestran los más recientes). En el catálogo, sin búsqueda, los destacados salen primero.
   - **«Se vende en la tienda»**: si se desmarca, es solo insumo y no se puede publicar.
   - **«Es insumo del cotizador (requiere costo, contenido y unidad)»**.
7. Pulsa **«Crear producto»**. Aviso: «Producto creado: ahora sube su miniatura».
8. En **«Imágenes»** (solo aparece después de guardar): **«Subir miniatura»** (obligatoria) y **«+ Fotos»** para la **Galería**.
9. Cuando la miniatura termine de procesarse, pulsa **«Publicar»**. Aviso: «¡Publicado! Ya aparece en el catálogo».

### Reglas de publicación
El botón **«Publicar»** está desactivado si hay cambios sin guardar («Tienes cambios sin guardar.») o si falta algo. El recuadro **«Para publicarlo falta:»** lo explica:
- «Falta la miniatura (debe subirse y terminar de procesarse)»
- «El producto está marcado como no vendible (solo insumo)»
- «Falta el precio de venta»
- «El proveedor está inactivo»
- «La categoría está inactiva»

Si un producto **publicado** se edita y quedaría incompleto (p. ej. borrar el precio), no deja guardar: «El producto está publicado y quedaría incompleto: …».

Con el producto publicado aparecen **«Ver en la tienda ↗»** y **«Retirar del catálogo»** (lo vuelve borrador). La dirección del producto (/producto/…) sigue al nombre mientras está en borrador; **ya publicado no cambia**, aunque cambies el nombre, para no romper enlaces compartidos.

### Imágenes
- **Miniatura**: cuadrada de preferencia (se recorta al centro). JPG, PNG, WebP o GIF, **máx. 10 MB**. Botón **«Subir miniatura»** o **«Cambiar»**.
- Se **procesa en segundo plano**: verás «Procesando…» unos segundos; luego aparece la imagen, o «⚠» con el error. Si tarda: «La imagen tarda en procesarse; recarga la página en un momento.»
- **Galería**: **«+ Fotos»** (varias a la vez). Cada foto tiene **‹** / **›** para ordenar y **🗑** para eliminar.
- **Desde una URL**: junto a **«Subir miniatura»** y junto a **«+ Fotos»** está **«🔗 Desde URL»**. Pega la dirección de una imagen pública (que empiece con `https://` o `http://`) y pulsa **«Importar»**. La tienda descarga la imagen y la procesa igual que una subida.
  - Debe ser la dirección de la **imagen** (termina en .jpg, .png, .webp… o abre solo la imagen en el navegador), no la de una página que la contiene. Truco: clic derecho sobre la imagen → «Copiar dirección de imagen».
  - Formatos JPG, PNG, WebP o GIF, máx. 10 MB. Por seguridad solo se aceptan sitios públicos de internet (no direcciones internas ni puertos distintos de los normales).
  - Errores comunes: «El sitio respondió 403/404» (el sitio no permite descargarla o la dirección cambió: descárgala y súbela desde tu equipo), «Formato no permitido» (la dirección no era una imagen).

### Otro proveedor (duplicar)
Si te venden el mismo producto en otro lado: en la tarjeta **«Otro proveedor»** elige el proveedor en «Elige proveedor…» y pulsa **«Duplicar»**. Se crea una copia **sin publicar** con el nuevo proveedor, mismo tipo, categoría, descripción, atributos, imágenes, precio y costo. Aviso: «Copia creada para el otro proveedor (sin publicar): ajusta su costo y precio». Así el cotizador compara ambos proveedores (por eso conviene asignarles un **Tipo de producto**).

### Nueva categoría desde el formulario
Bajo **Categoría** pulsa **«+ Nueva categoría»** → escribe ícono (emoji) y **nombre** → elige **«Categoría principal»** o **«Subcategoría de …»** → **«Crear y asignar»**. Queda creada y asignada al producto («Categoría «…» creada y asignada»). **«Cancelar»** cierra el recuadro.

### Eliminar
**«Eliminar producto»** pide confirmación («Esta acción no se puede deshacer») y borra también sus imágenes. Para ocultarlo sin perderlo, usa **«Retirar del catálogo»** o desmarca **«Disponible»**.

## Cotizador

Calcula cuánto cuesta hacer un producto con materiales del catálogo y qué precio ponerle.

### Preparar insumos
Los materiales del cotizador son productos marcados como **«Es insumo del cotizador»** con **costo, contenido y unidad** (ej. $120 por 1 kg). Si no hay: «Aún no hay insumos: en Productos marca tus materiales como «Es insumo del cotizador»…». Si el costo está en otra moneda, hay que registrar su **tipo de cambio** (si falta, el insumo dice «sin tipo de cambio» y no se puede calcular).

### Lista de cotizaciones
Botón **«+ Nueva cotización»**, búsqueda **«Buscar por nombre o folio»**, columnas Folio (**COT-00001**), Producto, Fecha, Costo/pieza, Precio sugerido, Precio final y una insignia **«Producto»** si ya se creó un producto con ella.

### Hacer una cotización
1. **«¿Qué vas a hacer?»** (nombre, ej. «Vela de lavanda 180 g en frasco ámbar») y **«Notas»**.
2. **«Materiales»** → **«+ Material»** → elige el material (agrupado por tipo; muestra proveedor y costo por unidad base; ★ = el más barato de su tipo) → **cantidad** → **unidad**. Debajo se ve «Compra: costo moneda por contenido unidad». **✕** quita la línea.
3. **«Producción y margen»**: **«Piezas por lote»** (si salen varias piezas con esos materiales), **«Horas de trabajo»**, **«Tarifa por hora»**, **«Merma %»**, **«Indirectos %»** (luz, gas, empaque…), **«Margen %»**, **«Redondear a»** (múltiplo; 5 → $285). En cotizaciones nuevas se llenan con los valores de **Datos del negocio**.
4. El **«Resultado»** se calcula al momento.
5. **«Precio final (opcional)»** si quieres usar otro precio; se muestra la **«Ganancia por pieza»** y su % del precio.
6. **«Guardar cotización»**.

### Fórmula
- **Materiales** = suma de (costo del insumo convertido a pesos ÷ su contenido) × cantidad usada (convertida a la unidad de compra).
- **Merma** = materiales × % merma.
- **Mano de obra** = horas × tarifa por hora.
- **Indirectos** = (materiales + merma + mano de obra) × % indirectos.
- **Costo total del lote** = materiales + merma + mano de obra + indirectos.
- **Costo por pieza** = costo total ÷ piezas por lote.
- **Precio sugerido por pieza** = costo por pieza × (1 + % margen), **redondeado hacia arriba** al múltiplo indicado (0 = solo centavos). El margen es **sobre el costo**.

### Conversión de unidades
- Dentro de la misma magnitud se convierte solo (mg, g, kg, oz, lb · ml, l, fl oz · mm, cm, m · pza, par, docena, ciento).
- Entre **masa y volumen** (ej. usar ml de una fragancia que compras en kg) se necesita la **densidad g/ml** del insumo, registrada en el producto. Si falta: «registra la densidad del insumo (g/ml) en el catálogo».
- Otras combinaciones (ej. cm a g) no se pueden convertir.

### Comparar proveedores
Si un material tiene el mismo **Tipo de producto** con varios proveedores, junto a la línea aparece un selector de proveedor (★ el más barato primero) para cambiarlo. **«★ Usar el más barato en todo»** cambia todas las líneas al proveedor más barato («Se cambiaron N insumo(s) al proveedor más barato» o «Ya usas el proveedor más barato en todo»).

### Costos congelados y recálculo
Al guardar, la cotización **congela** los costos de los insumos y el tipo de cambio de ese momento. Si después cambias costos en Productos o el tipo de cambio, la cotización guardada **no cambia sola**. Pulsa **«↻ Precios actuales»** para recalcularla con los costos y tipos de cambio de hoy.

Otros botones (en una cotización guardada): **«Duplicar»** (crea «Copia de …»), **«Eliminar»** (con confirmación) y **«← Cotizaciones»**.

### Crear el producto desde la cotización
**«Crear producto con este precio»** guarda la cotización y abre **Nuevo producto** con el nombre, el precio (final o sugerido) y el costo por pieza ya llenos. Al crear el producto queda ligado a la cotización (botón **«Ver producto creado»**). Después completa categoría, proveedor (para hechos a mano: «Creaciones Angy»), miniatura, y publica.

## Proveedores

Cada producto pertenece a un proveedor (obligatorio). Por defecto el proveedor es **interno** y los clientes no lo ven.
- **«+ Nuevo proveedor»** o **«Editar»** en la fila. Campos: **Nombre**, **Clave** (mayúsculas, números, - o _; ej. CERAS_NORTE), **Contacto**, **Teléfono**, **Correo**, **Sitio web**, **Notas** (tiempos de entrega, mínimos de compra…), **«Activo»** y **«Mostrar su nombre como «marca» en la tienda»**. Botón **«Guardar»**.
- Con «marca» activada, el nombre aparece en el producto y en los resultados, y existe el filtro público `marca:`. En la lista se ve la insignia **«Marca visible»**.
- El número de productos de cada proveedor es un enlace a sus productos.
- **«Eliminar»** solo si no tiene productos («desactívalo o reasigna sus productos»). Un proveedor **inactivo** oculta sus productos de la tienda, impide publicarlos y no se puede elegir en el formulario de producto.
- Existe el proveedor **Creaciones Angy** (clave PROPIO) para lo hecho a mano, con marca visible.

## Categorías y filtros

Tres pestañas: **«Categorías»**, **«Tipos de producto»**, **«Atributos de filtro»**.

### Categorías
- **«+ Categoría»** o **«Editar»**. Campos: **Nombre**, **«Subcategoría de»** («— (principal)» o una categoría principal), **Ícono** (emoji), **Orden**, **Descripción**, casillas **«En el inicio»** (aparece en «Explora por categoría»), **«En el menú y pie»** (menú superior y pie de página) y **«Activa»**. **«Guardar»**.
- La tabla muestra la **Dirección** (`categoria:slug`, generada del nombre), productos y dónde se muestra (**Inicio**, **Menú** o «Solo catálogo»).
- Filtrar por una categoría incluye sus subcategorías.
- **🗑 Eliminar** está desactivado si tiene productos o subcategorías («muévelos antes de eliminarla»). Una categoría **inactiva** oculta sus productos de la tienda e impide publicarlos.
- No puede haber dos categorías con la misma dirección.

### Tipos de producto
Agrupan el mismo producto de varios proveedores para compararlos en el cotizador (ej. «Cera de soya», «Mecha de algodón 15 cm», «Resina epóxica cristal»). **«+ Tipo»**: **Nombre**, **Categoría**, **Unidad de referencia**, **Activo**. No se elimina si tiene productos (desactívalo). En la tienda se puede filtrar con `tipo:`.

### Atributos de filtro
Cada atributo **filtrable** es una clave en la barra de búsqueda (ej. `aroma:`); los valores se escriben en cada producto. Iniciales: Aroma (`aroma`), Color (`color`), Material (`material`), Tamaño (`tamano`), Forma (`forma`).
- **«+ Atributo»**: **Nombre**, **Clave** (no se puede cambiar después), **Orden**, **Filtrable**, **Activo**.
- Claves reservadas (no se pueden usar): categoria, tipo, marca, precio, disponible, proveedor, publicado, insumo, miniatura.
- Si está en uso no se elimina: desactívalo.

## Catálogos y ajustes

Pestañas: **«Datos del negocio»**, **«Unidades de medida»**, **«Monedas y tipo de cambio»**, **«Estados de pedido»**, **«Canales de venta»**, **«Métodos de entrega»**.

### Datos del negocio
Cada dato se edita en su caja y se guarda con su botón **«Guardar»**. Los marcados **«público»** se ven en la tienda.
| Dato | Uso |
|---|---|
| **Nombre del negocio** | En el sitio y en los mensajes de WhatsApp |
| **WhatsApp para pedidos** | Número que recibe los pedidos. **Con código de país, solo dígitos** (10 a 15), ej. formato 521 + 10 dígitos. Sin él, la tienda no puede recibir pedidos |
| **Correo de contacto** | Se muestra en el sitio (aviso de privacidad) y recibe el aviso de pedido nuevo |
| **Instagram**, **Facebook**, **TikTok** | Direcciones `https://`; aparecen en «Síguenos» del pie |
| **Mano de obra por hora** | Tarifa por defecto del cotizador (inicial 60) |
| **Merma de materiales (%)** | Inicial 5 |
| **Gastos indirectos (%)** | Inicial 10 (luz, gas, empaque, herramientas…) |
| **Margen de ganancia (%)** | Inicial 60, sobre el costo total |
| **Redondear precio sugerido a** | Múltiplo hacia arriba, inicial 5 (0 = sin redondeo) |

Los números y porcentajes no pueden ser negativos.

### Unidades de medida
Cada unidad pertenece a una magnitud (Masa: base g · Volumen: base ml · Longitud: base cm · Piezas: base pza) y tiene un **factor a la base** (kg = 1000 g). **«+ Unidad»**: Nombre, Clave (fija), Símbolo, Magnitud, Factor a la base, Decimales, Activa. Las unidades **en uso** no pueden cambiar magnitud ni factor y no se eliminan (desactívalas). La unidad base debe tener factor 1 y no se elimina.

### Monedas y tipo de cambio
- Los precios de la tienda están en la moneda base (**MXN**, insignia «Base», siempre vale 1). Hay **USD** dado de alta; su tipo de cambio inicia **«Sin registrar»**.
- Para registrar: botón **«Tipo de cambio»** de la moneda → **«1 USD = ? MXN»** → **Fuente (opcional)** (ej. «Banxico, recibo del proveedor…») → **«Registrar»**. Queda un **histórico** (Valor, Desde, Hasta/«Vigente», Fuente, Registró).
- **«+ Moneda»**: Código ISO (fijo), Nombre, Símbolo, Decimales, Activa. La moneda base no se desactiva ni se elimina; una moneda usada por productos no se elimina.

### Estados de pedido, Canales de venta y Métodos de entrega
Con **«+ Agregar»** o **«Editar»**: **Clave** (no se puede cambiar; crea uno nuevo si hace falta), **Nombre**, **Descripción**, **Orden**, **Activo**.
- **Estados de pedido**: además **Color** y **Final** (un pedido en estado final ya no cambia). **NUEVO** es el inicial y no se puede desactivar.
- **Canales de venta**: **WhatsApp** (activo). **Mercado Pago** y **Stripe** existen como «próximamente»: no los actives, aún no están integrados.
- **Métodos de entrega**: los que ve el cliente en el carrito: **Recoger en punto de entrega**, **Envío local**, **Paquetería**. Campo **Costo**: déjalo vacío si se cotiza (en el carrito sale «Por confirmar»); con valor, se suma al total. «Recoger» no pide dirección.

## Barra de búsqueda y filtros del panel

En **Productos** la barra es la misma de la tienda (fichas: clave → «es»/«no es» → valor), con claves extra del panel:
| Clave | Valores | Uso |
|---|---|---|
| `proveedor:` | slug del proveedor | Productos de un proveedor |
| `publicado:` | si / no | Publicados o borradores |
| `insumo:` | si / no | «Insumo del cotizador» |
| `miniatura:` | si / no | «Con miniatura» |
| `disponible:` | si / no | Disponibles / agotados |
| `categoria:`, `tipo:`, `marca:`, `precio:` y atributos (`aroma:`, `color:`…) | igual que en la tienda | |

- Negación con «no es» o un guion: `-proveedor:creaciones-angy`.
- Precio: `<200`, `>=100`, `100-300`, `=150` (sin negación).
- Valores del mismo filtro se suman (O); filtros distintos se combinan (Y). Máximo 20.
- El texto libre busca en el texto del producto (nombre, descripción…) y en el panel también por SKU y SKU del proveedor.
- Ejemplos: `publicado:no miniatura:si` (borradores que ya tienen miniatura), `insumo:si` (materiales del cotizador), `publicado:si disponible:no` (publicados y agotados).

## Preguntas frecuentes y solución de problemas

**No puedo publicar / el botón «Publicar» está gris.** → Lee el recuadro «Para publicarlo falta:». Lo común: falta miniatura o aún se procesa, falta precio de venta, está desmarcado «Se vende en la tienda», proveedor o categoría inactivos. Además, guarda los cambios pendientes primero («Tienes cambios sin guardar.»).

**No me deja subir imágenes.** → Primero guarda el producto («Guarda el producto para poder subir imágenes.»). Formatos JPG, PNG, WebP o GIF, máx. 10 MB.

**La miniatura no aparece / se queda en «Procesando…».** → Se procesa en segundo plano; espera unos segundos y recarga la página. Si sale «⚠» con un error, sube otra imagen (otro formato o menor tamaño).

**Cambié costos o el tipo de cambio y la cotización no cambió.** → Es normal: las cotizaciones guardadas congelan costos y tipo de cambio. Abre la cotización y pulsa **«↻ Precios actuales»**.

**Cambié el costo en el cotizador y el precio del producto no cambió.** → El cotizador no modifica productos existentes. Edita el **Precio de venta** del producto y guarda.

**Un material no aparece en el cotizador.** → En el producto marca «Es insumo del cotizador» con costo, contenido y unidad, y guarda.

**El insumo dice «sin tipo de cambio».** → Su costo está en otra moneda sin tipo de cambio: Catálogos y ajustes → Monedas y tipo de cambio → «Tipo de cambio» → «Registrar».

**Error de conversión de unidades en el cotizador.** → Para pasar entre masa y volumen registra la **Densidad g/ml** en el producto del insumo. Unidades de magnitudes distintas (ej. cm y g) no se convierten.

**No veo el Panel.** → Tu cuenta necesita el rol admin (en Keycloak). Si te lo acaban de dar, **«Cerrar sesión»** y vuelve a entrar.

**Los clientes dicen que no pueden enviar pedidos.** → Revisa en Datos del negocio el **WhatsApp para pedidos** (código de país y solo dígitos). Sin él, la tienda responde «La tienda aún no configuró su WhatsApp para pedidos».

**No me llegan correos de pedidos nuevos.** → Revisa el **Correo de contacto** en Datos del negocio.

**No puedo cambiar el estado de un pedido.** → Si está **Entregado** o **Cancelado** (finales), ya no se puede cambiar.

**¿Cómo cobro el envío?** → En el detalle del pedido, «Costo de envío» → «Guardar»; el total se recalcula. O fija un costo en el método de entrega.

**No puedo borrar una categoría / proveedor / tipo / atributo / unidad.** → Tiene productos o usos. Reasígnalos o desactívalo.

**Cambié el nombre de un producto publicado y la dirección sigue igual.** → Es intencional: la dirección de un producto publicado no cambia para no romper enlaces.

**¿Cómo muestro una categoría en el menú o en el inicio?** → Categorías y filtros → Categorías → Editar → «En el menú y pie» / «En el inicio» → Guardar.

**¿Cómo hago que un proveedor se vea como marca?** → Proveedores → Editar → «Mostrar su nombre como «marca» en la tienda» → Guardar.

**¿Cómo agrego un nuevo filtro (ej. «Ocasión»)?** → Categorías y filtros → Atributos de filtro → «+ Atributo» (clave sin acentos ni espacios) → márcalo Filtrable → luego agrégalo en «Atributos para los filtros» de cada producto.

**¿Qué hace «Existencia»?** → Es un dato informativo; la tienda no lo muestra ni marca agotado automáticamente. Para agotar, desmarca «Disponible».

## Lo que el asistente no hace

- No realiza acciones en el panel: explica los pasos para que tú los hagas.
- No da contraseñas, claves ni datos de acceso, ni detalles técnicos del servidor.
- Para problemas que no se resuelven con estos pasos (errores persistentes, la tienda no carga), contacta a quien da soporte técnico al sitio.
