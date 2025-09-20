import { useState, useMemo, useCallback } from 'react';
import { TShirtItem, TabType, CreateTShirtItem } from '@/types';
import { tshirtData } from '@/lib/data';
import { generateId } from '@/lib/utils';

/**
 * Custom hook for managing inventory state and operations
 */
export const useInventory = () => {
  const [inventory, setInventory] = useState<TShirtItem[]>(tshirtData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('inventory');

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
  };
};
