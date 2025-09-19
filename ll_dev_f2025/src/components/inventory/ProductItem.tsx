'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TShirtItem } from '@/types';

interface ProductItemProps {
  item: TShirtItem;
  onQuantityChange: (id: number, quantity: number) => void;
}

export const ProductItem = React.memo<ProductItemProps>(({ item, onQuantityChange }) => {
  // Determine if quantity is below required (yellow state)
  const isLowStock = item.quantity < item.requiredPcs;
  const [isSelected, setIsSelected] = useState(false);
  
  return (
    <div className="flex items-center w-full h-16">
      {/* Product Section */}
      <div className="flex-1 flex items-center space-x-4">
        {/* T-shirt Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${
          item.color === 'red' ? 'bg-red-500' :
          item.color === 'black' ? 'bg-black' :
          'bg-white border-2 border-gray-300'
        }`}>
          <Image 
            src="/assets/icons/Property 1=Placeholder.png" 
            alt="T-shirt" 
            width={28} 
            height={28}
            className={`w-7 h-7 ${item.color === 'white' ? 'filter brightness-0' : 'filter brightness-0 invert'}`}
          />
        </div>
        
        {/* Product Name */}
        <div className="flex-1">
          <p className="text-gray-800 font-semibold text-lg">
            {item.name} / {item.size}
          </p>
        </div>
      </div>

      {/* Quantity Controls Section */}
      <div className="w-80 flex items-stretch h-full">
        {/* Decrease Button */}
        <button
          onClick={() => onQuantityChange(item.id, Math.max(0, item.quantity - 1))}
          className="w-12 rounded-l border border-gray-300 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
          aria-label={`Decrease quantity for ${item.name}`}
        >
          <Image 
            src="/assets/icons/Property 1=Negative.png" 
            alt="Decrease" 
            width={16} 
            height={16}
            className="w-4 h-4"
          />
        </button>
        
        {/* Stock Number and PCS Container */}
        <div 
          className="flex-1 flex flex-col cursor-pointer"
          onClick={() => setIsSelected(!isSelected)}
        >
          {/* Stock Number */}
          <div 
            className={`text-center border-t border-b px-2 py-1 flex-1 flex items-center justify-center ${
              isLowStock 
                ? 'border-[#e3d0ab] bg-[#faf2e3]'
                : 'border-gray-300 bg-white'
            }`}
            role="status" 
            aria-label={`Current quantity: ${item.quantity}`}
          >
            <div className="text-gray-800 font-semibold text-lg">{item.quantity}</div>
          </div>
          
          {/* PCS Label */}
          <div className={`text-center border-b px-2 py-1 flex-1 flex items-center justify-center ${
            isLowStock 
              ? 'border-[#e3d0ab] bg-[#c19a4d]'
              : 'border-gray-300 bg-[#f2f2f2]'
          }`}>
            <p className={`text-xs ${isLowStock ? 'text-white' : 'text-gray-700'}`}>{item.requiredPcs} PCS</p>
          </div>
        </div>
        
        {/* Increase Button */}
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="w-12 rounded-r border border-gray-300 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
          aria-label={`Increase quantity for ${item.name}`}
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
  );
});
