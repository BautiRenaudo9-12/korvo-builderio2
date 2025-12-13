import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'korvo-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(new Set(parsed));
      } catch {
        setFavorites(new Set());
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    }
  }, [favorites, isHydrated]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  }, []);

  const isFavorite = useCallback((id: number) => {
    return favorites.has(id);
  }, [favorites]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isHydrated,
  };
};
