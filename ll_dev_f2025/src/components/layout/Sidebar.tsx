'use client';

import React from 'react';
import Image from 'next/image';
import { NavItem } from '@/types';
import { ICONS, LAYOUT, ANIMATIONS } from '@/lib/constants';

interface SidebarProps {
  expanded: boolean;
  activeNavItem: NavItem;
  onNavItemClick: (item: NavItem) => void;
  onToggleExpanded: () => void;
}

const navItems: { 
  key: NavItem; 
  name: string;
  activeIcon: string; 
  inactiveIcon: string;
}[] = [
  {
    key: 'materials',
    name: 'Materials',
    activeIcon: ICONS.materials.active,
    inactiveIcon: ICONS.materials.inactive,
  },
  {
    key: 'products',
    name: 'Products',
    activeIcon: ICONS.products.active,
    inactiveIcon: ICONS.products.inactive,
  },
  {
    key: 'fulfillment',
    name: 'Fulfillment',
    activeIcon: ICONS.fulfillment.active,
    inactiveIcon: ICONS.fulfillment.inactive,
  },
  {
    key: 'integrations',
    name: 'Integrations',
    activeIcon: ICONS.integrations.active,
    inactiveIcon: ICONS.integrations.inactive,
  },
];

export const Sidebar = React.memo<SidebarProps>(({ expanded, activeNavItem, onNavItemClick, onToggleExpanded }) => {
  return (
    <nav 
      className={`${expanded ? LAYOUT.sidebar.expanded : LAYOUT.sidebar.collapsed} bg-white flex flex-col py-6 space-y-6 ${ANIMATIONS.transition} border-r border-gray-200 h-screen`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Company Logo */}
      <div className={`flex items-center ${expanded ? 'space-x-3' : 'flex-col space-y-4'}`}>
        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-600 font-bold text-lg">T</span>
        </div>
        
        {/* Company Name - Only show when expanded */}
        {expanded && (
          <h2 className="text-lg font-semibold text-gray-800">Tally</h2>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`flex items-center cursor-pointer rounded-lg ${ANIMATIONS.transitionColors} ${
              expanded ? 'px-4 py-3 hover:bg-gray-50' : 'justify-center p-2'
            } ${
              activeNavItem === item.key ? `bg-gray-100 ${expanded ? 'border border-gray-300' : 'border border-gray-200'}` : ''
            }`}
            onClick={() => onNavItemClick(item.key)}
            aria-label={`Navigate to ${item.name}`}
            aria-current={activeNavItem === item.key ? 'page' : undefined}
          >
            <Image 
              src={activeNavItem === item.key ? item.activeIcon : item.inactiveIcon}
              alt={item.name}
              width={24} 
              height={24}
              className="w-6 h-6"
            />
            
            {/* Navigation Name - Only show when expanded */}
            {expanded && (
              <span className={`ml-3 text-sm font-medium ${
                activeNavItem === item.key ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {item.name}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Bottom Profile Section with Expand/Collapse Button */}
      <div className="mt-auto flex flex-col items-center space-y-2">
        <button
          onClick={onToggleExpanded}
          className={`bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 ${ANIMATIONS.transitionColors} ${
            expanded ? 'px-4 py-2 space-x-2' : 'w-6 h-6'
          }`}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <Image 
            src={ICONS.expandCollapse} 
            alt="Expand/Collapse" 
            width={16} 
            height={16}
            className="w-4 h-4"
          />
          {expanded && (
            <span className="text-white text-sm font-medium">Logout</span>
          )}
        </button>
        <div className="w-8 h-8 bg-gray-300 rounded-full" aria-label="User profile"></div>
      </div>
    </nav>
  );
});
