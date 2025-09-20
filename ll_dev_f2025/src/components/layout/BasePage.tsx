import React from 'react';
import { Sidebar, ErrorBoundary } from '@/components';
import { useNavigation } from '@/contexts/NavigationContext';

interface BasePageProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
  description?: string;
}

/**
 * Base page component that provides consistent layout structure
 * for all application pages with sidebar navigation
 */
export const BasePage: React.FC<BasePageProps> = ({ 
  title, 
  children, 
  icon = '📄',
  description 
}) => {
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
                {title}
              </h1>
            </div>
            {description && (
              <p className="text-gray-500 mt-2">{description}</p>
            )}
          </div>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col border border-gray-200 m-6 rounded-lg overflow-hidden">
            <div className="flex-1 p-6 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">{icon}</div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title} Page</h2>
                <p className="text-gray-500">This is a placeholder for the {title} section.</p>
                {description && (
                  <p className="text-sm text-gray-400 mt-2">{description}</p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};
