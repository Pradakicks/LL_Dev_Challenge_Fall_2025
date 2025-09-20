import { useState, useEffect, useCallback } from 'react';
import { ConvertedProduct } from '@/types';
import { fetchProducts } from '@/lib/api';

/**
 * Custom hook for managing products data from external API
 */
export const useProducts = () => {
  const [products, setProducts] = useState<ConvertedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const PRODUCTS_PER_PAGE = 20;

  /**
   * Load products from API
   */
  const loadProducts = useCallback(async (reset: boolean = false, currentOffset?: number) => {
    try {
      console.log('Loading products...', { reset, currentOffset, offset });
      setLoading(true);
      setError(null);

      const offsetToUse = currentOffset !== undefined ? currentOffset : (reset ? 0 : offset);
      console.log('Fetching products with offset:', offsetToUse);
      
      const newProducts = await fetchProducts(PRODUCTS_PER_PAGE, offsetToUse);
      console.log('Fetched products:', newProducts.length);

      if (reset) {
        setProducts(newProducts);
        setOffset(PRODUCTS_PER_PAGE);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
        setOffset(prev => prev + PRODUCTS_PER_PAGE);
      }

      // Check if we have more products to load
      setHasMore(newProducts.length === PRODUCTS_PER_PAGE);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [offset]);

  /**
   * Load more products (for pagination)
   */
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadProducts(false);
    }
  }, [loading, hasMore, loadProducts]);

  /**
   * Refresh products (reset and reload)
   */
  const refreshProducts = useCallback(() => {
    setOffset(0);
    loadProducts(true, 0);
  }, [loadProducts]);

  /**
   * Initial load
   */
  useEffect(() => {
    loadProducts(true, 0);
  }, []);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refreshProducts,
  };
};
