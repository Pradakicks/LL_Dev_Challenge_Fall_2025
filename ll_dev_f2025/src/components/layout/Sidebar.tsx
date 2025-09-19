'use client';

import Image from 'next/image';
import { NavItem } from '@/types';

interface SidebarProps {
  expanded: boolean;
  activeNavItem: NavItem;
  onNavItemClick: (item: NavItem) => void;
  onToggleExpanded: () => void;
}

const navItems: { key: NavItem; activeIcon: string; inactiveIcon: string }[] = [
  {
    key: 'home',
    activeIcon: '/assets/icons/Property 1=Home - Active.png',
    inactiveIcon: '/assets/icons/Property 1=Home - Active.png', // Home is always active
  },
  {
    key: 'products',
    activeIcon: '/assets/icons/Property 1=Products  - Active.png',
    inactiveIcon: '/assets/icons/Property 1=Products  - Inactive.png',
  },
  {
    key: 'components',
    activeIcon: '/assets/icons/Property 1=Components - Active.png',
    inactiveIcon: '/assets/icons/Property 1=Components - Inactive.png',
  },
  {
    key: 'integrations',
    activeIcon: '/assets/icons/Property 1=Integrations - Active.png',
    inactiveIcon: '/assets/icons/Property 1=Integrations - Inactive.png',
  },
];

export const Sidebar = ({ expanded, activeNavItem, onNavItemClick, onToggleExpanded }: SidebarProps) => {
  return (
    <div className={`${expanded ? 'w-64' : 'w-16'} bg-gray-700 flex flex-col items-center py-6 space-y-6 transition-all duration-300`}>
      {/* Navigation Icons */}
      {navItems.map((item) => (
        <div 
          key={item.key}
          className="w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={() => onNavItemClick(item.key)}
        >
          <Image 
            src={activeNavItem === item.key ? item.activeIcon : item.inactiveIcon}
            alt={item.key}
            width={32} 
            height={32}
            className="w-8 h-8"
          />
        </div>
      ))}
      
      {/* Bottom Profile Section with Expand/Collapse Button */}
      <div className="mt-auto flex flex-col items-center space-y-2">
        <button
          onClick={onToggleExpanded}
          className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <Image 
            src="/assets/icons/Property 1=-.png" 
            alt="Expand/Collapse" 
            width={16} 
            height={16}
            className="w-4 h-4"
          />
        </button>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};
