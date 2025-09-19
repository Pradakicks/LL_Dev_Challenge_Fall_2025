'use client';

import Image from 'next/image';
import { TShirtItem, TabType } from '@/types';

interface InventoryPanelProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  items: TShirtItem[];
  onQuantityChange: (id: number, quantity: number) => void;
}

export const InventoryPanel = ({ activeTab, onTabChange, items, onQuantityChange }: InventoryPanelProps) => {
  return (
    <div className="w-80 bg-gray-100 border-l border-gray-200 p-8">
      {/* Tabs */}
      <div className="flex mb-8">
        <button
          onClick={() => onTabChange('inventory')}
          className={`px-6 py-3 text-sm font-semibold rounded-l-lg transition-colors ${
            activeTab === 'inventory'
              ? 'bg-white text-gray-800 border border-gray-300 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => onTabChange('order')}
          className={`px-6 py-3 text-sm font-semibold rounded-r-lg transition-colors ${
            activeTab === 'order'
              ? 'bg-white text-gray-800 border border-gray-300 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          }`}
        >
          Order Queue
        </button>
      </div>

      {/* Add New Button */}
      <div className="mb-8">
        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-sm flex items-center justify-center space-x-2">
          <Image 
            src="/assets/icons/Property 1=Plus.png" 
            alt="Plus" 
            width={20} 
            height={20}
            className="w-5 h-5"
          />
          <span>Add New</span>
        </button>
      </div>

      {/* Quantity Controls */}
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
              >
                <Image 
                  src="/assets/icons/Property 1=Negative.png" 
                  alt="Decrease" 
                  width={16} 
                  height={16}
                  className="w-4 h-4"
                />
              </button>
              
              <div className="text-center">
                <div className="w-14 h-10 bg-amber-200 rounded flex items-center justify-center">
                  <span className="text-gray-800 font-semibold text-lg">{item.quantity}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">24 PCS</p>
              </div>
              
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
              >
                <Image 
                  src="/assets/icons/Property 1=Positive.png" 
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
    </div>
  );
};
