/**
 * LocalStorage utilities for data persistence
 */

import { TShirtItem, OrderItem } from '@/types';
import { tshirtData } from '@/lib/data';
import { migrateInventoryData, migrateOrderData, migrateNavigationData } from './migration';

/**
 * Storage keys for different data types
 */
export const STORAGE_KEYS = {
  INVENTORY: 'inventory_data',
  ORDERS: 'orders_data',
  NAVIGATION: 'navigation_state',
} as const;

/**
 * Generic function to save data to localStorage
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Failed to save data to localStorage for key "${key}":`, error);
  }
}

/**
 * Generic function to load data from localStorage
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Failed to load data from localStorage for key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Load inventory data with migration support
 */
export function loadInventoryData(): TShirtItem[] {
  const data = loadFromStorage(STORAGE_KEYS.INVENTORY, null);
  return migrateInventoryData(data);
}

/**
 * Load order data with migration support
 */
export function loadOrderData(): OrderItem[] {
  const data = loadFromStorage(STORAGE_KEYS.ORDERS, null);
  return migrateOrderData(data);
}

/**
 * Load navigation data with migration support
 */
export function loadNavigationData(): { activeNavItem: string; sidebarExpanded: boolean } {
  const data = loadFromStorage(STORAGE_KEYS.NAVIGATION, null);
  return migrateNavigationData(data);
}

/**
 * Remove data from localStorage
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove data from localStorage for key "${key}":`, error);
  }
}

/**
 * Clear all application data from localStorage
 */
export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get storage usage information
 */
export function getStorageInfo(): { used: number; available: number; percentage: number } {
  try {
    let used = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    // Most browsers have 5-10MB limit, using 5MB as conservative estimate
    const available = 5 * 1024 * 1024; // 5MB in bytes
    const percentage = (used / available) * 100;
    
    return { used, available, percentage };
  } catch {
    return { used: 0, available: 0, percentage: 0 };
  }
}
