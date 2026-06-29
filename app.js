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
      <div class="card-img-wrap loading">
        <span class="card-categoria">${negocio.categoria}</span>
        <img
          src="${negocio.logo}"
          alt="${negocio.nombre}"
          loading="lazy"
          onload="this.closest('.card-img-wrap').classList.remove('loading')"
          onerror="this.src='assets/negocios/placeholder-logo.svg'; this.closest('.card-img-wrap').classList.remove('loading')"
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
  const grid = document.getElementById('negocios-grid');
  main.insertBefore(bar, grid);

  // Buscador — se inserta antes de la barra de filtros
  const buscadorWrap = document.createElement('div');
  buscadorWrap.className = 'buscador-wrap';
  buscadorWrap.innerHTML = '<input class="buscador-input" id="buscador-input" type="search" placeholder="Buscar negocio…" autocomplete="off" />';
  main.insertBefore(buscadorWrap, bar);

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filtro-btn');
    if (!btn) return;
    bar.querySelectorAll('.filtro-btn').forEach((b) => b.classList.remove('activo'));
    btn.classList.add('activo');
    const cat = btn.dataset.cat;
    // Limpiar búsqueda al cambiar categoría
    document.getElementById('buscador-input').value = '';
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

  document.getElementById('buscador-input').addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.negocio-card').forEach((card) => {
      const negocio = negocios.find(n => n.id === card.dataset.id);
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
    // Quitar filtro de categoría activo si hay búsqueda
    if (query) {
      bar.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'));
    }
  });
}

renderNegocios();
renderFiltros();

/* ── Lightbox ────────────────────────────────────────────── */
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const btnCerrar = document.getElementById('modal-close');

// Barra inferior: nombre del negocio + contador de página
const nombreBar = document.createElement('div');
nombreBar.className = 'modal-nombre-bar';
nombreBar.innerHTML = '<span id="modal-nombre-text"></span><span class="modal-page-counter" id="modal-page-counter"></span>';
document.body.appendChild(nombreBar);
nombreBar.style.display = 'none';

let ultimaTarjetaFocusada = null;

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
  ultimaTarjetaFocusada = document.activeElement;

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
    document.getElementById('modal-nombre-text').textContent = negocio.nombre;
    nombreBar.style.display = 'flex';
    requestAnimationFrame(() => btnCerrar.focus());
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
    document.getElementById('modal-nombre-text').textContent = negocio.nombre;
    nombreBar.style.display = 'flex';
    requestAnimationFrame(() => btnCerrar.focus());

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
  document.getElementById('modal-nombre-text').textContent = negocio.nombre;
  nombreBar.style.display = 'flex';
  requestAnimationFrame(() => btnCerrar.focus());
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
    viewer.style.overflowY = 'auto';

    // Indicador de página para menús multipágina
    const total = pages.length;
    if (total > 1) {
      // En desktop, flex centering desplaza el contenido alto hacia arriba del viewport.
      // flex-start garantiza que page 1 arranque desde el tope del viewer.
      viewer.style.alignItems = 'flex-start';
      viewer.scrollTop = 0;
      const counter = document.getElementById('modal-page-counter');
      counter.textContent = `1 / ${total}`;
      const imgsList = Array.from(wrapper.querySelectorAll('img'));
      viewer.addEventListener('scroll', () => {
        const viewerTop = viewer.getBoundingClientRect().top;
        let closestIdx = 0;
        let closestDist = Infinity;
        imgsList.forEach((img, idx) => {
          const dist = Math.abs(img.getBoundingClientRect().top - viewerTop);
          if (dist < closestDist) { closestDist = dist; closestIdx = idx; }
        });
        counter.textContent = `${closestIdx + 1} / ${total}`;
      });
    }

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

function cerrarModal() {
  overlay.classList.remove('activo');
  overlay.classList.remove('modal-fullscreen');
  document.body.style.overflow = '';
  const prevMedia = modalContent.querySelector('img, iframe, .pdf-viewer, .menu-html, .img-viewer, .menu-proximamente');
  if (prevMedia) prevMedia.remove();
  nombreBar.style.display = 'none';
  document.getElementById('modal-page-counter').textContent = '';
  if (ultimaTarjetaFocusada) ultimaTarjetaFocusada.focus();
}

/* ── Pinch-to-zoom para visores PDF e imagen ─────────────── */
function initPinchZoom(viewer, wrapper) {
  let scale = 1;
  let tx = 0, ty = 0;
  let isPinching = false;
  let isPanning  = false;
  let startScale = 1, startDist = 0;
  let startTx = 0,  startTy = 0;
  let pinchOriginX = 0, pinchOriginY = 0;
  let panStartX = 0, panStartY = 0;
  let swipeStartY = 0;   // para swipe-to-close cuando scale === 1

  function getDist(t) {
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  }
  function clamp() {
    // Usa el tamaño real del wrapper (puede ser más alto que el viewer en menus multipágina)
    const scaledW = wrapper.offsetWidth  * scale;
    const scaledH = wrapper.offsetHeight * scale;
    const minX = Math.min(0, viewer.clientWidth  - scaledW);
    const minY = Math.min(0, viewer.clientHeight - scaledH);
    tx = Math.max(minX, Math.min(0, tx));
    ty = Math.max(minY, Math.min(0, ty));
  }
  function apply() {
    wrapper.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    // Cuando no hay zoom: scroll nativo. Cuando hay zoom: panning manual.
    if (scale <= 1) {
      viewer.style.overflowY = 'auto';
    } else {
      viewer.style.overflowY = 'hidden';
    }
  }

  // ── touchstart ──────────────────────────────────────────
  viewer.addEventListener('touchstart', (e) => {
    // El viewer toma posesión de TODOS sus touches —
    // el overlay nunca procesa touchend si no recibió touchstart
    e.stopPropagation();

    if (e.touches.length === 2) {
      e.preventDefault();
      isPinching = true; isPanning = false;
      startDist = getDist(e.touches);
      startScale = scale; startTx = tx; startTy = ty;
      const r = viewer.getBoundingClientRect();
      pinchOriginX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left;
      pinchOriginY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top;
    } else if (e.touches.length === 1) {
      swipeStartY = e.touches[0].clientY;
      if (scale > 1) {
        e.preventDefault();
        isPanning = true;
        panStartX = e.touches[0].clientX;
        panStartY = e.touches[0].clientY;
        startTx = tx; startTy = ty;
      }
    }
  }, { passive: false });

  // ── touchmove ───────────────────────────────────────────
  viewer.addEventListener('touchmove', (e) => {
    e.stopPropagation();
    if (isPinching && e.touches.length === 2) {
      e.preventDefault();
      const ns = Math.max(1, Math.min(4, startScale * getDist(e.touches) / startDist));
      const cx = (pinchOriginX - startTx) / startScale;
      const cy = (pinchOriginY - startTy) / startScale;
      tx = pinchOriginX - cx * ns;
      ty = pinchOriginY - cy * ns;
      scale = ns;
      if (scale === 1) { tx = 0; ty = 0; } else clamp();
      apply();
    } else if (isPanning && e.touches.length === 1 && scale > 1) {
      e.preventDefault();
      tx = startTx + (e.touches[0].clientX - panStartX);
      ty = startTy + (e.touches[0].clientY - panStartY);
      clamp();
      apply();
    }
  }, { passive: false });

  // ── touchend ────────────────────────────────────────────
  let lastTap = 0;
  viewer.addEventListener('touchend', (e) => {
    // stopPropagation aquí es la clave: el overlay nunca ve este evento
    e.stopPropagation();

    if (e.touches.length < 2) isPinching = false;
    if (e.touches.length === 0) {
      isPanning = false;
      if (scale < 1) { scale = 1; tx = 0; ty = 0; apply(); }

      const now = Date.now();

      // Doble tap → zoom 2.5x o resetear
      if (now - lastTap < 300) {
        e.preventDefault();
        if (scale > 1) {
          scale = 1; tx = 0; ty = 0;
        } else {
          const r = viewer.getBoundingClientRect();
          const tapX = e.changedTouches[0].clientX - r.left;
          const tapY = e.changedTouches[0].clientY - r.top;
          const ns = 2.5;
          tx = tapX - tapX * ns;
          ty = tapY - tapY * ns;
          scale = ns;
          clamp();
        }
        apply();
        lastTap = 0;   // reset para no re-disparar
        return;
      }
      lastTap = now;

      // El menú solo se cierra con el botón X
    }
  });

  apply();
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

/* ── Service Worker ──────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
