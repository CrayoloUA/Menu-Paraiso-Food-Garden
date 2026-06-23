# Plan de mejora — Paraíso Food Garden
**Fecha:** 2026-06-23  
**Stack:** HTML + CSS + JS puro, sin frameworks  
**Hosting:** Netlify (auto-deploy desde GitHub)

---

## Contexto

Landing page mobile-first para el food court Paraíso Food Garden en Unicentro Cali. Los clientes llegan escaneando un QR físico en el local. Actualmente tiene 11 negocios, varios con problemas críticos de rendimiento y contenido.

### Problemas identificados

| Problema | Impacto |
|----------|---------|
| El Bochinche: 9.7MB en imágenes de menú | Carga 10+ seg en datos móviles |
| Bandeja Coreana: 5MB, Uepa'Ve: 5MB | Carga lenta |
| 4 negocios con menú roto en silencio | Modal abre pero no muestra nada |
| Splash se repite en cada visita | Frustrante para usuarios frecuentes |
| Sin feedback mientras carga el menú | Pantalla negra sin explicación |
| Filtros sin animación | Transición brusca |
| Sin PWA / cache offline | Sin señal = sin acceso |
| `negocios[]` mezclado con lógica en `app.js` | Difícil de mantener |
| Nombres de archivo con espacios y tildes | Frágil en servidores |

---

## Enfoque: Por capas, de lo urgente a lo avanzado

### Capa 1 — Contenido y rendimiento

**Compresión de imágenes:**
- Script `compress.js` (Node.js + Sharp) que procesa todos los `assets/negocios/*/menu*.jpg`
- Target: máx 300KB por página, 1000px de ancho, calidad 75%
- Se corre con `node compress.js` antes de cada push
- Reporta en consola los archivos procesados y el ahorro en MB

**Menús faltantes — detección automática:**
- Si `menu` apunta a un archivo que no existe o es una ruta vacía, el visor muestra automáticamente un modal "Menú próximamente" estilizado
- `app.js` se modifica una sola vez con la lógica de detección; después no hay que tocarlo cuando llegan nuevos negocios sin menú
- Los 4 afectados actualmente: Dejamu, Café Pintado, Sabor Peruano, Monster Park

**Normalización de archivos:**
- Renombrar todos los archivos de menú a `menu-01.jpg`, `menu-02.jpg`, etc.
- Actualizar rutas en `negocios.js` (ver Capa 4)
- Convención: sin espacios, sin tildes, sin mayúsculas

### Capa 2 — Experiencia de usuario

**Splash una sola vez:**
- Guardar `paraiso_visited = true` en `localStorage` al mostrar el splash
- En visitas siguientes: saltar el splash y mostrar la grilla de inmediato
- Se resetea si el usuario borra el caché (comportamiento esperado)

**Spinner de carga en menús de imagen:**
- Al abrir el modal de un negocio tipo `imagen`, mostrar un spinner animado (verde/dorado) mientras carga la primera página
- El spinner desaparece cuando la primera imagen dispara el evento `load`
- Las páginas siguientes cargan en segundo plano (ya implementado con `Array.isArray`)

**Animación en filtros:**
- Reemplazar `display: none` por fade + scale (opacity + transform, 0.2s)
- Las tarjetas que se ocultan salen con fade-out; las que aparecen entran con fade-in
- No requiere cambiar el HTML

**Modal "Próximamente" estilizado:**
- Diseño en paleta del sitio: fondo crema `#f5f0e8`, texto en verde oscuro, ícono dorado
- Texto: "Menú próximamente" + línea secundaria discreta
- Mismo border-radius y estilo que el resto del modal

### Capa 3 — PWA

**manifest.json:**
```json
{
  "name": "Paraíso Food Garden",
  "short_name": "Paraíso",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a2e1a",
  "theme_color": "#1a2e1a",
  "icons": [{ "src": "assets/logo-paradiso.svg", "sizes": "any" }]
}
```

**Service Worker (`sw.js`):**
- Cache estático (pre-cache al instalar): `index.html`, `app.js`, `negocios.js`, `style.css`, todos los logos
- Cache dinámico (bajo demanda): imágenes de menú cuando el usuario las abre por primera vez
- Estrategia: Cache First para assets estáticos, Network First con fallback para el HTML
- Versión de cache en variable (`CACHE_VERSION = 'v1'`): incrementar en cada deploy para forzar actualización

**Instalación:**
- `<link rel="manifest" href="manifest.json">` en `index.html`
- Registro de SW en `app.js`: `navigator.serviceWorker.register('./sw.js')`
- Compatible con Chrome Android y Safari iOS

### Capa 4 — Administración

**Separar datos de lógica:**
- Mover `negocios[]` de `app.js` a `negocios.js` (nuevo archivo)
- `negocios.js` contiene solo el array — sin funciones, sin lógica
- `app.js` importa el array vía `<script src="negocios.js">` antes de `app.js` en `index.html`

**Script de compresión (`compress.js`):**
- Requiere: `npm install sharp` (solo una vez, no se sube al repo)
- Detecta imágenes > 200KB en `assets/negocios/`
- Comprime en sitio (sobreescribe el archivo original)
- Muestra tabla con: archivo, tamaño antes, tamaño después, % reducido

**Convención documentada en CLAUDE.md:**
```
Logos:  logo.jpg       — máx 200KB, 500×500px
Menús:  menu-01.jpg    — máx 300KB/página, 1000px ancho
Regla:  sin espacios, sin tildes, sin mayúsculas en nombres de archivo
```

---

## Archivos que se crean o modifican

| Archivo | Acción |
|---------|--------|
| `compress.js` | Nuevo — script de compresión |
| `sw.js` | Nuevo — service worker |
| `manifest.json` | Nuevo |
| `negocios.js` | Nuevo — datos extraídos de app.js |
| `app.js` | Modificar: splash localStorage, spinner, filtros animados, modal próximamente, registro SW |
| `style.css` | Modificar: estilos spinner, modal próximamente, animación filtros |
| `index.html` | Modificar: agregar manifest, agregar `<script src="negocios.js">` |
| `CLAUDE.md` | Actualizar: convención de archivos, tabla de estados |
| `assets/negocios/*/menu*.jpg` | Comprimir y renombrar |

---

## Orden de implementación sugerido

1. `negocios.js` (separar datos — base para todo lo demás)
2. `compress.js` + compresión de imágenes existentes
3. Renombrar archivos de menú + actualizar rutas en `negocios.js`
4. Modal "próximamente" automático
5. Spinner de carga en menús de imagen
6. Splash una sola vez (localStorage)
7. Animación en filtros
8. `manifest.json` + `sw.js`
9. Actualizar `CLAUDE.md`
