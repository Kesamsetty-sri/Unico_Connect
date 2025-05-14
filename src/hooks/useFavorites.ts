// hooks/useFavorites.ts
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'product-favorites';

export const useFavorites = (productId: number) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Load initial favorite status from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      const favoritesArray: number[] = JSON.parse(storedFavorites);
      setIsFavorite(favoritesArray.includes(productId));
    }
  }, [productId]);

  const toggleFavorite = useCallback(() => {
    setIsFavorite((prevFavorite) => {
      const newFavoriteStatus = !prevFavorite;
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      let favoritesArray: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (newFavoriteStatus) {
        // Add to favorites
        if (!favoritesArray.includes(productId)) {
          favoritesArray.push(productId);
        }
      } else {
        // Remove from favorites
        favoritesArray = favoritesArray.filter((id) => id !== productId);
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesArray));
      return newFavoriteStatus;
    });
  }, [productId]);

  return { isFavorite, toggleFavorite };
};

// Optional: A hook to get all favorite IDs (e.g., for a "My Favorites" page)
export const useAllFavorites = () => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
            setFavoriteIds(JSON.parse(storedFavorites));
        }

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === FAVORITES_KEY && event.newValue) {
                setFavoriteIds(JSON.parse(event.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return favoriteIds;
};
