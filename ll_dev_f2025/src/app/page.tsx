'use client';

import { 
  Sidebar, 
  SearchBar, 
  ProductItem, 
  OrderQueue,
  ErrorBoundary,
  ProductsPage,
  FulfillmentPage,
  IntegrationsPage
} from '@/components';
import Image from 'next/image';
import { useInventory } from '@/hooks/useInventory';
import { useNavigation } from '@/contexts/NavigationContext';

export default function Home() {
  const {
    filteredInventory,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    updateQuantity,
  } = useInventory();
  
  const {
    activeNavItem,
    setActiveNavItem,
    sidebarExpanded,
    setSidebarExpanded,
  } = useNavigation();

  // Render different pages based on active navigation item
  if (activeNavItem === 'products') {
    return <ProductsPage />;
  }
  
  if (activeNavItem === 'fulfillment') {
    return <FulfillmentPage />;
  }
  
  if (activeNavItem === 'integrations') {
    return <IntegrationsPage />;
  }

  // Default to Materials page (materials nav item)
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex">
        <Sidebar
          expanded={sidebarExpanded}
          activeNavItem={activeNavItem}
          onNavItemClick={setActiveNavItem}
          onToggleExpanded={() => setSidebarExpanded(!sidebarExpanded)}
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
              />
              
              {activeTab === 'inventory' && (
                <button 
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
                <div className="space-y-2">
                  {filteredInventory.map((item) => (
                    <ProductItem
                      key={item.id}
                      item={item}
                      onQuantityChange={updateQuantity}
                    />
                  ))}
                </div>
              ) : (
                <OrderQueue items={filteredInventory} />
              )}
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
