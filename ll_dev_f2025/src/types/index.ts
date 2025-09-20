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
