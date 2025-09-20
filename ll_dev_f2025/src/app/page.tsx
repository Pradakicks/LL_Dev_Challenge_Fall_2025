'use client';

import { 
  Sidebar, 
  SearchBar, 
  ProductItem, 
  OrderQueue,
  ErrorBoundary,
  ProductsPage,
  FulfillmentPage,
  IntegrationsPage,
  AddNewItemModal,
  LoadingSpinner
} from '@/components';
import { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import { useNavigation } from '@/contexts/NavigationContext';
import { NavItem } from '@/types';

export default function Home() {
  const {
    filteredInventory,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    updateQuantity,
    addNewItem,
    addQuantityToItem,
    isHydrated,
    filterOrders,
    sortBy,
    sortDirection,
    filters,
    setSortBy,
    setSortDirection,
    setFilters,
  } = useInventory();
  
  const {
    activeNavItem,
    setActiveNavItem,
    sidebarExpanded,
    setSidebarExpanded,
  } = useNavigation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear all localStorage data
      localStorage.clear();
      // Reload the page to reset the application
      window.location.reload();
    }
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item === activeNavItem) {
      // If clicking the same nav item, toggle sidebar
      setSidebarExpanded(!sidebarExpanded);
    } else {
      // If clicking a different nav item, switch to that page
      setActiveNavItem(item);
    }
  };

  // Render different pages based on active navigation item
  console.log('Current activeNavItem:', activeNavItem);
  if (activeNavItem === 'products') {
    console.log('Rendering ProductsPage');
    return <ProductsPage />;
  }
  
  if (activeNavItem === 'fulfillment') {
    return <FulfillmentPage />;
  }
  
  if (activeNavItem === 'integrations') {
    return <IntegrationsPage />;
  }

  // Show loading state until hydration is complete
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading application..." />
      </div>
    );
  }

  // Default to Materials page (materials nav item)
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex">
        <Sidebar
          expanded={sidebarExpanded}
          activeNavItem={activeNavItem}
          onNavItemClick={handleNavItemClick}
          onLogout={handleLogout}
        />

        <div className="flex-1 flex flex-col">
          {/* Header Section with Title and Tabs */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                Materials <span className="text-gray-500 font-normal text-2xl">/ Blanks</span>
              </h1>
              
              {/* Tab Navigation */}
              <div className="flex">
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-6 py-3 text-sm font-semibold rounded-l-lg transition-colors ${
                    activeTab === 'inventory'
                      ? 'bg-white text-gray-800 border border-[#DEDEDE] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inventory
                </button>
                <button
                  onClick={() => setActiveTab('order')}
                  className={`px-6 py-3 text-sm font-semibold rounded-r-lg transition-colors ${
                    activeTab === 'order'
                      ? 'bg-white text-gray-800 border border-[#DEDEDE] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Order Queue
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col border border-gray-200 m-6 rounded-lg overflow-hidden">
            {/* Top Section: Search and Add New */}
            <div className="flex items-center justify-between p-6 bg-white">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                sortBy={sortBy}
                sortDirection={sortDirection}
                filters={filters}
                onSortChange={(sortBy, sortDirection) => {
                  setSortBy(sortBy);
                  setSortDirection(sortDirection);
                }}
                onFiltersChange={setFilters}
              />
              
              {activeTab === 'inventory' && (
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-[#444eaa] text-white py-3 px-6 rounded-lg hover:bg-[#3a4296] transition-colors font-semibold text-lg shadow-sm flex items-center space-x-2"
                  aria-label="Add new inventory item"
                >
                  <span className="text-white text-xl font-bold">+</span>
                  <span>Add New</span>
                </button>
              )}
            </div>

            {/* Bottom Section: Product Items */}
            <div className="flex-1 p-6 bg-white">
              {activeTab === 'inventory' ? (
                <div className="space-y-4">
                  {/* Sort/Filter Status */}
                  {(filters.sizes.length > 0 || filters.colors.length > 0 || filters.lowStock || sortBy !== 'name' || sortDirection !== 'asc') && (
                    <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span>Sort: {sortBy} ({sortDirection})</span>
                        {filters.sizes.length > 0 && <span>Size: {filters.sizes.join(', ')}</span>}
                        {filters.colors.length > 0 && <span>Color: {filters.colors.join(', ')}</span>}
                        {filters.lowStock && <span>Low Stock Only</span>}
                      </div>
                      <button
                        onClick={() => {
                          setSortBy('name');
                          setSortDirection('asc');
                          setFilters({ sizes: [], colors: [], lowStock: false });
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {filteredInventory.map((item) => (
                      <ProductItem
                        key={item.id}
                        item={item}
                        onQuantityChange={updateQuantity}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <OrderQueue 
                  items={filteredInventory} 
                  onOrderCompleted={addQuantityToItem}
                  filterOrders={filterOrders}
                />
              )}
            </div>
          </main>
        </div>

        {/* Add New Item Modal */}
        <AddNewItemModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddItem={addNewItem}
        />
      </div>
    </ErrorBoundary>
  );
}
