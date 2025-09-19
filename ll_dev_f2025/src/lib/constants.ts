// Design tokens
export const COLORS = {
  primary: '#444eaa',
  primaryHover: '#3a4296',
  red: '#ef4444',
  redHover: '#dc2626',
  amber: '#fbbf24',
  amberLight: '#fef3c7',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  white: '#ffffff',
  black: '#000000',
} as const;

// Layout constants
export const LAYOUT = {
  sidebar: {
    collapsed: 'w-16',
    expanded: 'w-64',
  },
  header: {
    height: 'h-16',
  },
  inventoryPanel: {
    width: 'w-80',
  },
} as const;

// Animation constants
export const ANIMATIONS = {
  transition: 'transition-all duration-300',
  transitionColors: 'transition-colors',
} as const;

// Business constants
export const INVENTORY = {
  packSize: 24,
  minQuantity: 0,
} as const;

// Icon paths
export const ICONS = {
  plus: '/assets/icons/Property 1=Plus.png',
  negative: '/assets/icons/Property 1=Negative.png',
  positive: '/assets/icons/Property 1=Positive.png',
  placeholder: '/assets/icons/Property 1=Placeholder.png',
  expandCollapse: '/assets/icons/Property 1=-.png',
  materials: {
    active: '/assets/icons/Property 1=Components - Active.png',
    inactive: '/assets/icons/Property 1=Components - Inactive.png',
  },
  products: {
    active: '/assets/icons/Property 1=Products  - Active.png',
    inactive: '/assets/icons/Property 1=Products  - Inactive.png',
  },
  fulfillment: {
    active: '/assets/icons/Property 1=Orders - Active.png',
    inactive: '/assets/icons/Property 1=Orders - Inactive.png',
  },
  integrations: {
    active: '/assets/icons/Property 1=Integrations - Active.png',
    inactive: '/assets/icons/Property 1=Integrations - Inactive.png',
  },
} as const;
