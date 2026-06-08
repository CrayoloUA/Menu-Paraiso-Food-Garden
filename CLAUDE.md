# Paraíso Food Garden — Landing Page

## ¿Qué es este proyecto?

Landing page mobile-first para **Paraíso Food Garden**, food court ubicado en **Unicentro Cali**. Los clientes llegan escaneando un **código QR** físico en el local. La página muestra los logos de cada negocio del food court y al tocar cada uno, abre el menú del restaurante directamente en la misma app.

**Hosting:** Netlify Drop (gratis, drag & drop).
**Stack:** HTML + CSS + JavaScript puro — sin frameworks, sin servidor, sin dependencias de npm.

---

## Estructura de archivos

```
Menu/
├── index.html          # Página principal
├── app.js              # Lógica: tarjetas, filtros, modal, menús
├── menus.js            # Datos de los menús de cada negocio (EN CONSTRUCCIÓN)
├── style.css           # Todos los estilos
├── CLAUDE.md           # Este archivo
├── assets/
│   ├── logo-paradiso.svg           # Logo principal del food court
│   ├── negocios/                   # Logos de cada negocio
│   │   ├── la-cafetera/
│   │   │   ├── Cafetera.jpeg       # Logo
│   │   │   └── menu.pdf            # Menú escaneado (solo referencia)
│   │   ├── dejamu/
│   │   ├── satomi-bento/
│   │   ├── cafe-pintado/
│   │   ├── el-obelisco/
│   │   ├── el-bochinche/
│   │   ├── cali-coffee-tour/
│   │   ├── sabor-peruano/
│   │   ├── uepa-ve/
│   │   └── monster-park/
│   └── pdfjs/                      # PDF.js v4 (instalado, actualmente sin uso)
└── docs/
    └── superpowers/
        ├── specs/                  # Diseño original
        └── plans/                  # Plan de implementación
```

---

## Negocios registrados

| ID | Nombre | Categoría | Tipo menú |
|----|--------|-----------|-----------|
| `la-cafetera` | La Cafetera | Café | HTML (transcrito) |
| `dejamu` | Dejamu | Fusión | pendiente |
| `satomi-bento` | Satomi Bento | Japonés | pendiente |
| `cafe-pintado` | Café Pintado | Café | pendiente |
| `el-obelisco` | El Obelisco | Caleño | pendiente |
| `el-bochinche` | El Bochinche | Colombiano | pendiente |
| `cali-coffee-tour` | Cali Coffee Tour | Café | externo (Menupp.co) |
| `sabor-peruano` | Sabor Peruano | Peruano | pendiente |
| `uepa-ve` | Mirá! Uepa'Ve | Wraps & Arepas | pendiente |
| `monster-park` | Monster Park | Entretenimiento | pendiente |

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
| `'html'` | Renderiza el menú desde `menus.js` dentro del modal (preferido para móvil) |
| `'imagen'` | Abre una imagen del menú en lightbox |
| `'pdf'` | Abre el PDF con PDF.js dentro del modal |
| `'externo'` | Abre una URL externa en nueva pestaña |

### Modal / Lightbox
- Se abre al tocar cualquier tarjeta
- Se cierra con el botón X, tocando fuera, presionando Escape, o haciendo swipe hacia abajo (>80px)
- Para tipo `'html'` renderiza el menú desde `menus.js`

---

## Plan actual: transcribir menús en HTML

**Decisión tomada:** Los PDFs se ven muy mal en celular. En vez de usar PDFs o imágenes, se va a transcribir cada menú como datos estructurados en `menus.js` y se renderizarán como HTML estilizado dentro del modal.

### Estructura de `menus.js`
```javascript
const menus = {
  'la-cafetera': {
    secciones: [
      {
        titulo: 'Nombre de la sección',
        nota: 'Nota opcional debajo del título',       // opcional
        items: [
          { nombre: 'Producto', precio: 5500 },
          { nombre: 'Producto con descripción', precio: 9800, desc: 'descripción corta' },
        ]
      }
    ]
  }
};
```

### Función de render del menú HTML
Se llama desde `abrirModal()` en `app.js` cuando `negocio.tipo === 'html'`. Genera una lista con secciones, nombres y precios formateados en pesos colombianos.

---

## Diseño / Estética

- **Paleta:** Verde selva oscuro `#1a2e1a` + dorado `#c9a84c` + crema `#f5f0e8`
- **Tipografía:** Pinyon Script (títulos cursivos) + Montserrat (cuerpo)
- **Mobile-first:** Grid 2 col → 3 col (600px+) → 4 col (900px+)
- **Animaciones:** Entrada de tarjetas escalonada, hover con glow dorado
- **Filtros:** Scroll horizontal (no wrap) para manejar muchas categorías en móvil

---

## Cómo agregar un negocio nuevo

1. Crear carpeta `assets/negocios/<id-del-negocio>/`
2. Copiar el logo ahí (JPG recomendado, max 600px, ~30KB)
3. Agregar entrada en el array `negocios[]` de `app.js`
4. Si el menú es HTML, agregar su entrada en `menus.js`

```javascript
// En app.js — ejemplo
{
  id: 'nuevo-negocio',
  nombre: 'Nombre del Negocio',
  categoria: 'Categoría',
  logo: 'assets/negocios/nuevo-negocio/logo.jpg',
  menu: 'html',           // para menú transcrito
  tipo: 'html',
},
```

---

## Cómo actualizar un precio o ítem del menú

Editar directamente `menus.js` — buscar el negocio por su ID y modificar el ítem correspondiente.

---

## Deploy a Netlify

1. Abrir [netlify.com/drop](https://netlify.com/drop)
2. Arrastrar la carpeta `Menu/` completa al área de drop
3. Netlify genera una URL pública automáticamente
4. Con esa URL, generar el QR en [qr-code-generator.com](https://www.qr-code-generator.com) o similar
5. Imprimir el QR y pegarlo en el local

---

## Estado actual

- [x] Estructura base del sitio
- [x] 10 negocios con logos
- [x] Filtros por categoría
- [x] Tarjeta destacada (Cali Coffee Tour)
- [x] Splash de bienvenida
- [x] Optimización de imágenes (comprimidas ~60-70%)
- [x] Optimización mobile (touch targets, viewport, fuentes subsetadas)
- [x] PDF.js instalado (disponible si se necesita)
- [ ] `menus.js` — transcribir menús de cada negocio (EN PROGRESO)
- [ ] Deploy a Netlify
- [ ] Generación del QR
