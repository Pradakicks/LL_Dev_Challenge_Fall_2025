'use client';

import React, { useState } from 'react';
import { SortOption, SortDirection, FilterOptions } from '@/types';
import { SortFilterModal } from './SortFilterModal';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  sortBy?: SortOption;
  sortDirection?: SortDirection;
  filters?: FilterOptions;
  onSortChange?: (sortBy: SortOption, sortDirection: SortDirection) => void;
  onFiltersChange?: (filters: FilterOptions) => void;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  sortBy = 'name',
  sortDirection = 'asc',
  filters = { sizes: [], colors: [], lowStock: false },
  onSortChange,
  onFiltersChange
}: SearchBarProps) => {
  const [isSortFilterOpen, setIsSortFilterOpen] = useState(false);

  const handleSortChange = (newSortBy: SortOption, newSortDirection: SortDirection) => {
    onSortChange?.(newSortBy, newSortDirection);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    onFiltersChange?.(newFilters);
  };

  const handleReset = () => {
    onSortChange?.('name', 'asc');
    onFiltersChange?.({ sizes: [], colors: [], lowStock: false });
  };

  const hasActiveFilters = filters.sizes.length > 0 || filters.colors.length > 0 || filters.lowStock;

  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Materials"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-900"
          />
        </div>
        
        {/* Filter and Sort Icons */}
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsSortFilterOpen(true)}
            className={`p-3 rounded-lg transition-colors relative ${
              hasActiveFilters 
                ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title="Filter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 4h18v2H3V4zm0 5h18v2H3V9zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
            {hasActiveFilters && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></div>
            )}
          </button>
          <button 
            onClick={() => setIsSortFilterOpen(true)}
            className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Sort"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Sort & Filter Modal */}
      <SortFilterModal
        isOpen={isSortFilterOpen}
        onClose={() => setIsSortFilterOpen(false)}
        sortBy={sortBy}
        sortDirection={sortDirection}
        filters={filters}
        onSortChange={handleSortChange}
        onFiltersChange={handleFiltersChange}
        onReset={handleReset}
      />
    </>
  );
};
