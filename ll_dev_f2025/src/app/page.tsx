'use client';

import { 
  Sidebar, 
  Header, 
  SearchBar, 
  ProductList, 
  InventoryPanel,
  ErrorBoundary
} from '@/components';
import { useInventory } from '@/hooks/useInventory';

export default function Home() {
  const {
    filteredInventory,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    activeNavItem,
    setActiveNavItem,
    sidebarExpanded,
    setSidebarExpanded,
    updateQuantity,
  } = useInventory();

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
          <main className="flex-1 flex">
            <div className="flex-1 p-6 relative bg-white">
              <div className="mb-8">
                <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                  Materials <span className="text-gray-500 font-normal text-2xl">/ Blanks</span>
                </h1>
              </div>

              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
              />

              <ProductList items={filteredInventory} />
            </div>

            <InventoryPanel
              activeTab={activeTab}
              onTabChange={setActiveTab}
              items={filteredInventory}
              onQuantityChange={updateQuantity}
            />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
