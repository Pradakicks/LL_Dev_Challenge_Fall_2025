'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NavItem } from '@/types';
import { saveToStorage, loadNavigationData, STORAGE_KEYS } from '@/lib/storage';

interface NavigationContextType {
  activeNavItem: NavItem;
  setActiveNavItem: (item: NavItem) => void;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  // Use default values initially to prevent hydration mismatch
  const [activeNavItem, setActiveNavItem] = useState<NavItem>('materials');
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load navigation state from localStorage after hydration
  useEffect(() => {
    const savedNavigation = loadNavigationData();
    setActiveNavItem(savedNavigation.activeNavItem as NavItem);
    setSidebarExpanded(savedNavigation.sidebarExpanded);
    setIsHydrated(true);
  }, []);

  // Save navigation state to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(STORAGE_KEYS.NAVIGATION, { activeNavItem, sidebarExpanded });
    }
  }, [activeNavItem, sidebarExpanded, isHydrated]);

  return (
    <NavigationContext.Provider
      value={{
        activeNavItem,
        setActiveNavItem,
        sidebarExpanded,
        setSidebarExpanded,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
