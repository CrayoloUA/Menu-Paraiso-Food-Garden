const negocios = [
  {
    id: 'la-cafetera',
    nombre: 'La Cafetera',
    categoria: 'Café',
    logo: 'assets/negocios/la-cafetera/Cafetera.jpeg',
    menu: 'assets/negocios/la-cafetera/menu.pdf',
    tipo: 'pdf',
  },
  {
    id: 'dejamu',
    nombre: 'Dejamu',
    categoria: 'Fusión',
    logo: 'assets/negocios/dejamu/image_495.png',
    menu: 'assets/negocios/dejamu/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'satomi-bento',
    nombre: 'Satomi Bento',
    categoria: 'Japonés',
    logo: 'assets/negocios/satomi-bento/SATOMI-1.png',
    menu: 'assets/negocios/satomi-bento/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'cafe-pintado',
    nombre: 'Café Pintado',
    categoria: 'Café',
    logo: 'assets/negocios/cafe-pintado/images.png',
    menu: 'assets/negocios/cafe-pintado/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'el-obelisco',
    nombre: 'El Obelisco',
    categoria: 'Caleño',
    logo: 'assets/negocios/el-obelisco/Elobelisco.jpg',
    menu: 'assets/negocios/el-obelisco/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'el-bochinche',
    nombre: 'El Bochinche',
    categoria: 'Colombiano',
    logo: 'assets/negocios/el-bochinche/images.jpg',
    menu: 'assets/negocios/el-bochinche/menu.jpg',
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
    menu: 'assets/negocios/sabor-peruano/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'uepa-ve',
    nombre: "Mirá! Uepa'Ve",
    categoria: 'Wraps & Arepas',
    logo: 'assets/negocios/uepa-ve/Mira ve.png',
    menu: 'assets/negocios/uepa-ve/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'monster-park',
    nombre: 'Monster Park',
    categoria: 'Entretenimiento',
    logo: 'assets/negocios/monster-park/logo.jpeg',
    menu: 'assets/negocios/monster-park/menu.jpg',
    tipo: 'imagen',
  },
  // Para agregar un negocio nuevo, copiar este bloque y completar:
  // {
  //   id: 'nombre-del-negocio',       <- sin espacios ni tildes
  //   nombre: 'Nombre del Negocio',   <- como se verá en pantalla
  //   logo: 'assets/negocios/nombre-del-negocio/logo.jpg',
  //   menu: 'assets/negocios/nombre-del-negocio/menu.jpg',
  //   tipo: 'imagen',                 <- 'imagen', 'pdf' o 'externo'
  //   // si tipo es 'externo', poner la URL completa en el campo menu
  // },
];

/* ── Renderizar tarjetas ─────────────────────────────────── */
function renderNegocios() {
  const grid = document.getElementById('negocios-grid');
  grid.innerHTML = negocios.map((negocio, i) => `
    <article
      class="negocio-card${negocio.destacado ? ' destacada' : ''}"
      data-id="${negocio.id}"
      data-categoria="${negocio.categoria}"
      role="button"
      tabindex="0"
      aria-label="Ver menú de ${negocio.nombre}"
      style="--i: ${i}"
    >
      <div class="card-img-wrap">
        <span class="card-categoria">${negocio.categoria}</span>
        <img
          src="${negocio.logo}"
          alt="${negocio.nombre}"
          loading="lazy"
          onerror="this.src='assets/negocios/placeholder-logo.svg'"
        />
      </div>
      <div class="card-info">
        <p class="card-nombre">${negocio.nombre}</p>
        <span class="card-hint">${negocio.tipo === 'externo' ? 'Abrir menú ↗' : 'Ver menú →'}</span>
      </div>
    </article>
  `).join('');
}

function renderFiltros() {
  const categorias = ['Todos', ...new Set(negocios.map((n) => n.categoria))];
  const bar = document.createElement('div');
  bar.className = 'filtros-bar';
  bar.id = 'filtros-bar';
  bar.innerHTML = categorias.map((cat) => `
    <button class="filtro-btn${cat === 'Todos' ? ' activo' : ''}" data-cat="${cat}">
      ${cat}
    </button>
  `).join('');

  const main = document.querySelector('main');
  main.insertBefore(bar, document.getElementById('negocios-grid'));

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
}

renderNegocios();
renderFiltros();

/* ── Lightbox ────────────────────────────────────────────── */
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const btnCerrar = document.getElementById('modal-close');

function formatearPrecio(precio) {
  if (precio == null) return 'Consultar';
  return '$' + precio.toLocaleString('es-CO');
}

function renderMenuHTML(negocio) {
  const data = typeof menus !== 'undefined' && menus[negocio.id];
  if (!data) return '<p class="menu-vacio">Menú próximamente</p>';

  return data.secciones.map(sec => `
    <div class="menu-seccion">
      <h3 class="menu-seccion-titulo">${sec.titulo}</h3>
      ${sec.nota ? `<p class="menu-seccion-nota">${sec.nota}</p>` : ''}
      <ul class="menu-items">
        ${sec.items.map(item => `
          <li class="menu-item">
            <span class="menu-item-info">
              <span class="menu-item-nombre">${item.nombre}</span>
              ${item.desc ? `<span class="menu-item-desc">${item.desc}</span>` : ''}
            </span>
            <span class="menu-item-precio">${formatearPrecio(item.precio)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

function abrirModal(negocio) {
  if (negocio.tipo === 'externo') {
    window.open(negocio.menu, '_blank', 'noopener,noreferrer');
    return;
  }

  if (negocio.tipo === 'html') {
    const prevMedia = modalContent.querySelector('img, iframe, .pdf-viewer, .menu-html');
    if (prevMedia) prevMedia.remove();

    const wrapper = document.createElement('div');
    wrapper.className = 'menu-html';
    wrapper.innerHTML = `
      <h2 class="menu-titulo">${negocio.nombre}</h2>
      ${renderMenuHTML(negocio)}
    `;
    modalContent.appendChild(wrapper);
    overlay.classList.add('activo');
    document.body.style.overflow = 'hidden';
    return;
  }

  // PDFs: renderizar inline con PDF.js — sin salir de la app
  if (negocio.tipo === 'pdf') {
    const prevMedia = modalContent.querySelector('img, iframe, .pdf-viewer, .menu-html');
    if (prevMedia) prevMedia.remove();

    const isMobile = window.innerWidth <= 600;
    if (isMobile) overlay.classList.add('modal-fullscreen');

    const viewer = document.createElement('div');
    viewer.className = 'pdf-viewer';
    viewer.innerHTML = `<div class="pdf-spinner">Cargando menú…</div>`;
    modalContent.appendChild(viewer);
    overlay.classList.add('activo');
    document.body.style.overflow = 'hidden';

    const pdfUrl = new URL(negocio.menu, window.location.href).href;

    import('./assets/pdfjs/build/pdf.mjs').then(pdfjsLib => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/pdfjs/build/pdf.worker.mjs';
      return pdfjsLib.getDocument(pdfUrl).promise;
    }).then(async pdf => {
      viewer.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'pdf-zoom-wrapper';
      viewer.appendChild(wrapper);

      const renderWidth = isMobile ? window.innerWidth : viewer.clientWidth;
      for (let n = 1; n <= pdf.numPages; n++) {
        const page = await pdf.getPage(n);
        const baseVp = page.getViewport({ scale: 1 });
        const scale = (renderWidth / baseVp.width) * (isMobile ? 1.15 : 1);
        const vp = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        wrapper.appendChild(canvas);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
      }

      if (isMobile) initPinchZoom(viewer, wrapper);
    }).catch(() => {
      // Fallback: si file:// o error de red, abrir el PDF directo
      cerrarModal();
      window.open(negocio.menu, '_blank');
    });

    return;
  }

  // Imagen: mostrar en lightbox con fullscreen móvil y pinch-to-zoom
  const prevMedia = modalContent.querySelector('img, iframe, .pdf-viewer, .menu-html, .img-viewer');
  if (prevMedia) prevMedia.remove();

  const isMobileImg = window.innerWidth <= 600;
  if (isMobileImg) overlay.classList.add('modal-fullscreen');

  const viewer = document.createElement('div');
  viewer.className = 'img-viewer';

  const wrapper = document.createElement('div');
  wrapper.className = 'img-zoom-wrapper';

  const img = document.createElement('img');
  img.src = negocio.menu;
  img.alt = `Menú de ${negocio.nombre}`;
  img.draggable = false;

  wrapper.appendChild(img);
  viewer.appendChild(wrapper);
  modalContent.appendChild(viewer);

  overlay.classList.add('activo');
  document.body.style.overflow = 'hidden';

  if (isMobileImg) {
    img.addEventListener('load', () => initPinchZoom(viewer, wrapper));
    // Si ya está en caché, load no dispara
    if (img.complete) initPinchZoom(viewer, wrapper);
  }
}

function cerrarModal() {
  overlay.classList.remove('activo');
  overlay.classList.remove('modal-fullscreen');
  document.body.style.overflow = '';
  const prevMedia = modalContent.querySelector('img, iframe, .pdf-viewer, .menu-html, .img-viewer');
  if (prevMedia) prevMedia.remove();
}

/* ── Pinch-to-zoom para el visor PDF ─────────────────────── */
function initPinchZoom(viewer, wrapper) {
  let scale = 1;
  let startScale = 1;
  let startDist = 0;
  let translateX = 0, translateY = 0;
  let startX = 0, startY = 0;
  let lastTouchX = 0, lastTouchY = 0;
  let isPinching = false;
  let isPanning = false;

  function clampTranslate() {
    const rect = wrapper.getBoundingClientRect();
    const vw = viewer.clientWidth;
    const vh = viewer.clientHeight;
    const maxX = 0;
    const minX = Math.min(0, vw - rect.width);
    const maxY = 0;
    const minY = Math.min(0, vh - rect.height);
    translateX = Math.max(minX, Math.min(maxX, translateX));
    translateY = Math.max(minY, Math.min(maxY, translateY));
  }

  function applyTransform() {
    wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function getDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  viewer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      isPinching = true;
      isPanning = false;
      startDist = getDist(e.touches);
      startScale = scale;
      e.preventDefault();
    } else if (e.touches.length === 1 && scale > 1) {
      isPanning = true;
      startX = translateX;
      startY = translateY;
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
      e.preventDefault();
    }
  }, { passive: false });

  viewer.addEventListener('touchmove', (e) => {
    if (isPinching && e.touches.length === 2) {
      const dist = getDist(e.touches);
      scale = Math.max(1, Math.min(4, startScale * (dist / startDist)));
      if (scale === 1) { translateX = 0; translateY = 0; }
      clampTranslate();
      applyTransform();
      e.preventDefault();
    } else if (isPanning && e.touches.length === 1 && scale > 1) {
      const dx = e.touches[0].clientX - lastTouchX;
      const dy = e.touches[0].clientY - lastTouchY;
      translateX = startX + dx;
      translateY = startY + dy;
      clampTranslate();
      applyTransform();
      e.preventDefault();
    }
  }, { passive: false });

  viewer.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) isPinching = false;
    if (e.touches.length === 0) isPanning = false;
  });

  // Doble tap para resetear zoom
  let lastTap = 0;
  viewer.addEventListener('touchend', (e) => {
    if (e.touches.length > 0) return;
    const now = Date.now();
    if (now - lastTap < 300) {
      if (scale > 1) {
        scale = 1; translateX = 0; translateY = 0;
      } else {
        scale = 2.5;
        const rect = viewer.getBoundingClientRect();
        translateX = -(e.changedTouches[0].clientX - rect.left) * (scale - 1);
        translateY = -(e.changedTouches[0].clientY - rect.top) * (scale - 1);
        clampTranslate();
      }
      applyTransform();
      e.preventDefault();
    }
    lastTap = now;
  });
}

document.getElementById('negocios-grid').addEventListener('click', (e) => {
  const card = e.target.closest('.negocio-card');
  if (!card) return;
  const negocio = negocios.find((n) => n.id === card.dataset.id);
  if (negocio) abrirModal(negocio);
});

document.getElementById('negocios-grid').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.negocio-card');
  if (!card) return;
  e.preventDefault();
  const negocio = negocios.find((n) => n.id === card.dataset.id);
  if (negocio) abrirModal(negocio);
});

btnCerrar.addEventListener('click', cerrarModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) cerrarModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
});

// Swipe hacia abajo para cerrar el lightbox en móvil
let touchStartY = 0;
overlay.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });
overlay.addEventListener('touchend', (e) => {
  if (e.changedTouches[0].clientY - touchStartY > 80) cerrarModal();
}, { passive: true });

/* ── Splash de bienvenida ────────────────────────────────── */
const splash = document.getElementById('splash');
if (splash) {
  setTimeout(() => splash.remove(), 2500);
}
