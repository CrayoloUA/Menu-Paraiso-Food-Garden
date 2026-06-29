# Mejoras UX — Paraíso Food Garden

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar 6 mejoras de UX y correctness en la landing page: fix SW, nombre en modal, indicador de páginas, skeleton loaders, buscador, y ARIA.

**Architecture:** Vanilla HTML/CSS/JS sin frameworks. Todos los cambios son aditivos — no se reescribe lógica existente. Cada tarea es independiente y produce un cambio verificable en navegador.

**Tech Stack:** HTML5, CSS3, JavaScript ES6+, Service Worker API, IntersectionObserver API.

---

## Mapa de archivos

| Archivo | Cambios |
|---------|---------|
| `sw.js` | Agregar `/menus.js` a STATIC_ASSETS, incrementar CACHE_VERSION |
| `app.js` | Modal title, indicador de páginas (IntersectionObserver), skeleton load handler, búsqueda, ARIA |
| `style.css` | Estilos: modal header, página counter, skeleton shimmer, buscador |
| `index.html` | Sin cambios (todo se inyecta dinámicamente desde app.js) |
| `negocios.js` | Sin cambios |

---

## Task 1: Fix Service Worker — menus.js faltante

**Files:**
- Modify: `sw.js` (líneas 1, 9-24)

El archivo `menus.js` (datos de menús HTML) no está en `STATIC_ASSETS`. Si el usuario abre la app offline, los menús tipo `html` no cargan.

- [ ] **Step 1: Editar sw.js — incrementar versión y agregar menus.js**

En `sw.js`, cambiar:
```js
const CACHE_VERSION = 'v2';
```
por:
```js
const CACHE_VERSION = 'v3';
```

Y en el array `STATIC_ASSETS`, agregar `/menus.js` después de `/style.css`:
```js
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/negocios.js',
  '/menus.js',       // ← agregar esta línea
  '/style.css',
  ...
```

- [ ] **Step 2: Verificar en navegador**

Abrir DevTools → Application → Service Workers. Reload la página. Verificar que aparece "paraiso-static-v3" en Cache Storage y que `/menus.js` está incluido.

- [ ] **Step 3: Commit**
```bash
git add sw.js
git commit -m "fix: agregar menus.js a cache del service worker"
```

---

## Task 2: Nombre del negocio visible en modal fullscreen

**Files:**
- Modify: `app.js` (función `abrirModal`, función `cerrarModal`)
- Modify: `style.css` (agregar `.modal-nombre-bar`)

En móvil, el modal es fullscreen y el usuario no sabe en qué negocio está. Se agrega una barra discreta en la parte inferior izquierda con el nombre del negocio.

- [ ] **Step 1: Agregar estilos en style.css**

Al final de `style.css`, agregar:

```css
/* ─── Barra de nombre del negocio en modal ───────────────── */
.modal-nombre-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 1rem 0.6rem;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1005;
  pointer-events: none;
}

.modal-nombre-bar span {
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(245,240,232,0.85);
  text-transform: uppercase;
}

.modal-nombre-bar .modal-page-counter {
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(245,240,232,0.5);
  margin-left: auto;
}
```

- [ ] **Step 2: Agregar elemento al DOM en index.html — no, se inyecta desde app.js**

En `app.js`, al inicio del bloque `/* ── Lightbox ── */`, agregar la variable:

```js
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const btnCerrar = document.getElementById('modal-close');

// Barra inferior con nombre del negocio + contador de página
const nombreBar = document.createElement('div');
nombreBar.className = 'modal-nombre-bar';
nombreBar.innerHTML = '<span id="modal-nombre-text"></span><span class="modal-page-counter" id="modal-page-counter"></span>';
document.body.appendChild(nombreBar);
nombreBar.style.display = 'none';
```

- [ ] **Step 3: Mostrar barra al abrir modal**

En la función `abrirModal`, justo antes de `overlay.classList.add('activo')` en cada rama (imagen, html, pdf), agregar:

```js
document.getElementById('modal-nombre-text').textContent = negocio.nombre;
nombreBar.style.display = 'flex';
```

Esto aplica para las tres ramas: `'html'`, `'pdf'`, y la imagen (rama por defecto).

- [ ] **Step 4: Ocultar barra al cerrar modal**

En `cerrarModal()`, después de `overlay.classList.remove('activo')`, agregar:

```js
nombreBar.style.display = 'none';
document.getElementById('modal-page-counter').textContent = '';
```

- [ ] **Step 5: Verificar**

Abrir cualquier negocio de imagen (ej: El Bochinche). En móvil o DevTools con viewport 390px, debe aparecer el nombre "EL BOCHINCHE" en la parte inferior del visor.

- [ ] **Step 6: Commit**
```bash
git add app.js style.css
git commit -m "feat: mostrar nombre del negocio en barra inferior del modal"
```

---

## Task 3: Indicador de página en visores multipágina

**Files:**
- Modify: `app.js` (rama imagen en `abrirModal`, añadir lógica IntersectionObserver)

Para negocios con múltiples imágenes (El Bochinche: 2, Uepa'Ve: 3, Bandeja Coreana: 3), mostrar "2 / 3" en la barra inferior derecha.

- [ ] **Step 1: Actualizar renderizado de visor de imagen en app.js**

Dentro del bloque `probe.addEventListener('load', () => { ... })` en `abrirModal`, después de `viewer.appendChild(wrapper)` y de `viewer.style.overflowY = 'auto'`, agregar:

```js
// Indicador de página para menús multipágina
const total = pages.length;
if (total > 1) {
  const counter = document.getElementById('modal-page-counter');
  counter.textContent = `1 / ${total}`;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(wrapper.querySelectorAll('img')).indexOf(entry.target);
        if (idx !== -1) counter.textContent = `${idx + 1} / ${total}`;
      }
    });
  }, { root: viewer, threshold: 0.5 });

  wrapper.querySelectorAll('img').forEach(img => observer.observe(img));
}
```

- [ ] **Step 2: Verificar**

Abrir El Bochinche. Debe aparecer "1 / 2" en la esquina inferior derecha. Al hacer scroll hacia abajo, debe cambiar a "2 / 2".

Abrir Mirá! Uepa'Ve. Debe mostrar "1 / 3" → "2 / 3" → "3 / 3" al scrollear.

- [ ] **Step 3: Commit**
```bash
git add app.js
git commit -m "feat: indicador de página 1/N en visor de menús multipágina"
```

---

## Task 4: Skeleton loaders en logos de tarjetas

**Files:**
- Modify: `style.css` (agregar shimmer en `.card-img-wrap`)
- Modify: `app.js` (agregar onload handler en imagen de tarjeta)

Mientras el logo de cada negocio carga, mostrar un efecto shimmer que desaparece cuando la imagen termina de cargar.

- [ ] **Step 1: Agregar estilos del skeleton en style.css**

Al final de la sección `/* ─── Imagen de la tarjeta ─── */`, agregar:

```css
/* ─── Skeleton loader para logos ────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

.card-img-wrap.loading {
  background: linear-gradient(
    90deg,
    #1a2a1a 25%,
    #243624 50%,
    #1a2a1a 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

.card-img-wrap.loading img {
  opacity: 0;
}

.card-img-wrap img {
  transition: opacity 0.3s ease;
}
```

- [ ] **Step 2: Agregar clase loading y quitarla al cargar**

En `renderNegocios()`, en el `<img>` del template literal, agregar `onload` handler:

Cambiar:
```js
<img
  src="${negocio.logo}"
  alt="${negocio.nombre}"
  loading="lazy"
  onerror="this.src='assets/negocios/placeholder-logo.svg'"
/>
```

Por:
```js
<img
  src="${negocio.logo}"
  alt="${negocio.nombre}"
  loading="lazy"
  onload="this.closest('.card-img-wrap').classList.remove('loading')"
  onerror="this.src='assets/negocios/placeholder-logo.svg'; this.closest('.card-img-wrap').classList.remove('loading')"
/>
```

- [ ] **Step 3: Agregar clase loading al card-img-wrap en el template**

En el template de `renderNegocios()`, cambiar:
```js
<div class="card-img-wrap">
```
Por:
```js
<div class="card-img-wrap loading">
```

- [ ] **Step 4: Verificar**

Con DevTools → Network → throttle a "Slow 3G", recargar la página. Los logos deben mostrar un brillo verde-oscuro pulsante mientras cargan, y desvanecerse cuando aparece la imagen.

- [ ] **Step 5: Commit**
```bash
git add app.js style.css
git commit -m "feat: skeleton shimmer en logos mientras cargan"
```

---

## Task 5: Buscador de negocios por nombre

**Files:**
- Modify: `app.js` (función `renderFiltros`, agregar lógica de búsqueda)
- Modify: `style.css` (estilos del input de búsqueda)

Un input de texto encima de los filtros que filtra las tarjetas en tiempo real por nombre del negocio.

- [ ] **Step 1: Agregar estilos del buscador en style.css**

Al final del bloque `/* ─── Barra de filtros ─── */`, agregar:

```css
/* ─── Buscador de negocios ──────────────────────────────── */
.buscador-wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 1rem 0;
}

.buscador-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text-inv);
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(245,240,232,0.18);
  border-radius: 24px;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(245,240,232,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 0.85rem center;
  -webkit-appearance: none;
}

.buscador-input::placeholder {
  color: rgba(245,240,232,0.35);
}

.buscador-input:focus {
  border-color: rgba(201,168,76,0.5);
  background-color: rgba(255,255,255,0.1);
}

.buscador-input::-webkit-search-cancel-button {
  display: none;
}
```

- [ ] **Step 2: Inyectar el buscador en app.js**

En la función `renderFiltros()`, al final (antes del `}`), agregar:

```js
// Buscador
const buscadorWrap = document.createElement('div');
buscadorWrap.className = 'buscador-wrap';
buscadorWrap.innerHTML = '<input class="buscador-input" id="buscador-input" type="search" placeholder="Buscar negocio…" autocomplete="off" />';
main.insertBefore(buscadorWrap, bar);
```

- [ ] **Step 3: Agregar lógica de filtrado por búsqueda**

Después del bloque `bar.addEventListener('click', ...)` dentro de `renderFiltros()`, agregar:

```js
const buscadorInput = document.getElementById('buscador-input');
buscadorInput.addEventListener('input', () => {
  const query = buscadorInput.value.trim().toLowerCase();
  document.querySelectorAll('.negocio-card').forEach((card) => {
    const id = card.dataset.id;
    const negocio = negocios.find(n => n.id === id);
    const match = !query || negocio.nombre.toLowerCase().includes(query);
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
  // Resetear filtro de categoría si hay búsqueda activa
  if (query) {
    bar.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'));
  }
});
```

- [ ] **Step 4: Verificar**

Escribir "café" en el buscador. Deben quedar visibles solo las tarjetas con "café" en el nombre (La Cafetera, Café Pintado). Borrar el texto → vuelven todas.

Escribir "bo" → aparece El Bochinche. Escribir "korea" → aparece Bandeja Coreana.

- [ ] **Step 5: Commit**
```bash
git add app.js style.css
git commit -m "feat: buscador de negocios por nombre en tiempo real"
```

---

## Task 6: Mejoras de accesibilidad ARIA

**Files:**
- Modify: `app.js` (función `abrirModal`, función `cerrarModal`)

El modal actualmente tiene `role="dialog"` y `aria-modal="true"` pero le falta `aria-labelledby` conectado al título, y `aria-expanded` en las tarjetas.

- [ ] **Step 1: Agregar aria-labelledby al overlay en index.html**

En `index.html`, el div `modal-overlay` ya tiene `aria-label`. Reemplazar con `aria-labelledby`:

Cambiar:
```html
<div class="modal-overlay" id="modal-overlay" role="dialog" aria-modal="true" aria-label="Menú del negocio">
```
Por:
```html
<div class="modal-overlay" id="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-nombre-text">
```

- [ ] **Step 2: Mover foco al modal al abrirlo**

En `abrirModal()`, después de `overlay.classList.add('activo')`, agregar:

```js
// Foco accesible: mover al botón de cierre
requestAnimationFrame(() => btnCerrar.focus());
```

- [ ] **Step 3: Restaurar foco al cerrar modal**

En `app.js`, antes de definir `abrirModal`, agregar variable:

```js
let ultimaTarjetaFocusada = null;
```

En `abrirModal()`, al inicio de la función, agregar:

```js
ultimaTarjetaFocusada = document.activeElement;
```

En `cerrarModal()`, al final, agregar:

```js
if (ultimaTarjetaFocusada) ultimaTarjetaFocusada.focus();
```

- [ ] **Step 4: Verificar**

Navegar la página con Tab. Presionar Enter en una tarjeta → debe abrirse el modal. Presionar Escape → debe cerrarse el modal y el foco volver a la tarjeta. Verificar con lector de pantalla si está disponible.

- [ ] **Step 5: Commit**
```bash
git add index.html app.js
git commit -m "feat: mejorar accesibilidad ARIA en modal — foco y labelledby"
```

---

## Orden de ejecución recomendado

1. Task 1 (2 min) — fix crítico
2. Task 2 (15 min) — base para Task 3
3. Task 3 (10 min) — depende del elemento creado en Task 2
4. Task 4 (15 min) — independiente
5. Task 5 (20 min) — independiente
6. Task 6 (10 min) — independiente
