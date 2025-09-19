'use client';

import Image from 'next/image';
import { TShirtItem } from '@/types';

interface ProductListProps {
  items: TShirtItem[];
}

export const ProductList = ({ items }: ProductListProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 h-16 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
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
      ))}
    </div>
  );
};
