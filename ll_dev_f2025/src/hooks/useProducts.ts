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
  const loadProducts = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const currentOffset = reset ? 0 : offset;
      const newProducts = await fetchProducts(PRODUCTS_PER_PAGE, currentOffset);

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
    loadProducts(true);
  }, [loadProducts]);

  /**
   * Initial load
   */
  useEffect(() => {
    loadProducts(true);
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
