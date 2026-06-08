# Paraíso Food Garden — Landing Page

## ¿Qué es este proyecto?

Landing page mobile-first para **Paraíso Food Garden**, food court ubicado en **Unicentro Cali**. Los clientes llegan escaneando un **código QR** físico en el local. La página muestra los logos de cada negocio del food court y al tocar cada uno, abre el menú del restaurante directamente en la misma app.

**Hosting:** Netlify (conectado a GitHub, auto-deploy en cada push).
**Repo:** https://github.com/CrayoloUA/Menu-Paraiso-Food-Garden
**Stack:** HTML + CSS + JavaScript puro — sin frameworks, sin servidor, sin dependencias de npm.

---

## Estructura de archivos

```
Menu/
├── index.html          # Página principal
├── app.js              # Lógica: tarjetas, filtros, modal, visor de menús
├── style.css           # Todos los estilos
├── CLAUDE.md           # Este archivo
└── assets/
    ├── logo-paradiso.svg           # Logo principal del food court
    ├── negocios/                   # Logos e imágenes de menú de cada negocio
    │   ├── placeholder-logo.svg    # Fallback cuando falla un logo
    │   ├── la-cafetera/
    │   │   ├── Cafetera.jpeg                 # Logo
    │   │   └── menu_page-0001 (1).jpg        # Imagen del menú
    │   ├── dejamu/
    │   ├── satomi-bento/
    │   ├── cafe-pintado/
    │   ├── el-obelisco/
    │   ├── el-bochinche/
    │   ├── cali-coffee-tour/
    │   ├── sabor-peruano/
    │   ├── uepa-ve/
    │   └── monster-park/
    └── pdfjs/                      # PDF.js v4 (disponible si se necesita)
```

---

## Negocios registrados

| ID | Nombre | Categoría | Tipo menú | Estado |
|----|--------|-----------|-----------|--------|
| `la-cafetera` | La Cafetera | Café | `imagen` | Listo |
| `dejamu` | Dejamu | Fusión | `imagen` | Pendiente imagen |
| `satomi-bento` | Satomi Bento | Japonés | `externo` | Listo (Toteat) |
| `cafe-pintado` | Café Pintado | Café | `imagen` | Pendiente imagen |
| `el-obelisco` | El Obelisco | Caleño | `imagen` | Pendiente imagen |
| `el-bochinche` | El Bochinche | Colombiano | `imagen` | Pendiente imagen |
| `cali-coffee-tour` | Cali Coffee Tour | Café | `externo` | Listo (Menupp.co) |
| `sabor-peruano` | Sabor Peruano | Peruano | `imagen` | Pendiente imagen |
| `uepa-ve` | Mirá! Uepa'Ve | Wraps & Arepas | `imagen` | Pendiente imagen |
| `monster-park` | Monster Park | Entretenimiento | `imagen` | Pendiente imagen |

---

## Cómo funciona la app

### Tarjetas (`app.js`)
- `negocios[]` — array con los datos de cada negocio (id, nombre, categoría, logo, tipo de menú)
- `renderNegocios()` — genera el HTML de las tarjetas dinámicamente
- `renderFiltros()` — genera los botones de filtro por categoría desde las categorías únicas del array
- La tarjeta de **Cali Coffee Tour** tiene `destacado: true` → ocupa 2 columnas con layout horizontal

### Tipos de menú (`tipo` en cada negocio)

| Tipo | Comportamiento |
|------|----------------|
| `'imagen'` | Abre la imagen del menú en visor fullscreen con pinch-to-zoom |
| `'externo'` | Abre una URL externa en nueva pestaña |
| `'pdf'` | Abre el PDF con PDF.js dentro del modal (disponible, sin uso actual) |

### Visor de menú (tipo `imagen`)
- Se abre fullscreen en móvil (sin márgenes)
- Pinch-to-zoom hasta 4x, centrado en el punto donde están los dedos
- Panning con un dedo cuando hay zoom activo
- Doble tap para zoom 2.5x o resetear
- Solo se cierra con el botón X (el swipe no cierra para evitar accidentes)
- Zoom del 4% aplicado en CSS para recortar bordes blancos de PDFs exportados como imagen

### Menú externo (tipo `externo`)
- Abre la URL en nueva pestaña
- La tarjeta muestra "Abrir menú" en vez de "Ver menú"

---

## Decisión de diseño: menús como imágenes JPG

Los PDFs se ven mal en celular y son difíciles de navegar. La solución adoptada:

- **Menús con texto/precios simples** → imagen JPG del menú
- **Menús con app propia** → enlace externo (`tipo: 'externo'`)

### Cómo preparar una imagen de menú desde un PDF
1. Abrir el PDF
2. Exportar cada página como JPG (800px de ancho, calidad 80%)
3. Guardar en `assets/negocios/<id>/menu.jpg`
4. En `app.js` poner `tipo: 'imagen'`

Los bordes blancos del PDF se recortan automáticamente con el zoom de 4% del visor.

---

## Diseño / Estética

- **Paleta:** Verde selva oscuro `#1a2e1a` + dorado `#c9a84c` + crema `#f5f0e8`
- **Tipografía:** Pinyon Script (títulos cursivos) + Montserrat (cuerpo)
- **Mobile-first:** Grid 2 col → 3 col (600px+) → 4 col (900px+)
- **Animaciones:** Splash de bienvenida, entrada escalonada de tarjetas, hover con glow dorado
- **Filtros:** Scroll horizontal sin wrap para manejar muchas categorías en móvil

---

## Cómo agregar un negocio nuevo

1. Crear carpeta `assets/negocios/<id-del-negocio>/`
2. Copiar el logo (JPG recomendado, max 600px, ~30KB)
3. Copiar la imagen del menú como `menu.jpg` (800px ancho, 80% calidad)
4. Agregar entrada en el array `negocios[]` de `app.js`

```javascript
// En app.js — ejemplo negocio con imagen
{
  id: 'nuevo-negocio',
  nombre: 'Nombre del Negocio',
  categoria: 'Categoría',
  logo: 'assets/negocios/nuevo-negocio/logo.jpg',
  menu: 'assets/negocios/nuevo-negocio/menu.jpg',
  tipo: 'imagen',
},

// En app.js — ejemplo negocio con menú externo
{
  id: 'nuevo-negocio',
  nombre: 'Nombre del Negocio',
  categoria: 'Categoría',
  logo: 'assets/negocios/nuevo-negocio/logo.jpg',
  menu: 'https://url-del-menu.com',
  tipo: 'externo',
},
```

---

## Cómo actualizar la imagen del menú de un negocio

1. Preparar la nueva imagen (800px ancho, 80% calidad JPG)
2. Reemplazar el archivo en `assets/negocios/<id>/menu.jpg`
3. Si el nombre del archivo cambia, actualizar el campo `menu:` en `app.js`
4. Hacer commit y push — Netlify actualiza automáticamente

---

## Deploy

El proyecto está conectado a Netlify via GitHub:
- Cada `git push` a `master` despliega automáticamente
- No se necesita arrastrar archivos manualmente

Para generar el QR una vez desplegado:
- Tomar la URL de Netlify
- Generar el QR en [qr-code-generator.com](https://www.qr-code-generator.com)
- Imprimir y pegar en el local

---

## Estado actual

- [x] Estructura base del sitio
- [x] 10 negocios con logos
- [x] Filtros por categoría
- [x] Tarjeta destacada (Cali Coffee Tour)
- [x] Splash de bienvenida
- [x] Optimización de imágenes (comprimidas ~60-70%)
- [x] Optimización mobile (touch targets, viewport, fuentes subsetadas)
- [x] Visor fullscreen en móvil para imágenes de menú
- [x] Pinch-to-zoom en visor de imágenes
- [x] Zoom centrado en el punto de pellizco
- [x] Panning al arrastrar con un dedo con zoom activo
- [x] Doble tap para zoom/reset
- [x] Repositorio en GitHub con auto-deploy a Netlify
- [x] La Cafetera — imagen del menú lista
- [x] Satomi Bento — menú externo (Toteat)
- [x] Cali Coffee Tour — menú externo (Menupp.co)
- [ ] Dejamu — pendiente imagen del menú
- [ ] Café Pintado — pendiente imagen del menú
- [ ] El Obelisco — pendiente imagen del menú
- [ ] El Bochinche — pendiente imagen del menú
- [ ] Sabor Peruano — pendiente imagen del menú
- [ ] Mirá! Uepa'Ve — pendiente imagen del menú
- [ ] Monster Park — pendiente imagen del menú
- [ ] Generación del QR final
