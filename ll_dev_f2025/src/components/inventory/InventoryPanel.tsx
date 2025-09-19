'use client';

import React from 'react';
import Image from 'next/image';
import { TShirtItem, TabType } from '@/types';
import { ICONS, COLORS, LAYOUT, INVENTORY } from '@/lib/constants';
import { OrderQueue } from './OrderQueue';

interface InventoryPanelProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  items: TShirtItem[];
  onQuantityChange: (id: number, quantity: number) => void;
}

export const InventoryPanel = React.memo<InventoryPanelProps>(({ activeTab, onTabChange, items, onQuantityChange }) => {
  return (
    <aside className={`${LAYOUT.inventoryPanel.width} bg-gray-100 border-l border-gray-200 p-8`} role="complementary" aria-label="Inventory management">
      {/* Tabs */}
      <div className="flex mb-8">
        <button
          onClick={() => onTabChange('inventory')}
          className={`px-6 py-3 text-sm font-semibold rounded-l-lg transition-colors ${
            activeTab === 'inventory'
              ? 'bg-white text-gray-800 border border-[#DEDEDE] shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => onTabChange('order')}
          className={`px-6 py-3 text-sm font-semibold rounded-r-lg transition-colors ${
            activeTab === 'order'
              ? 'bg-white text-gray-800 border border-[#DEDEDE] shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          }`}
        >
          Order Queue
        </button>
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'inventory' ? (
        <>
          {/* Add New Button */}
          <div className="mb-8">
            <button 
              className="w-full bg-[#444eaa] text-white py-3 px-6 rounded-lg hover:bg-[#3a4296] transition-colors font-semibold text-lg shadow-sm flex items-center justify-center space-x-2"
              aria-label="Add new inventory item"
            >
              <span className="text-white text-xl font-bold">+</span>
              <span>Add New</span>
            </button>
          </div>

          {/* Quantity Controls */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-3 bg-white h-20 flex items-center">
                <div className="flex items-center justify-between gap-2 w-full h-full">
                  {/* Decrease Button */}
                  <button
                    onClick={() => onQuantityChange(item.id, Math.max(INVENTORY.minQuantity, item.quantity - 1))}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded border border-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label={`Decrease quantity for ${item.name}`}
                  >
                    <Image 
                      src={ICONS.negative} 
                      alt="Decrease" 
                      width={16} 
                      height={16}
                      className="w-4 h-4"
                    />
                  </button>
                  
                  {/* Stock Number and PCS Container */}
                  <div className="flex-1 flex flex-col h-full">
                    {/* Stock Number */}
                    <div className="text-center border border-gray-300 rounded-t px-2 py-1 bg-white flex-1 flex items-center justify-center" role="status" aria-label={`Current quantity: ${item.quantity}`}>
                      <div className="text-gray-800 font-semibold text-lg">{item.quantity}</div>
                    </div>
                    
                    {/* PCS Label */}
                    <div className="text-center border border-gray-300 border-t-0 rounded-b px-2 py-1 bg-amber-100 flex-1 flex items-center justify-center">
                      <p className="text-xs text-gray-700">{INVENTORY.packSize} PCS</p>
                    </div>
                  </div>
                  
                  {/* Increase Button */}
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded border border-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label={`Increase quantity for ${item.name}`}
                  >
                    <Image 
                      src={ICONS.positive} 
                      alt="Increase" 
                      width={16} 
                      height={16}
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <OrderQueue items={items} />
      )}
    </aside>
  );
});
