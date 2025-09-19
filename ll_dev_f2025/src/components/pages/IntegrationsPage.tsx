'use client';

import { 
  Sidebar, 
  ErrorBoundary
} from '@/components';
import { useNavigation } from '@/contexts/NavigationContext';

export default function IntegrationsPage() {
  const {
    activeNavItem,
    setActiveNavItem,
    sidebarExpanded,
    setSidebarExpanded,
  } = useNavigation();

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
          {/* Header Section */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                Integrations
              </h1>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col border border-gray-200 m-6 rounded-lg overflow-hidden">
            <div className="flex-1 p-6 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🔗</div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Integrations Page</h2>
                <p className="text-gray-500">This is a placeholder for the Integrations section.</p>
                <p className="text-sm text-gray-400 mt-2">Third-party integrations and API connections will be implemented here.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

