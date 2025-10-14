import { useState, useMemo, useCallback, useEffect } from 'react';
import { TShirtItem, TabType, CreateTShirtItem, SortOption, SortDirection, FilterOptions } from '@/types';
import { tshirtData } from '@/lib/data';
import { getRepositoryFactory } from '@/lib/repositories/factory';

/**
 * Custom hook for managing inventory state and operations with persistence
 */
export const useInventory = () => {
  // Use default data initially to prevent hydration mismatch
  const [inventory, setInventory] = useState<TShirtItem[]>(tshirtData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('inventory');
  const [isHydrated, setIsHydrated] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<FilterOptions>({ sizes: [], colors: [], lowStock: false });

  // Load data from repository after hydration
  useEffect(() => {
    const loadInventory = async () => {
      try {
        const materialRepository = getRepositoryFactory().getMaterialRepository();
        const result = await materialRepository.getAll();
        if (result.success && result.data) {
          setInventory(result.data);
        }
      } catch (error) {
        console.error('Error loading inventory:', error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadInventory();
  }, []);

  /**
   * Updates the quantity of a specific inventory item
   */
  const updateQuantity = useCallback(async (productId: number, newQuantity: number) => {
    try {
      const materialRepository = getRepositoryFactory().getMaterialRepository();
      const result = await materialRepository.updateQuantity(productId, newQuantity);
      if (result.success && result.data) {
        setInventory(prev => prev.map(item => 
        item.productId === productId ? result.data! : item
      ));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }, []);

  /**
   * Adds a new item to the inventory
   */
  const addNewItem = useCallback(async (newItem: CreateTShirtItem) => {
    try {
      const materialRepository = getRepositoryFactory().getMaterialRepository();
      const result = await materialRepository.create(newItem);
      if (result.success && result.data) {
        setInventory(prev => [...prev, result.data!]);
      }
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  }, []);

  /**
   * Adds quantity to an existing inventory item (used when orders are completed)
   */
  const addQuantityToItem = useCallback(async (productId: number, quantityToAdd: number) => {
    try {
      const materialRepository = getRepositoryFactory().getMaterialRepository();
      const result = await materialRepository.addQuantity(productId, quantityToAdd);
      if (result.success && result.data) {
        setInventory(prev => prev.map(item => 
          item.productId === productId ? result.data! : item
        ));
      }
    } catch (error) {
      console.error('Error adding quantity:', error);
    }
  }, []);

  const filteredInventory = useMemo(() => {
    let filtered = inventory;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(item => filters.sizes.includes(item.size));
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(item => filters.colors.includes(item.color));
    }

    // Apply low stock filter
    if (filters.lowStock) {
      filtered = filtered.filter(item => item.quantity < item.requiredPcs);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'color':
          aValue = a.color.toLowerCase();
          bValue = b.color.toLowerCase();
          break;
        case 'quantity':
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        case 'requiredPcs':
          aValue = a.requiredPcs;
          bValue = b.requiredPcs;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [inventory, searchTerm, filters, sortBy, sortDirection]);

  /**
   * Filters orders based on search term
   */
  const filterOrders = useCallback((orders: any[]) => {
    if (!searchTerm.trim()) return orders;
    
    const term = searchTerm.toLowerCase();
    return orders.filter(order => 
      order.item.name.toLowerCase().includes(term) ||
      order.item.size.toLowerCase().includes(term) ||
      order.item.color.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  }, [searchTerm]);

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
    filterOrders,
    sortBy,
    sortDirection,
    filters,
    setSortBy,
    setSortDirection,
    setFilters,
  };
};
