import { useState, useMemo } from 'react';
import { TShirtItem, TabType } from '@/types';
import { tshirtData } from '@/lib/data';

export const useInventory = () => {
  const [inventory, setInventory] = useState<TShirtItem[]>(tshirtData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('inventory');

  const updateQuantity = (id: number, newQuantity: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ));
  };

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
  };
};
