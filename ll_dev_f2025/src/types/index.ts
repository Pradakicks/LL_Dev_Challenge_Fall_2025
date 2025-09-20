/**
 * Product color options for T-shirt items
 */
export type ProductColor = 'red' | 'black' | 'white';

/**
 * Available product sizes
 */
export type ProductSize = 'S' | 'M' | 'L' | 'XL';

/**
 * Navigation item identifiers
 */
export type NavItem = 'materials' | 'products' | 'fulfillment' | 'integrations';

/**
 * Tab types for the materials page
 */
export type TabType = 'inventory' | 'order';

/**
 * Order status for fulfillment tracking
 */
export type OrderStatus = 'pending' | 'processing' | 'completed';

/**
 * Sort options for inventory items
 */
export type SortOption = 'name' | 'size' | 'color' | 'quantity' | 'requiredPcs';

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Filter options for inventory items
 */
export interface FilterOptions {
  sizes: string[];
  colors: string[];
  lowStock: boolean;
}

/**
 * Sort and filter state
 */
export interface SortFilterState {
  sortBy: SortOption;
  sortDirection: SortDirection;
  filters: FilterOptions;
}

/**
 * External API product types (Platzi Fake Store API)
 */
export interface ExternalCategory {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface ExternalProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ExternalCategory;
  images: string[];
  creationAt?: string;
  updatedAt?: string;
}

/**
 * Converted product for our internal use
 */
export interface ConvertedProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images: string[];
}

/**
 * Core T-shirt inventory item interface
 */
export interface TShirtItem {
  readonly id: number;
  name: string;
  size: ProductSize;
  color: ProductColor;
  quantity: number;
  requiredPcs: number;
}

/**
 * Data required to create a new T-shirt item (without ID)
 */
export type CreateTShirtItem = Omit<TShirtItem, 'id'>;

/**
 * Order item for fulfillment queue
 */
export interface OrderItem {
  readonly id: number;
  item: TShirtItem;
  quantity: number;
  status: OrderStatus;
  orderDate: string;
}

/**
 * Form validation error structure
 */
export interface FormErrors {
  [key: string]: string;
}

/**
 * Navigation context state
 */
export interface NavigationState {
  activeNavItem: NavItem;
  sidebarExpanded: boolean;
}

/**
 * Inventory management state
 */
export interface InventoryState {
  inventory: TShirtItem[];
  searchTerm: string;
  activeTab: TabType;
}

/**
 * @deprecated Use NavigationState and InventoryState instead
 */
export interface LegacyInventoryState extends InventoryState, NavigationState {
  showFigmaReference: boolean;
}
