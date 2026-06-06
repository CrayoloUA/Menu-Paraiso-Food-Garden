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
  // Para agregar un negocio nuevo, copiar este bloque y completar:
  // {
  //   id: 'nombre-del-negocio',       <- sin espacios ni tildes
  //   nombre: 'Nombre del Negocio',   <- como se verá en pantalla
  //   logo: 'assets/negocios/nombre-del-negocio/logo.webp',
  //   menu: 'assets/negocios/nombre-del-negocio/menu.jpg',
  //   tipo: 'imagen',                 <- 'imagen' o 'pdf'
  // },
];

/* ── Renderizar tarjetas ─────────────────────────────────── */
function renderNegocios() {
  const grid = document.getElementById('negocios-grid');
  grid.innerHTML = negocios.map((negocio) => `
    <article
      class="negocio-card"
      data-id="${negocio.id}"
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

/* ── Lightbox ────────────────────────────────────────────── */
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const btnCerrar = document.getElementById('modal-close');

function abrirModal(negocio) {
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
