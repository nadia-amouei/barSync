import { createContext, useContext, useState, ReactNode } from "react";
import { FavoriteItem } from "../interfaces/Favorite";

interface FavoritesContextType {
  favorites: FavoriteItem[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>
}

export const FavoritesContext = createContext<FavoritesContextType|undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({children}: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  return (
      <FavoritesContext.Provider value={{ favorites, setFavorites }}>
        {children}
      </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};