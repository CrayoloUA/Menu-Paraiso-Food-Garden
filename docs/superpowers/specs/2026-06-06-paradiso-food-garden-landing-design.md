# Landing Page — Paradiso Food Garden

**Fecha:** 2026-06-06
**Cliente:** Paradiso Food Garden, Unicentro Cali

---

## Objetivo

Crear una landing page mobile-first accesible mediante QR físico en el lugar, que muestre todos los negocios del food garden como tarjetas y permita al cliente ver el menú de cada uno (imagen o PDF) sin salir de la página.

---

## Identidad visual

- **Inspiración:** Logo de Paradiso Food Garden — círculo de hierro forjado sobre muro de follaje verde
- **Fondo:** Verde oscuro tipo selva (`#1a2e1a`) con textura sutil de hojas
- **Tarjetas:** Blanco roto / crema (`#f5f0e8`) con borde dorado sutil
- **Tipografía título:** Cursiva elegante — Google Font "Pinyon Script" (o "Great Vibes")
- **Tipografía cuerpo:** Sans-serif limpia — Montserrat
- **Acento:** Dorado suave (`#c9a84c`) para detalles, bordes y hover
- **Mood general:** Jardín tropical, orgánico, sofisticado

---

## Estructura de la página (mobile-first)

```
Header
  └── Logo/nombre "Paradiso Food Garden" en tipografía cursiva
  └── Fondo: imagen de follaje verde oscuro
  └── Subtítulo: "Descubrí nuestros sabores"

Sección principal
  └── Grilla 2 columnas (en desktop: 3-4 columnas)
  └── Cada tarjeta:
        - Foto o logo del negocio (imagen cuadrada, object-fit: cover)
        - Nombre del negocio debajo
        - Clic/tap → abre visor de menú

Visor de menú (modal/lightbox)
  └── Se abre al tocar una tarjeta
  └── Muestra la imagen del menú en pantalla completa
  └── Soporte para pellizcar/zoom (touch)
  └── Si es PDF: se abre en iframe o link de descarga
  └── Botón X para cerrar

Footer
  └── "Paraíso Food Garden · Unicentro Cali"
```

---

## Comportamiento del visor de menú

- **Imágenes:** Lightbox nativo con zoom por pellizco (touch-action: pinch-zoom)
- **PDFs de una hoja:** Se muestran como imagen dentro del lightbox
- **PDFs de varias páginas:** Se abre en un `<iframe>` o con botón "Ver menú completo" que abre en nueva pestaña
- Un toque fuera del modal lo cierra

---

## Tecnología

| Aspecto | Decisión |
|---|---|
| Stack | HTML + CSS + JavaScript puro (sin frameworks) |
| Hosting | Netlify Drop (arrastrar carpeta = URL lista) |
| Costo | Gratis |
| Fuentes | Google Fonts (cargadas con `preconnect` para velocidad) |
| Assets | Imágenes comprimidas en WebP para carga rápida en celular |
| Actualizar menú | Reemplazar archivo de imagen/PDF y re-subir a Netlify (2 min) |

---

## Estructura de archivos

```
/
├── index.html
├── style.css
├── app.js
├── assets/
│   ├── logo-paradiso.png       ← logo del food garden
│   ├── bg-follaje.jpg          ← textura de fondo
│   └── negocios/
│       ├── sie7e-pk2/
│       │   ├── logo.webp
│       │   └── menu.jpg        ← imagen del menú escaneado
│       ├── el-obelisco/
│       │   ├── logo.webp
│       │   └── menu.jpg
│       ├── el-bochinche/
│       │   ├── logo.webp
│       │   └── menu.jpg
│       ├── sushi-break/
│       │   ├── logo.webp
│       │   └── menu.jpg
│       ├── cali-coffee-tour/
│       │   ├── logo.webp
│       │   └── menu.jpg
│       └── [resto de negocios...]
└── docs/
    └── superpowers/specs/...
```

---

## Datos de negocios (configuración en app.js)

Cada negocio se define como un objeto en un array dentro de `app.js`:

```js
const negocios = [
  {
    id: "sie7e-pk2",
    nombre: "Sie7e Pk2",
    logo: "assets/negocios/sie7e-pk2/logo.webp",
    menu: "assets/negocios/sie7e-pk2/menu.jpg",
    tipo: "pdf" // o "imagen"
  },
  // ... resto
];
```

Para agregar un negocio nuevo: añadir un objeto al array y poner los archivos en su carpeta.

---

## Lo que se necesita del cliente antes de implementar

- [ ] Logo de Paradiso Food Garden en alta resolución
- [ ] Lista completa de los negocios del food garden
- [ ] Logo o foto de portada de cada negocio
- [ ] Menú escaneado (imagen o PDF) de cada negocio

*Mientras no lleguen los assets reales, se usan placeholders para poder construir y previsualizar.*

---

## Fuera de scope (para esta versión)

- Panel de administración para editar negocios sin tocar código
- Sistema de pedidos o pagos
- Integración con Menüpp u otras plataformas
- Multiidioma
- Analytics / estadísticas de visitas
