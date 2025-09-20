import { useState, useMemo, useCallback, useEffect } from 'react';
import { TShirtItem, TabType, CreateTShirtItem } from '@/types';
import { tshirtData } from '@/lib/data';
import { generateId } from '@/lib/utils';
import { saveToStorage, loadInventoryData, STORAGE_KEYS } from '@/lib/storage';

/**
 * Custom hook for managing inventory state and operations with persistence
 */
export const useInventory = () => {
  // Use default data initially to prevent hydration mismatch
  const [inventory, setInventory] = useState<TShirtItem[]>(tshirtData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('inventory');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load data from localStorage after hydration
  useEffect(() => {
    const savedInventory = loadInventoryData();
    setInventory(savedInventory);
    setIsHydrated(true);
  }, []);

  // Save inventory to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(STORAGE_KEYS.INVENTORY, inventory);
    }
  }, [inventory, isHydrated]);

  /**
   * Updates the quantity of a specific inventory item
   */
  const updateQuantity = useCallback((id: number, newQuantity: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ));
  }, []);

  /**
   * Adds a new item to the inventory
   */
  const addNewItem = useCallback((newItem: CreateTShirtItem) => {
    const existingIds = inventory.map(item => item.id);
    const itemWithId: TShirtItem = {
      ...newItem,
      id: generateId(existingIds),
    };
    setInventory(prev => [...prev, itemWithId]);
  }, [inventory]);

  /**
   * Adds quantity to an existing inventory item (used when orders are completed)
   */
  const addQuantityToItem = useCallback((itemId: number, quantityToAdd: number) => {
    setInventory(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: item.quantity + quantityToAdd }
        : item
    ));
  }, []);

  const filteredInventory = useMemo(() => 
    inventory.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [inventory, searchTerm]
  );

  return {
    inventory,
    filteredInventory,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    updateQuantity,
    addNewItem,
    addQuantityToItem,
    isHydrated,
  };
};
