/**
 * menus.js — Datos de menús de Paraíso Food Garden
 *
 * Estructura de cada negocio:
 * {
 *   descripcion: 'Texto opcional bajo el nombre',   // opcional
 *   secciones: [
 *     {
 *       titulo: 'Nombre de la sección',
 *       nota: 'Texto aclaratorio opcional',          // opcional
 *       items: [
 *         { nombre: 'Producto',          precio: 9800 },
 *         { nombre: 'Producto con desc', precio: 12000, desc: 'descripción corta' },
 *         { nombre: 'Sin precio',        precio: null },
 *       ]
 *     }
 *   ]
 * }
 *
 * Los precios van en pesos colombianos (número entero, sin puntos).
 * precio: null → se muestra "Consultar" en vez de precio.
 */

const menus = {

  /* ── La Cafetera ──────────────────────────────────────────── */
  'la-cafetera': {
    secciones: [
      {
        titulo: 'Cafés',
        items: [
          { nombre: 'Tinto', precio: 1500 },
          { nombre: 'Café con leche', precio: 2500 },
          { nombre: 'Capuchino', precio: 4500 },
          { nombre: 'Latte', precio: 4800 },
          { nombre: 'Americano', precio: 3500 },
          { nombre: 'Espresso', precio: 2800 },
        ],
      },
      {
        titulo: 'Bebidas frías',
        items: [
          { nombre: 'Café frío', precio: 5500 },
          { nombre: 'Malteada de café', precio: 7000 },
          { nombre: 'Granizado', precio: 6000 },
        ],
      },
      {
        titulo: 'Pastelería',
        items: [
          { nombre: 'Croissant', precio: 4500 },
          { nombre: 'Muffin', precio: 3800 },
          { nombre: 'Torta del día', precio: 5000 },
        ],
      },
    ],
  },

  /* ── Dejamu ───────────────────────────────────────────────── */
  'dejamu': {
    secciones: [
      {
        titulo: 'Menú',
        items: [
          { nombre: 'Por definir', precio: null },
        ],
      },
    ],
  },

  /* ── Satomi Bento ─────────────────────────────────────────── */
  'satomi-bento': {
    secciones: [
      {
        titulo: 'Menú',
        items: [
          { nombre: 'Por definir', precio: null },
        ],
      },
    ],
  },

  /* ── Café Pintado ─────────────────────────────────────────── */
  'cafe-pintado': {
    secciones: [
      {
        titulo: 'Menú',
        items: [
          { nombre: 'Por definir', precio: null },
        ],
      },
    ],
  },

  /* ── El Obelisco ──────────────────────────────────────────── */
  'el-obelisco': {
    secciones: [
      {
        titulo: 'Menú',
        items: [
          { nombre: 'Por definir', precio: null },
        ],
      },
    ],
  },

  /* ── El Bochinche ─────────────────────────────────────────── */
  'el-bochinche': {
    secciones: [
      {
        titulo: 'Menú',
        items: [
          { nombre: 'Por definir', precio: null },
        ],
      },
    ],
  },

  /* ── Sabor Peruano ────────────────────────────────────────── */
  'sabor-peruano': {
    secciones: [
      {
        titulo: 'Menú',
        items: [
          { nombre: 'Por definir', precio: null },
        ],
      },
    ],
  },

  /* ── Mirá! Uepa'Ve ────────────────────────────────────────── */
  'uepa-ve': {
    secciones: [
      {
        titulo: 'Menú',
        items: [
          { nombre: 'Por definir', precio: null },
        ],
      },
    ],
  },

  /* ── Monster Park ─────────────────────────────────────────── */
  'monster-park': {
    secciones: [
      {
        titulo: 'Menú',
        items: [
          { nombre: 'Por definir', precio: null },
        ],
      },
    ],
  },

};
