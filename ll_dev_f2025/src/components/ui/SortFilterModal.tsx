'use client';

import React from 'react';
import { SortOption, SortDirection, FilterOptions } from '@/types';
import { Button } from './Button';

interface SortFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortOption;
  sortDirection: SortDirection;
  filters: FilterOptions;
  onSortChange: (sortBy: SortOption, sortDirection: SortDirection) => void;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

/**
 * Modal for sorting and filtering inventory items
 */
export const SortFilterModal: React.FC<SortFilterModalProps> = ({
  isOpen,
  onClose,
  sortBy,
  sortDirection,
  filters,
  onSortChange,
  onFiltersChange,
  onReset,
}) => {
  if (!isOpen) return null;

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handleColorToggle = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleLowStockToggle = () => {
    onFiltersChange({ ...filters, lowStock: !filters.lowStock });
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'size', label: 'Size' },
    { value: 'color', label: 'Color' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'requiredPcs', label: 'Required Pieces' },
  ];

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['red', 'black', 'white'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Sort & Filter</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Sort Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => onSortChange(e.target.value as SortOption, sortDirection)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-3 flex space-x-2">
              <Button
                onClick={() => onSortChange(sortBy, 'asc')}
                variant={sortDirection === 'asc' ? 'primary' : 'secondary'}
                size="sm"
                className="flex-1"
              >
                ↑ Ascending
              </Button>
              <Button
                onClick={() => onSortChange(sortBy, 'desc')}
                variant={sortDirection === 'desc' ? 'primary' : 'secondary'}
                size="sm"
                className="flex-1"
              >
                ↓ Descending
              </Button>
            </div>
          </div>

          {/* Filter Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Filters</h3>
            
            {/* Size Filter */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filters.sizes.includes(size)
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Color</h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorToggle(color)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                      filters.colors.includes(color)
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Low Stock Filter */}
            <div className="mb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.lowStock}
                  onChange={handleLowStockToggle}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Show only low stock items</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button
              onClick={onReset}
              variant="secondary"
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              onClick={onClose}
              variant="primary"
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
