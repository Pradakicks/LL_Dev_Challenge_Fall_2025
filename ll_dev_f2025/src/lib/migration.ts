import { TShirtItem, OrderItem } from '@/types';
import { tshirtData } from '@/lib/data';

/**
 * Data migration utilities for handling schema changes
 */

/**
 * Current data version
 */
export const DATA_VERSION = '1.0.0';

/**
 * Migrate inventory data to current schema
 */
export function migrateInventoryData(data: any): TShirtItem[] {
  if (!Array.isArray(data)) {
    return tshirtData;
  }

  return data.map((item: any) => ({
    id: item.id || 0,
    name: item.name || 'Unknown Item',
    size: item.size || 'M',
    color: ['red', 'black', 'white'].includes(item.color) ? item.color : 'red',
    quantity: typeof item.quantity === 'number' ? item.quantity : 0,
    requiredPcs: typeof item.requiredPcs === 'number' ? item.requiredPcs : 24,
  }));
}

/**
 * Migrate order data to current schema
 */
export function migrateOrderData(data: any): OrderItem[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((order: any) => ({
    id: order.id || Date.now(),
    item: migrateInventoryData([order.item])[0] || {
      id: 0,
      name: 'Unknown Item',
      size: 'M',
      color: 'red',
      quantity: 0,
      requiredPcs: 24,
    },
    quantity: typeof order.quantity === 'number' ? order.quantity : 1,
    status: ['pending', 'processing', 'completed'].includes(order.status) 
      ? order.status 
      : 'pending',
    orderDate: order.orderDate || new Date().toISOString().split('T')[0],
  }));
}

/**
 * Migrate navigation data to current schema
 */
export function migrateNavigationData(data: any): { activeNavItem: string; sidebarExpanded: boolean } {
  if (!data || typeof data !== 'object') {
    return { activeNavItem: 'materials', sidebarExpanded: false };
  }

  return {
    activeNavItem: ['materials', 'products', 'fulfillment', 'integrations'].includes(data.activeNavItem)
      ? data.activeNavItem
      : 'materials',
    sidebarExpanded: typeof data.sidebarExpanded === 'boolean' ? data.sidebarExpanded : false,
  };
}

/**
 * Validate and clean data structure
 */
export function validateDataStructure<T>(data: any, validator: (item: any) => boolean, migrator: (data: any) => T): T {
  if (!data) {
    return migrator(null);
  }

  if (Array.isArray(data)) {
    const validItems = data.filter(validator);
    return migrator(validItems);
  }

  if (validator(data)) {
    return migrator(data);
  }

  return migrator(null);
}

/**
 * Check if data needs migration
 */
export function needsMigration(data: any, expectedVersion: string): boolean {
  return !data || data.version !== expectedVersion;
}

/**
 * Add version to data
 */
export function addVersion<T>(data: T): T & { version: string } {
  return { ...data, version: DATA_VERSION };
}
