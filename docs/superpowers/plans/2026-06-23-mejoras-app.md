# Mejoras App — Paraíso Food Garden Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mejorar el rendimiento, la UX y la facilidad de administración de la landing page del food court Paraíso Food Garden en 4 capas ordenadas.

**Architecture:** HTML + CSS + JS puro sin frameworks. Se separan datos de lógica (negocios.js), se agrega feedback visual de carga, se implementa PWA con service worker para cache offline, y se provee un script local de compresión de imágenes.

**Tech Stack:** Vanilla JS, CSS3, Web APIs (Service Worker, Cache API, localStorage), Node.js + Sharp (solo para compress.js local)

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `negocios.js` | Crear | Solo el array `negocios[]` — sin lógica |
| `compress.js` | Crear | Script Node.js de compresión de imágenes |
| `manifest.json` | Crear | Metadatos PWA para instalación |
| `sw.js` | Crear | Service worker — cache offline |
| `.gitignore` | Crear | Excluir node_modules |
| `app.js` | Modificar | Remover array, splash localStorage, spinner, próximamente, filtros animados, registro SW |
| `style.css` | Modificar | Estilos spinner, próximamente, animación filtros |
| `index.html` | Modificar | Agregar manifest + script negocios.js |
| `assets/negocios/*/menu*.jpg` | Renombrar + comprimir | Archivos de menú normalizados |
| `CLAUDE.md` | Modificar | Convención de archivos + estados actualizados |

---

### Task 1: Crear negocios.js y actualizar index.html y app.js

**Files:**
- Create: `negocios.js`
- Modify: `index.html`
- Modify: `app.js`

- [ ] **Step 1: Crear negocios.js** con el array completo (rutas ya actualizadas con los nuevos nombres que se usarán en Task 2):

```js
const negocios = [
  {
    id: 'la-cafetera',
    nombre: 'La Cafetera',
    categoria: 'Café',
    logo: 'assets/negocios/la-cafetera/Cafetera.jpeg',
    menu: 'assets/negocios/la-cafetera/menu-01.jpg',
    tipo: 'imagen',
  },
  {
    id: 'dejamu',
    nombre: 'Dejamu',
    categoria: 'Fusión',
    logo: 'assets/negocios/dejamu/image_495.png',
    menu: 'assets/negocios/dejamu/menu-01.jpg',
    tipo: 'imagen',
  },
  {
    id: 'satomi-bento',
    nombre: 'Satomi Bento',
    categoria: 'Japonés',
    logo: 'assets/negocios/satomi-bento/SATOMI-1.png',
    menu: 'https://menupp.co/satomibento',
    tipo: 'externo',
  },
  {
    id: 'cafe-pintado',
    nombre: 'Café Pintado',
    categoria: 'Café',
    logo: 'assets/negocios/cafe-pintado/images.png',
    menu: 'assets/negocios/cafe-pintado/menu-01.jpg',
    tipo: 'imagen',
  },
  {
    id: 'el-obelisco',
    nombre: 'Obelisco',
    categoria: 'Caleño',
    logo: 'assets/negocios/el-obelisco/Elobelisco.jpg',
    menu: 'https://menupp.co/obeliscodeli/venue/15b835df-6bdd-490f-93a3-82ab0387ee16/menu/43286df3-bfc0-48a9-832d-8db80a8e8621',
    tipo: 'externo',
  },
  {
    id: 'el-bochinche',
    nombre: 'El Bochinche',
    categoria: 'Colombiano',
    logo: 'assets/negocios/el-bochinche/images.jpg',
    menu: [
      'assets/negocios/el-bochinche/menu-01.jpg',
      'assets/negocios/el-bochinche/menu-02.jpg',
    ],
    tipo: 'imagen',
  },
  {
    id: 'cali-coffee-tour',
    nombre: 'Cali Coffee Tour',
    categoria: 'Café',
    destacado: true,
    logo: 'assets/negocios/cali-coffee-tour/images.jpg',
    menu: 'https://menupp.co/coffeemaster/venue/nu9KOuY1SXmbrxiFVKKL/menu/6f3a7cb9-74f9-4792-af2e-68527d230006',
    tipo: 'externo',
  },
  {
    id: 'sabor-peruano',
    nombre: 'Sabor Peruano',
    categoria: 'Peruano',
    logo: 'assets/negocios/sabor-peruano/logo.jpg',
    menu: 'assets/negocios/sabor-peruano/menu-01.jpg',
    tipo: 'imagen',
  },
  {
    id: 'uepa-ve',
    nombre: "Mirá! Uepa'Ve",
    categoria: 'Wraps & Arepas',
    logo: 'assets/negocios/uepa-ve/Mira ve.png',
    menu: [
      'assets/negocios/uepa-ve/menu-01.jpg',
      'assets/negocios/uepa-ve/menu-02.jpg',
      'assets/negocios/uepa-ve/menu-03.jpg',
    ],
    tipo: 'imagen',
  },
  {
    id: 'bandeja-coreana',
    nombre: 'Bandeja Coreana',
    categoria: 'Coreano',
    logo: 'assets/negocios/bandeja-coreana/logo.jpg',
    menu: [
      'assets/negocios/bandeja-coreana/menu-01.jpg',
      'assets/negocios/bandeja-coreana/menu-02.jpg',
      'assets/negocios/bandeja-coreana/menu-03.jpg',
    ],
    tipo: 'imagen',
  },
  {
    id: 'monster-park',
    nombre: 'Monster Park',
    categoria: 'Entretenimiento',
    logo: 'assets/negocios/monster-park/logo.jpeg',
    menu: 'assets/negocios/monster-park/menu-01.jpg',
    tipo: 'imagen',
  },
];
```

- [ ] **Step 2: Agregar `negocios.js` en `index.html`** — insertar antes del script de `app.js`:

```html
  <script src="menus.js"></script>
  <script src="negocios.js"></script>
  <script src="app.js"></script>
```

- [ ] **Step 3: Eliminar el array `negocios` de `app.js`** — borrar desde la línea 1 hasta la línea 111 (todo el `const negocios = [...]` incluyendo el comentario de ejemplo al final). El archivo debe quedar empezando en la función `renderNegocios()`.

- [ ] **Step 4: Verificar en el navegador** — abrir `index.html` con el servidor local. Las 11 tarjetas deben aparecer igual que antes. Abrir la consola y verificar que no hay errores de `negocios is not defined`.

- [ ] **Step 5: Commit**

```bash
git add negocios.js index.html app.js
git commit -m "refactor: separar datos de negocios a negocios.js"
```

---

### Task 2: Renombrar archivos de menú

**Files:**
- Modify: `assets/negocios/la-cafetera/`
- Modify: `assets/negocios/el-bochinche/`
- Modify: `assets/negocios/uepa-ve/`
- Modify: `assets/negocios/bandeja-coreana/`

- [ ] **Step 1: Renombrar archivos** — ejecutar en Git Bash desde la raíz del proyecto:

```bash
mv "assets/negocios/la-cafetera/menu_page-0001 (1).jpg" "assets/negocios/la-cafetera/menu-01.jpg"

mv "assets/negocios/el-bochinche/Menu Unicentro Horizontal_compressed_page-0001.jpg" "assets/negocios/el-bochinche/menu-01.jpg"
mv "assets/negocios/el-bochinche/Menu Unicentro Horizontal_compressed_page-0002.jpg" "assets/negocios/el-bochinche/menu-02.jpg"

mv "assets/negocios/uepa-ve/Menu Mira Uepa Ve_page-0001.jpg" "assets/negocios/uepa-ve/menu-01.jpg"
mv "assets/negocios/uepa-ve/Menu Mira Uepa Ve_page-0002.jpg" "assets/negocios/uepa-ve/menu-02.jpg"
mv "assets/negocios/uepa-ve/Menu Mira Uepa Ve_page-0003.jpg" "assets/negocios/uepa-ve/menu-03.jpg"

mv "assets/negocios/bandeja-coreana/menu_page-0001.jpg" "assets/negocios/bandeja-coreana/menu-01.jpg"
mv "assets/negocios/bandeja-coreana/menu_page-0002.jpg" "assets/negocios/bandeja-coreana/menu-02.jpg"
mv "assets/negocios/bandeja-coreana/menu_page-0003.jpg" "assets/negocios/bandeja-coreana/menu-03.jpg"
```

- [ ] **Step 2: Verificar** — abrir el menú de La Cafetera, El Bochinche, Uepa'Ve y Bandeja Coreana en el navegador. Deben mostrar sus imágenes correctamente con las nuevas rutas ya configuradas en `negocios.js` desde Task 1.

- [ ] **Step 3: Commit**

```bash
git add assets/
git commit -m "refactor: normalizar nombres de archivos de menú a menu-0N.jpg"
```

---

### Task 3: Script compress.js + comprimir imágenes existentes

**Files:**
- Create: `compress.js`
- Create: `.gitignore`

- [ ] **Step 1: Crear `.gitignore`** en la raíz del proyecto:

```
node_modules/
package-lock.json
```

- [ ] **Step 2: Inicializar npm e instalar Sharp**

```bash
npm init -y
npm install sharp
```

Esperar a que termine la instalación. Sharp descarga binarios nativos — puede tomar 30-60 segundos.

- [ ] **Step 3: Crear `compress.js`**

```js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const NEGOCIOS_DIR = path.join(__dirname, 'assets', 'negocios');
const MAX_SIZE_KB = 300;
const MAX_WIDTH = 1000;
const QUALITY = 75;

async function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
      continue;
    }
    if (!/\.(jpg|jpeg|png)$/i.test(entry.name)) continue;

    const stats = fs.statSync(fullPath);
    const sizeKB = Math.round(stats.size / 1024);

    if (sizeKB <= MAX_SIZE_KB) {
      console.log(`  OK     ${path.relative(NEGOCIOS_DIR, fullPath)} (${sizeKB} KB)`);
      continue;
    }

    const isPng = /\.png$/i.test(entry.name);
    const tmpPath = fullPath + '.tmp';
    const pipeline = sharp(fullPath).resize({ width: MAX_WIDTH, withoutEnlargement: true });
    await (isPng ? pipeline.png({ compressionLevel: 9 }) : pipeline.jpeg({ quality: QUALITY })).toFile(tmpPath);

    fs.renameSync(tmpPath, fullPath);
    const after = Math.round(fs.statSync(fullPath).size / 1024);
    console.log(`  FIXED  ${path.relative(NEGOCIOS_DIR, fullPath)}: ${sizeKB} KB → ${after} KB (−${sizeKB - after} KB)`);
  }
}

console.log('Comprimiendo imágenes de menú...\n');
processDir(NEGOCIOS_DIR)
  .then(() => console.log('\nListo.'))
  .catch(err => { console.error(err); process.exit(1); });
```

- [ ] **Step 4: Ejecutar el script**

```bash
node compress.js
```

Salida esperada (aproximada):
```
Comprimiendo imágenes de menú...

  FIXED  bandeja-coreana/menu-01.jpg: 1400 KB → 180 KB (−1220 KB)
  FIXED  bandeja-coreana/menu-02.jpg: 1300 KB → 165 KB (−1135 KB)
  FIXED  bandeja-coreana/menu-03.jpg: 2300 KB → 210 KB (−2090 KB)
  FIXED  el-bochinche/menu-01.jpg: 4900 KB → 290 KB (−4610 KB)
  FIXED  el-bochinche/menu-02.jpg: 4800 KB → 285 KB (−4515 KB)
  OK     la-cafetera/menu-01.jpg (126 KB)
  FIXED  uepa-ve/menu-01.jpg: 1800 KB → 220 KB (−1580 KB)
  FIXED  uepa-ve/menu-02.jpg: 1600 KB → 195 KB (−1405 KB)
  FIXED  uepa-ve/menu-03.jpg: 1600 KB → 195 KB (−1405 KB)

Listo.
```

- [ ] **Step 5: Verificar calidad visual** — abrir El Bochinche y Bandeja Coreana en el navegador. El texto del menú debe leerse con claridad.

- [ ] **Step 6: Commit** — solo los archivos del proyecto, no node_modules:

```bash
git add .gitignore compress.js package.json assets/
git commit -m "feat: script compress.js + comprimir imágenes de menú (~90% reducción)"
```

---

### Task 4: Spinner de carga y modal "próximamente"

**Files:**
- Modify: `style.css`
- Modify: `app.js`

- [ ] **Step 1: Agregar CSS** — añadir al final de `style.css` antes del cierre del archivo:

```css
/* ─── Spinner de carga de menú ───────────────────────────── */
.menu-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 2rem;
  min-width: 60vw;
  min-height: 40vh;
  color: var(--color-gold);
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.menu-spinner::before {
  content: '';
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(201, 168, 76, 0.2);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Modal próximamente ─────────────────────────────────── */
.menu-proximamente {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 2rem;
  background: var(--color-card-bg);
  border-radius: 12px;
  text-align: center;
  min-width: min(60vw, 280px);
  max-width: 320px;
}

.menu-proximamente h3 {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.04em;
}

.menu-proximamente p {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: #999;
  line-height: 1.6;
}
```

- [ ] **Step 2: Reemplazar el bloque `tipo === 'imagen'` en `abrirModal`** — en `app.js`, reemplazar desde el comentario `// Imagen: mostrar en lightbox...` hasta el final de `abrirModal` (antes de `function cerrarModal`) con este código:

```js
  // Imagen: mostrar en lightbox con fullscreen móvil y pinch-to-zoom
  const prevMedia = modalContent.querySelector('img, iframe, .pdf-viewer, .menu-html, .img-viewer, .menu-proximamente');
  if (prevMedia) prevMedia.remove();

  const isMobileImg = window.innerWidth <= 600;
  if (isMobileImg) overlay.classList.add('modal-fullscreen');

  const viewer = document.createElement('div');
  viewer.className = 'img-viewer';

  const spinner = document.createElement('div');
  spinner.className = 'menu-spinner';
  spinner.textContent = 'Cargando menú…';
  viewer.appendChild(spinner);
  modalContent.appendChild(viewer);

  overlay.classList.add('activo');
  document.body.style.overflow = 'hidden';
  viewer.scrollTop = 0;

  const pages = Array.isArray(negocio.menu) ? negocio.menu : [negocio.menu];

  const probe = new Image();
  probe.src = pages[0];

  probe.addEventListener('load', () => {
    spinner.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'img-zoom-wrapper';
    pages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Menú de ${negocio.nombre}`;
      img.draggable = false;
      wrapper.appendChild(img);
    });
    viewer.appendChild(wrapper);
    requestAnimationFrame(() => {
      if (isMobileImg) initPinchZoom(viewer, wrapper);
    });
  });

  probe.addEventListener('error', () => {
    viewer.remove();
    const prox = document.createElement('div');
    prox.className = 'menu-proximamente';
    prox.innerHTML = `
      <h3>Menú próximamente</h3>
      <p>Este negocio aún no ha enviado su menú.<br>Vuelve pronto.</p>
    `;
    modalContent.appendChild(prox);
  });
}
```

- [ ] **Step 3: Actualizar `cerrarModal`** — agregar `.menu-proximamente` al selector de limpieza:

```js
function cerrarModal() {
  overlay.classList.remove('activo');
  overlay.classList.remove('modal-fullscreen');
  document.body.style.overflow = '';
  const prevMedia = modalContent.querySelector('img, iframe, .pdf-viewer, .menu-html, .img-viewer, .menu-proximamente');
  if (prevMedia) prevMedia.remove();
}
```

- [ ] **Step 4: Verificar spinner** — abrir El Bochinche. Debe aparecer el spinner dorado girando mientras carga, luego las imágenes.

- [ ] **Step 5: Verificar próximamente** — abrir Dejamu (o Café Pintado). Debe aparecer el modal con el mensaje "Menú próximamente" en vez de pantalla negra.

- [ ] **Step 6: Commit**

```bash
git add style.css app.js
git commit -m "feat: spinner de carga y modal próximamente para menús sin imagen"
```

---

### Task 5: Splash una sola vez

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Reemplazar el bloque de splash** al final de `app.js` — cambiar:

```js
/* ── Splash de bienvenida ────────────────────────────────── */
const splash = document.getElementById('splash');
if (splash) {
  setTimeout(() => splash.remove(), 2500);
}
```

Por:

```js
/* ── Splash de bienvenida (solo primera visita) ──────────── */
const splash = document.getElementById('splash');
if (splash) {
  if (localStorage.getItem('paraiso_visited')) {
    splash.remove();
  } else {
    localStorage.setItem('paraiso_visited', '1');
    setTimeout(() => splash.remove(), 2500);
  }
}
```

- [ ] **Step 2: Verificar primera visita** — borrar `localStorage` en DevTools (Application → Local Storage → limpiar) y recargar. El splash debe aparecer.

- [ ] **Step 3: Verificar visitas siguientes** — recargar sin borrar `localStorage`. El splash no debe aparecer — la grilla se ve directo.

- [ ] **Step 4: Commit**

```bash
git add app.js
git commit -m "feat: splash solo en primera visita (localStorage)"
```

---

### Task 6: Animación en filtros

**Files:**
- Modify: `style.css`
- Modify: `app.js`

- [ ] **Step 1: Agregar `opacity` a la transición existente de `.negocio-card`** en `style.css`:

Buscar la regla `.negocio-card` y reemplazar la propiedad `transition`:

```css
.negocio-card {
  /* ... resto igual ... */
  transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
              border-color 0.2s ease,
              box-shadow 0.25s cubic-bezier(0.22,1,0.36,1),
              opacity 0.2s ease;
  /* ... resto igual ... */
}
```

- [ ] **Step 2: Agregar clase `.negocio-card.oculta`** en `style.css`, después de la regla `.negocio-card:hover`:

```css
.negocio-card.oculta {
  opacity: 0;
  transform: scale(0.93);
  pointer-events: none;
}
```

- [ ] **Step 3: Reemplazar el handler del filtro** en `app.js` dentro de `renderFiltros()`:

Reemplazar:
```js
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filtro-btn');
    if (!btn) return;
    bar.querySelectorAll('.filtro-btn').forEach((b) => b.classList.remove('activo'));
    btn.classList.add('activo');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.negocio-card').forEach((card) => {
      const match = cat === 'Todos' || card.dataset.categoria === cat;
      card.style.display = match ? '' : 'none';
    });
  });
```

Por:
```js
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filtro-btn');
    if (!btn) return;
    bar.querySelectorAll('.filtro-btn').forEach((b) => b.classList.remove('activo'));
    btn.classList.add('activo');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.negocio-card').forEach((card) => {
      const match = cat === 'Todos' || card.dataset.categoria === cat;
      if (match) {
        card.style.display = '';
        requestAnimationFrame(() => card.classList.remove('oculta'));
      } else {
        card.classList.add('oculta');
        setTimeout(() => {
          if (card.classList.contains('oculta')) card.style.display = 'none';
        }, 220);
      }
    });
  });
```

- [ ] **Step 4: Verificar** — hacer clic en un filtro de categoría. Las tarjetas deben desaparecer con fade + escala suave, y las que quedan deben entrar suavemente.

- [ ] **Step 5: Commit**

```bash
git add style.css app.js
git commit -m "feat: animación fade + scale en filtros de categoría"
```

---

### Task 7: manifest.json (PWA — instalable)

**Files:**
- Create: `manifest.json`
- Modify: `index.html`

- [ ] **Step 1: Crear `manifest.json`** en la raíz del proyecto:

```json
{
  "name": "Paraíso Food Garden",
  "short_name": "Paraíso",
  "description": "Menús del food court Paraíso Food Garden · Unicentro Cali",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#1a2e1a",
  "theme_color": "#1a2e1a",
  "icons": [
    {
      "src": "assets/logo-paradiso.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}
```

- [ ] **Step 2: Enlazar el manifest en `index.html`** — agregar dentro de `<head>` después de la línea `<link rel="apple-touch-icon" ...>`:

```html
  <link rel="manifest" href="manifest.json" />
```

- [ ] **Step 3: Verificar** — abrir Chrome DevTools → Application → Manifest. Debe mostrar nombre, colores e ícono sin errores.

- [ ] **Step 4: Commit**

```bash
git add manifest.json index.html
git commit -m "feat: manifest.json para PWA instalable"
```

---

### Task 8: Service Worker (cache offline)

**Files:**
- Create: `sw.js`
- Modify: `app.js`

- [ ] **Step 1: Crear `sw.js`** en la raíz del proyecto:

```js
const CACHE_NAME = 'paraiso-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './app.js',
  './negocios.js',
  './menus.js',
  './style.css',
  './manifest.json',
  './assets/logo-paradiso.svg',
  './assets/negocios/placeholder-logo.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Solo interceptar requests del mismo origen
  if (url.origin !== self.location.origin) return;

  // Assets estáticos (HTML, JS, CSS, SVG): cache first
  if (STATIC_ASSETS.some(a => url.pathname.endsWith(a.replace('./', '/')))) {
    e.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
    return;
  }

  // Imágenes (logos y menús): cache on demand
  if (/\.(jpg|jpeg|png|svg|webp)$/i.test(url.pathname)) {
    e.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // Todo lo demás: network first
  e.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
```

- [ ] **Step 2: Registrar el service worker** en `app.js` — agregar al final del archivo, después del bloque del splash:

```js
/* ── Service Worker ──────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
```

- [ ] **Step 3: Verificar instalación** — abrir la app en Chrome. En DevTools → Application → Service Workers debe aparecer el SW con estado "activated and is running".

- [ ] **Step 4: Verificar cache** — en DevTools → Application → Cache Storage → `paraiso-v1` deben verse los assets estáticos precacheados.

- [ ] **Step 5: Verificar offline** — en DevTools → Network → marcar "Offline". Recargar la página. Debe cargar correctamente desde cache.

- [ ] **Step 6: Commit**

```bash
git add sw.js app.js
git commit -m "feat: service worker con cache offline (PWA completa)"
```

---

### Task 9: Actualizar CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Actualizar la sección de estructura de archivos** — agregar `negocios.js`, `compress.js`, `manifest.json` y `sw.js` al árbol de archivos.

- [ ] **Step 2: Agregar sección de convención de archivos** después de la sección "Cómo preparar una imagen de menú desde un PDF":

```markdown
## Convención de nombres de archivo

| Tipo | Nombre | Límite |
|------|--------|--------|
| Logo | `logo.jpg` | máx 200 KB, 500×500 px |
| Menú pág. 1 | `menu-01.jpg` | máx 300 KB, 1000 px ancho |
| Menú pág. 2+ | `menu-02.jpg`, `menu-03.jpg`… | máx 300 KB, 1000 px ancho |

**Regla:** sin espacios, sin tildes, todo en minúsculas.

Antes de hacer push, correr `node compress.js` para comprimir automáticamente cualquier imagen nueva que supere los 300 KB.
```

- [ ] **Step 3: Actualizar la tabla de estado de negocios** — marcar El Bochinche y Bandeja Coreana como listos, actualizar los pendientes.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: actualizar CLAUDE.md con convenciones y estados"
```

---

### Task 10: Push final y verificación en producción

- [ ] **Step 1: Push a master**

```bash
git push origin master
```

- [ ] **Step 2: Esperar el deploy de Netlify** (~1-2 minutos).

- [ ] **Step 3: Verificar en el celular** — escanear el QR y comprobar:
  - Splash solo aparece la primera vez
  - Los menús abren con spinner antes de mostrar las imágenes
  - Dejamu / Café Pintado / Sabor Peruano / Monster Park muestran "Menú próximamente"
  - Los filtros animan suavemente
  - Chrome en Android ofrece "Añadir a pantalla de inicio"

- [ ] **Step 4: Verificar offline** — activar modo avión y recargar. El sitio debe cargar desde cache.
