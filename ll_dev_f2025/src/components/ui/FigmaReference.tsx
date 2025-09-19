'use client';

import Image from 'next/image';

interface FigmaReferenceProps {
  show: boolean;
  onToggle: () => void;
}

export const FigmaReference = ({ show, onToggle }: FigmaReferenceProps) => {
  return (
    <>
      {/* Figma Reference Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute top-4 right-4 z-20 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
      >
        {show ? 'Hide' : 'Show'} Figma
      </button>
      
      {/* Figma Reference Image */}
      {show && (
        <div className="absolute top-12 right-4 z-10">
          <Image 
            src="/assets/Materials.png" 
            alt="Figma Design Reference" 
            width={400} 
            height={600}
            className="border border-gray-300 rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
};
