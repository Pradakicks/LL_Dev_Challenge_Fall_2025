export interface TShirtItem {
  id: number;
  name: string;
  size: string;
  color: 'red' | 'black' | 'white';
  quantity: number;
  requiredPcs: number;
}

export type NavItem = 'materials' | 'products' | 'fulfillment' | 'integrations';

export type TabType = 'inventory' | 'order';

export interface InventoryState {
  inventory: TShirtItem[];
  searchTerm: string;
  activeTab: TabType;
  activeNavItem: NavItem;
  sidebarExpanded: boolean;
  showFigmaReference: boolean;
}
