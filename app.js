const negocios = [
  {
    id: 'la-cafetera',
    nombre: 'La Cafetera',
    categoria: 'Café',
    logo: 'assets/negocios/la-cafetera/logo.jpg',
    menu: 'assets/negocios/la-cafetera/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'dejamu',
    nombre: 'Dejamu',
    categoria: 'Fusión',
    logo: 'assets/negocios/dejamu/logo.jpg',
    menu: 'assets/negocios/dejamu/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'satomi-bento',
    nombre: 'Satomi Bento',
    categoria: 'Japonés',
    logo: 'assets/negocios/satomi-bento/logo.jpg',
    menu: 'assets/negocios/satomi-bento/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'cafe-pintado',
    nombre: 'Café Pintado',
    categoria: 'Café',
    logo: 'assets/negocios/cafe-pintado/logo.jpg',
    menu: 'assets/negocios/cafe-pintado/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'el-obelisco',
    nombre: 'El Obelisco',
    categoria: 'Caleño',
    logo: 'assets/negocios/el-obelisco/logo.jpg',
    menu: 'assets/negocios/el-obelisco/menu.jpg',
    tipo: 'imagen',
  },
  {
    id: 'el-bochinche',
    nombre: 'El Bochinche',
    categoria: 'Colombiano',
    logo: 'assets/negocios/el-bochinche/logo.jpg',
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

function abrirModal(negocio) {
  if (negocio.tipo === 'externo') {
    window.open(negocio.menu, '_blank', 'noopener,noreferrer');
    return;
  }

  const prevMedia = modalContent.querySelector('img, iframe');
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
