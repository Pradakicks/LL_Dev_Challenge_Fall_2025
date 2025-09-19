'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NavItem } from '@/types';

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
  const [activeNavItem, setActiveNavItem] = useState<NavItem>('materials');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

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
