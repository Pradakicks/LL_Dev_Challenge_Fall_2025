import { useState, useEffect } from 'react';

/**
 * Custom hook to handle hydration safely
 * Prevents hydration mismatches by ensuring client-side rendering
 */
export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
