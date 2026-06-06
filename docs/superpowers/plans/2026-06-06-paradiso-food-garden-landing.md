# Landing Page Paradiso Food Garden — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una landing page mobile-first con grilla de negocios y visor de menús (lightbox) en HTML/CSS/JS puro, sin frameworks ni servidor.

**Architecture:** Una sola página HTML que carga un array de negocios desde `app.js` y los renderiza dinámicamente como tarjetas. Al hacer clic en una tarjeta se abre un modal/lightbox que muestra la imagen o PDF del menú a pantalla completa con soporte de zoom táctil nativo.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), JavaScript ES6+ vanilla, Google Fonts (Pinyon Script + Montserrat), Netlify Drop para hosting.

---

## Mapa de archivos

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Estructura semántica: header, sección grilla, modal, footer |
| `style.css` | Toda la presentación: variables, layout, tarjetas, modal, responsive |
| `app.js` | Datos de negocios + lógica de renderizado + lógica del lightbox |
| `assets/logo-paradiso.png` | Logo del food garden (placeholder SVG hasta recibir el real) |
| `assets/bg-follaje.jpg` | Textura de fondo del header (placeholder hasta recibir la real) |
| `assets/negocios/<id>/logo.webp` | Foto/logo de cada negocio |
| `assets/negocios/<id>/menu.jpg` | Menú escaneado de cada negocio |

---

## Task 1: Estructura de carpetas y HTML base

**Files:**
- Create: `index.html`
- Create: `style.css` (vacío por ahora)
- Create: `app.js` (vacío por ahora)
- Create: `assets/negocios/` (carpeta vacía)

- [ ] **Paso 1: Crear la estructura de carpetas**

En la terminal, desde la raíz del proyecto:

```powershell
mkdir assets
mkdir assets\negocios
New-Item style.css -ItemType File
New-Item app.js -ItemType File
```

- [ ] **Paso 2: Crear `index.html` con estructura semántica completa**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#1a2e1a" />
  <title>Paraíso Food Garden · Unicentro Cali</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- HEADER -->
  <header class="site-header">
    <div class="header-inner">
      <img src="assets/logo-paradiso.png" alt="Paraíso Food Garden" class="header-logo" />
      <h1 class="header-title">Paraíso Food Garden</h1>
      <p class="header-subtitle">Descubrí nuestros sabores</p>
    </div>
  </header>

  <!-- GRILLA DE NEGOCIOS -->
  <main>
    <section class="negocios-grid" id="negocios-grid">
      <!-- Las tarjetas se inyectan dinámicamente desde app.js -->
    </section>
  </main>

  <!-- MODAL / LIGHTBOX -->
  <div class="modal-overlay" id="modal-overlay" role="dialog" aria-modal="true" aria-label="Menú del negocio">
    <div class="modal-content" id="modal-content">
      <button class="modal-close" id="modal-close" aria-label="Cerrar menú">&#x2715;</button>
      <!-- La imagen o iframe se inyecta dinámicamente -->
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="site-footer">
    <p>Paraíso Food Garden &middot; Unicentro Cali</p>
  </footer>

  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Paso 3: Verificar en el navegador**

Abrir `index.html` directamente en el navegador (doble clic o arrastrar). Debe verse:
- Página en blanco con el texto "Paraíso Food Garden" y "Descubrí nuestros sabores"
- Sin errores en la consola del navegador (F12 → Console)

- [ ] **Paso 4: Commit**

```bash
git init
git add index.html style.css app.js assets/
git commit -m "feat: scaffold inicial — estructura HTML y carpetas"
```

---

## Task 2: Variables CSS y estilos base

**Files:**
- Modify: `style.css`

- [ ] **Paso 1: Escribir el CSS base con variables y reset**

Reemplazar el contenido de `style.css` con:

```css
/* ─── Variables ──────────────────────────────────────────── */
:root {
  --color-bg:       #1a2e1a;
  --color-card-bg:  #f5f0e8;
  --color-gold:     #c9a84c;
  --color-gold-dim: #a08535;
  --color-text:     #2a1f0e;
  --color-text-inv: #f5f0e8;
  --font-title:     'Pinyon Script', cursive;
  --font-body:      'Montserrat', sans-serif;
  --radius-card:    12px;
  --shadow-card:    0 4px 16px rgba(0,0,0,0.25);
}

/* ─── Reset ──────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text-inv);
  min-height: 100vh;
}

img {
  display: block;
  max-width: 100%;
}
```

- [ ] **Paso 2: Verificar en el navegador**

Recargar `index.html`. El fondo ahora debe ser verde oscuro (`#1a2e1a`) y el texto debe verse en color crema. Sin errores en consola.

- [ ] **Paso 3: Commit**

```bash
git add style.css
git commit -m "style: variables CSS, reset y estilos base"
```

---

## Task 3: Header con identidad visual

**Files:**
- Modify: `style.css`
- Create: `assets/logo-paradiso.png` (placeholder SVG guardado como PNG)

- [ ] **Paso 1: Crear placeholder SVG para el logo**

Crear el archivo `assets/logo-paradiso.svg` con este contenido (placeholder circular hasta recibir el logo real):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <circle cx="100" cy="100" r="95" fill="#1a2e1a" stroke="#c9a84c" stroke-width="4"/>
  <text x="100" y="85" text-anchor="middle" font-family="serif" font-size="22" fill="#c9a84c">Paraíso</text>
  <text x="100" y="110" text-anchor="middle" font-family="serif" font-size="13" fill="#f5f0e8">Food Garden</text>
</svg>
```

En `index.html`, actualizar el src del logo:
```html
<img src="assets/logo-paradiso.svg" alt="Paraíso Food Garden" class="header-logo" />
```

- [ ] **Paso 2: Agregar CSS del header a `style.css`**

Agregar al final de `style.css`:

```css
/* ─── Header ─────────────────────────────────────────────── */
.site-header {
  position: relative;
  background-color: #0d1a0d;
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(41,82,41,0.4) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.1) 0%, transparent 50%);
  padding: 2.5rem 1rem 2rem;
  text-align: center;
  border-bottom: 2px solid var(--color-gold);
}

.header-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.header-logo {
  width: 110px;
  height: 110px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(201,168,76,0.4));
}

.header-title {
  font-family: var(--font-title);
  font-size: 3rem;
  font-weight: 400;
  color: var(--color-gold);
  line-height: 1.1;
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
}

.header-subtitle {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-inv);
  opacity: 0.75;
}
```

- [ ] **Paso 3: Verificar en el navegador**

Recargar. El header debe mostrar:
- Fondo muy oscuro con degradado sutil
- Logo SVG circular dorado
- "Paraíso Food Garden" en tipografía cursiva dorada (carga desde Google Fonts)
- Subtítulo en Montserrat, en mayúsculas, color crema

> Nota: Si la tipografía cursiva no carga, verificar conexión a internet — Google Fonts la descarga en el primer render.

- [ ] **Paso 4: Commit**

```bash
git add style.css assets/logo-paradiso.svg index.html
git commit -m "style: header con identidad visual Paradiso"
```

---

## Task 4: Datos de negocios en app.js

**Files:**
- Modify: `app.js`

- [ ] **Paso 1: Escribir el array de negocios con placeholders**

Reemplazar el contenido de `app.js` con:

```js
const negocios = [
  {
    id: 'sie7e-pk2',
    nombre: 'Sie7e Pk2',
    logo: 'assets/negocios/sie7e-pk2/logo.webp',
    menu: 'assets/negocios/sie7e-pk2/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'el-obelisco',
    nombre: 'El Obelisco',
    logo: 'assets/negocios/el-obelisco/logo.webp',
    menu: 'assets/negocios/el-obelisco/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'el-bochinche',
    nombre: 'El Bochinche',
    logo: 'assets/negocios/el-bochinche/logo.webp',
    menu: 'assets/negocios/el-bochinche/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'sushi-break',
    nombre: 'Sushi Break',
    logo: 'assets/negocios/sushi-break/logo.webp',
    menu: 'assets/negocios/sushi-break/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'cali-coffee-tour',
    nombre: 'Cali Coffee Tour',
    logo: 'assets/negocios/cali-coffee-tour/logo.webp',
    menu: 'assets/negocios/cali-coffee-tour/menu.jpg',
    tipo: 'imagen',
  },
  // Agregar más negocios aquí siguiendo el mismo patrón.
  // tipo: 'imagen' → abre JPG/PNG en lightbox
  // tipo: 'pdf'    → abre PDF en iframe
];
```

- [ ] **Paso 2: Verificar en consola del navegador**

Abrir DevTools (F12) → Console y escribir:
```
negocios.length
```
Debe retornar `5`. Sin errores de sintaxis.

- [ ] **Paso 3: Commit**

```bash
git add app.js
git commit -m "feat: datos de negocios con placeholders en app.js"
```

---

## Task 5: Renderizado de la grilla de tarjetas

**Files:**
- Modify: `app.js`
- Modify: `style.css`
- Create: `assets/negocios/<id>/` (carpetas con SVG placeholder para cada negocio)

- [ ] **Paso 1: Crear carpetas y logos placeholder para los 5 negocios**

```powershell
foreach ($id in @('sie7e-pk2','el-obelisco','el-bochinche','sushi-break','cali-coffee-tour')) {
  New-Item -ItemType Directory -Path "assets\negocios\$id" -Force
}
```

Crear `assets/negocios/placeholder-logo.svg` (se reutiliza para todos hasta tener los reales):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <rect width="300" height="300" fill="#2a3d2a"/>
  <text x="150" y="140" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#c9a84c">Logo</text>
  <text x="150" y="165" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#f5f0e8">del negocio</text>
</svg>
```

Actualizar el array en `app.js` para que todos los logos apunten al placeholder mientras no lleguen los reales:

```js
const negocios = [
  {
    id: 'sie7e-pk2',
    nombre: 'Sie7e Pk2',
    logo: 'assets/negocios/placeholder-logo.svg',
    menu: 'assets/negocios/placeholder-menu.svg',
    tipo: 'imagen',
  },
  {
    id: 'el-obelisco',
    nombre: 'El Obelisco',
    logo: 'assets/negocios/placeholder-logo.svg',
    menu: 'assets/negocios/placeholder-menu.svg',
    tipo: 'imagen',
  },
  {
    id: 'el-bochinche',
    nombre: 'El Bochinche',
    logo: 'assets/negocios/placeholder-logo.svg',
    menu: 'assets/negocios/placeholder-menu.svg',
    tipo: 'imagen',
  },
  {
    id: 'sushi-break',
    nombre: 'Sushi Break',
    logo: 'assets/negocios/placeholder-logo.svg',
    menu: 'assets/negocios/placeholder-menu.svg',
    tipo: 'imagen',
  },
  {
    id: 'cali-coffee-tour',
    nombre: 'Cali Coffee Tour',
    logo: 'assets/negocios/placeholder-logo.svg',
    menu: 'assets/negocios/placeholder-menu.svg',
    tipo: 'imagen',
  },
];
```

Crear `assets/negocios/placeholder-menu.svg` (simula una carta escaneada):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
  <rect width="400" height="600" fill="#f5f0e8"/>
  <text x="200" y="80" text-anchor="middle" font-family="serif" font-size="28" fill="#1a2e1a">Menú</text>
  <line x1="40" y1="110" x2="360" y2="110" stroke="#c9a84c" stroke-width="2"/>
  <text x="200" y="160" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#555">Plato 1 .......... $25.000</text>
  <text x="200" y="195" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#555">Plato 2 .......... $32.000</text>
  <text x="200" y="230" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#555">Plato 3 .......... $28.000</text>
  <text x="200" y="290" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#999">[Reemplazar con menú escaneado real]</text>
</svg>
```

- [ ] **Paso 2: Agregar función `renderNegocios()` a `app.js`**

Agregar al final de `app.js` (después del array `negocios`):

```js
function renderNegocios() {
  const grid = document.getElementById('negocios-grid');
  grid.innerHTML = negocios.map((negocio) => `
    <article
      class="negocio-card"
      data-id="${negocio.id}"
      data-menu="${negocio.menu}"
      data-tipo="${negocio.tipo}"
      data-nombre="${negocio.nombre}"
      role="button"
      tabindex="0"
      aria-label="Ver menú de ${negocio.nombre}"
    >
      <div class="card-img-wrap">
        <img
          src="${negocio.logo}"
          alt="${negocio.nombre}"
          loading="lazy"
          onerror="this.src='assets/negocios/placeholder-logo.svg'"
        />
      </div>
      <p class="card-nombre">${negocio.nombre}</p>
    </article>
  `).join('');
}

renderNegocios();
```

- [ ] **Paso 3: Agregar CSS de la grilla y las tarjetas a `style.css`**

Agregar al final de `style.css`:

```css
/* ─── Grilla de negocios ─────────────────────────────────── */
.negocios-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem 1rem;
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 600px) {
  .negocios-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 900px) {
  .negocios-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ─── Tarjeta de negocio ─────────────────────────────────── */
.negocio-card {
  background-color: var(--color-card-bg);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  border: 1.5px solid transparent;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
}

.negocio-card:hover,
.negocio-card:focus-visible {
  transform: translateY(-4px);
  border-color: var(--color-gold);
  box-shadow: 0 8px 24px rgba(201,168,76,0.25);
  outline: none;
}

.card-img-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: #2a3d2a;
}

.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.negocio-card:hover .card-img-wrap img {
  transform: scale(1.05);
}

.card-nombre {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  padding: 0.6rem 0.5rem;
  letter-spacing: 0.02em;
}
```

- [ ] **Paso 4: Verificar en el navegador**

Recargar. Deben verse 5 tarjetas en grilla de 2 columnas con:
- Fondo verde oscuro en el cuadrado de imagen (logo placeholder)
- Nombre del negocio debajo en texto oscuro
- Al hacer hover, la tarjeta sube levemente y aparece borde dorado
- En pantalla ancha (600px+) pasan a 3 columnas

- [ ] **Paso 5: Commit**

```bash
git add app.js style.css assets/negocios/
git commit -m "feat: grilla de tarjetas renderizada desde array de negocios"
```

---

## Task 6: Lightbox para imágenes de menú

**Files:**
- Modify: `app.js`
- Modify: `style.css`

- [ ] **Paso 1: Agregar CSS del modal a `style.css`**

Agregar al final de `style.css`:

```css
/* ─── Modal / Lightbox ───────────────────────────────────── */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.92);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-overlay.activo {
  display: flex;
}

.modal-content {
  position: relative;
  max-width: 100%;
  max-height: 90vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.modal-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  touch-action: pinch-zoom;
  border-radius: 6px;
}

.modal-content iframe {
  width: 90vw;
  height: 85vh;
  border: none;
  border-radius: 6px;
}

.modal-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(0,0,0,0.7);
  color: #fff;
  border: 1.5px solid rgba(201,168,76,0.6);
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1010;
  transition: background-color 0.15s;
}

.modal-close:hover {
  background-color: rgba(201,168,76,0.3);
}
```

- [ ] **Paso 2: Agregar lógica del lightbox a `app.js`**

Agregar al final de `app.js`:

```js
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const btnCerrar = document.getElementById('modal-close');

function abrirModal(negocio) {
  // Limpiar contenido anterior (salvo el botón X)
  const prevMedia = modalContent.querySelector('img, iframe, a.modal-pdf-link');
  if (prevMedia) prevMedia.remove();

  if (negocio.tipo === 'pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = negocio.menu;
    iframe.title = `Menú de ${negocio.nombre}`;
    modalContent.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = negocio.menu;
    img.alt = `Menú de ${negocio.nombre}`;
    modalContent.appendChild(img);
  }

  overlay.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  overlay.classList.remove('activo');
  document.body.style.overflow = '';
  const prevMedia = modalContent.querySelector('img, iframe');
  if (prevMedia) prevMedia.remove();
}

// Abrir al hacer clic en una tarjeta
document.getElementById('negocios-grid').addEventListener('click', (e) => {
  const card = e.target.closest('.negocio-card');
  if (!card) return;
  const negocio = negocios.find((n) => n.id === card.dataset.id);
  if (negocio) abrirModal(negocio);
});

// También responder a teclado (Enter / Space) para accesibilidad
document.getElementById('negocios-grid').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.negocio-card');
  if (!card) return;
  e.preventDefault();
  const negocio = negocios.find((n) => n.id === card.dataset.id);
  if (negocio) abrirModal(negocio);
});

// Cerrar con botón X
btnCerrar.addEventListener('click', cerrarModal);

// Cerrar al hacer clic en el overlay (fuera del contenido)
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) cerrarModal();
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
});
```

- [ ] **Paso 3: Verificar en el navegador**

1. Recargar y hacer clic en cualquier tarjeta → debe abrirse el modal con fondo oscuro y la imagen SVG placeholder del menú.
2. Hacer clic en la X → debe cerrarse.
3. Hacer clic fuera del modal (en el overlay oscuro) → debe cerrarse.
4. Presionar Escape → debe cerrarse.
5. En un celular real o en DevTools con vista móvil: el pellizco (pinch-zoom) debe funcionar sobre la imagen del menú.

- [ ] **Paso 4: Commit**

```bash
git add app.js style.css
git commit -m "feat: lightbox para ver menús con zoom táctil y cierre por overlay/Escape"
```

---

## Task 7: Footer

**Files:**
- Modify: `style.css`

- [ ] **Paso 1: Agregar CSS del footer a `style.css`**

Agregar al final de `style.css`:

```css
/* ─── Footer ─────────────────────────────────────────────── */
.site-footer {
  text-align: center;
  padding: 1.5rem 1rem;
  border-top: 1px solid rgba(201,168,76,0.3);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: rgba(245,240,232,0.5);
  text-transform: uppercase;
}
```

- [ ] **Paso 2: Verificar en el navegador**

Al hacer scroll hasta el final: debe verse el footer con el texto "Paraíso Food Garden · Unicentro Cali" en color crema tenue, con línea dorada arriba.

- [ ] **Paso 3: Commit**

```bash
git add style.css
git commit -m "style: footer con línea dorada y texto tenue"
```

---

## Task 8: Reemplazar assets placeholder con los reales

**Files:**
- Modify: `assets/logo-paradiso.svg` → reemplazar con el PNG/SVG real
- Modify: `assets/negocios/<id>/logo.webp` → logo real de cada negocio
- Modify: `assets/negocios/<id>/menu.jpg` → menú escaneado real
- Modify: `app.js` → actualizar rutas si cambian

- [ ] **Paso 1: Reemplazar el logo de Paradiso**

Cuando el cliente entregue el logo real:
1. Guardar como `assets/logo-paradiso.png` (o `.webp` para menor peso)
2. En `index.html` actualizar: `src="assets/logo-paradiso.png"`
3. Verificar que se vea correctamente en el header

- [ ] **Paso 2: Agregar los negocios reales al array en `app.js`**

Por cada negocio del food garden:
1. Crear carpeta `assets/negocios/<id>/`
2. Guardar el logo como `logo.webp` (convertir a WebP con [Squoosh](https://squoosh.app/) para menor peso, apuntar a menos de 100 KB)
3. Guardar el menú escaneado como `menu.jpg` (menos de 500 KB — usar Squoosh o comprimir al escanear)
4. Agregar el objeto al array en `app.js`:

```js
{
  id: 'nombre-del-negocio',        // sin espacios ni tildes
  nombre: 'Nombre del Negocio',    // como se verá en pantalla
  logo: 'assets/negocios/nombre-del-negocio/logo.webp',
  menu: 'assets/negocios/nombre-del-negocio/menu.jpg',
  tipo: 'imagen',                  // 'imagen' o 'pdf'
},
```

Para menús PDF (cartas de varias páginas):
```js
{
  id: 'negocio-con-pdf',
  nombre: 'Negocio Con PDF',
  logo: 'assets/negocios/negocio-con-pdf/logo.webp',
  menu: 'assets/negocios/negocio-con-pdf/menu.pdf',
  tipo: 'pdf',
},
```

- [ ] **Paso 3: Verificar cada negocio**

Por cada negocio agregado:
1. Recargar la página — la tarjeta debe aparecer con el logo real
2. Hacer clic — el menú real debe abrirse en el lightbox
3. En el celular: pellizcar para ampliar el menú y leer los precios

- [ ] **Paso 4: Commit por cada lote de negocios**

```bash
git add assets/negocios/ app.js
git commit -m "feat: agregar negocios reales — [lista de negocios]"
```

---

## Task 9: Verificación final y checklist mobile

- [ ] **Paso 1: Checklist mobile en celular real**

Abrir la página en el celular (abrir el HTML directamente o desde un servidor local). Verificar:

| Ítem | Esperado |
|---|---|
| Carga inicial | Rápida, sin imágenes rotas |
| Header | Logo y título visibles, tipografía cursiva cargada |
| Grilla | 2 columnas bien alineadas |
| Tarjeta | Toque → abre lightbox |
| Lightbox imagen | Menú a pantalla completa, se puede hacer zoom con pellizco |
| Lightbox PDF | Menú visible en iframe, se puede hacer scroll |
| Cerrar modal | X, toque fuera y Escape funcionan |
| Footer | Visible al final del scroll |
| Sin errores | DevTools console sin errores rojos |

- [ ] **Paso 2: Verificar en pantalla ancha (laptop/tablet)**

Abrir en un navegador de escritorio. La grilla debe pasar a 3 o 4 columnas. El modal debe verse centrado con la imagen a tamaño razonable.

- [ ] **Paso 3: Commit final**

```bash
git add .
git commit -m "chore: verificación final completa — listo para Netlify"
```

---

## Task 10: Deploy en Netlify Drop

- [ ] **Paso 1: Ir a [drop.netlify.com](https://drop.netlify.com)**

Abrir el navegador y entrar a `https://drop.netlify.com`.

- [ ] **Paso 2: Arrastrar la carpeta del proyecto**

Arrastrar la carpeta raíz del proyecto (la que contiene `index.html`) al área de drop de Netlify. Netlify la sube en segundos y genera una URL pública (ej: `https://paradiso-xxxxx.netlify.app`).

- [ ] **Paso 3: Verificar la URL pública**

Abrir la URL en el celular. Debe funcionar igual que en local.

- [ ] **Paso 4: Opcional — dominio personalizado**

En el panel de Netlify, ir a `Site configuration → Domain management` y configurar un dominio propio (ej: `menu.paraísofoodgarden.co`) si el cliente quiere una URL más elegante para el QR.

- [ ] **Paso 5: Proceso para actualizar menús en el futuro**

Cuando un negocio cambie su menú:
1. Reemplazar el archivo `assets/negocios/<id>/menu.jpg` con la nueva imagen escaneada
2. Volver a arrastrar la carpeta a `drop.netlify.com`
3. Netlify actualiza el sitio en segundos con la misma URL

---

## Resumen de dependencias externas (sin costo)

| Servicio | Uso | Costo |
|---|---|---|
| Google Fonts | Pinyon Script + Montserrat | Gratis |
| Netlify Drop | Hosting del sitio | Gratis |
| Squoosh (squoosh.app) | Comprimir imágenes a WebP | Gratis |
