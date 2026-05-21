// Centralized navigation structure
export const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  {
    label: 'Escuela',
    children: [
      { label: 'Historia', to: '/historia' },
      { label: 'Organización', to: '/organizacion' },
    ],
  },
  {
    label: 'Noticias',
    children: [
      { label: 'Hitos Recientes', to: '/noticias' },
      { label: 'Crónicas', to: '/cronicas' },
    ],
  },
  {
    label: 'Archivo',
    children: [
      { label: 'Repositorio', to: '/repositorio' },
      { label: 'CEDOC', to: '/cedoc' },
      { label: 'Material Educativo', to: '/material-educativo' },
    ],
  },
];

export const FOOTER_LINKS = {
  escuela: [
    { label: 'Historia', to: '/historia' },
    { label: 'Organización', to: '/organizacion' },
    { label: 'Nuestros talleres', to: '/#talleres' },
  ],
  archivo: [
    { label: 'Repositorio', to: '/repositorio' },
    { label: 'CEDOC', to: '/cedoc' },
    { label: 'Material Educativo', to: '/material-educativo' },
    { label: 'Crónicas', to: '/cronicas' },
  ],
  contacto: [
    { label: 'info@chinchintirapie.cl', href: 'mailto:info@chinchintirapie.cl' },
    { label: 'Tienda', to: '/tienda' },
    { label: 'Donaciones', to: '/tienda#donaciones' },
    { label: 'Únete a la murga', to: '/contacto' },
  ],
};

export const SOCIAL_LINKS = [
  { emoji: '📘', href: '#', label: 'Facebook' },
  { emoji: '📸', href: '#', label: 'Instagram' },
  { emoji: '▶️', href: '#', label: 'YouTube' },
  { emoji: '🐦', href: '#', label: 'Twitter' },
];
