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
    { label: 'chinchintirapie@gmail.com', to: '/contacto' },
    { label: 'Tienda', to: '/tienda' },
    { label: 'Donaciones', to: '/tienda#donaciones' },
    { label: 'Únete a la escuela', to: '/contacto' },
  ],
};

export const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/chinchintirapie', label: 'Facebook' },
  { href: 'https://www.instagram.com/chinchintirapie/', label: 'Instagram' },
  { href: 'https://www.youtube.com/@chinchintirapie', label: 'YouTube' },
];
