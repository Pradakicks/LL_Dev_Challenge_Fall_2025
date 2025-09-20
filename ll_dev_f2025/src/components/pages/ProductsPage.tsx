'use client';

import React from 'react';
import { BasePage } from '@/components/layout/BasePage';
import { ProductCard } from '../products/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Button } from '../ui/Button';

/**
 * Products page component with external API integration
 */
export default function ProductsPage() {
  const { products, loading, error, hasMore, loadMore, refreshProducts } = useProducts();

  if (loading && products.length === 0) {
    return (
      <BasePage
        title="Products"
        icon="📦"
        description="Browse our product catalog"
      >
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" text="Loading products..." />
        </div>
      </BasePage>
    );
  }

  if (error) {
    return (
      <BasePage
        title="Products"
        icon="📦"
        description="Browse our product catalog"
      >
        <div className="text-center py-12">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Products</h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <Button onClick={refreshProducts} variant="primary">
            Try Again
          </Button>
        </div>
      </BasePage>
    );
  }

  return (
    <BasePage
      title="Products"
      icon="📦"
      description="Browse our product catalog"
    >
      <div className="space-y-6">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center py-8">
            <Button
              onClick={loadMore}
              variant="secondary"
              disabled={loading}
              className="px-8"
            >
              {loading ? 'Loading...' : 'Load More Products'}
            </Button>
          </div>
        )}

        {/* No More Products */}
        {!hasMore && products.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              You've reached the end of our product catalog
            </p>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-500 text-sm">
              We couldn't find any products at the moment
            </p>
          </div>
        )}
      </div>
    </BasePage>
  );
}

