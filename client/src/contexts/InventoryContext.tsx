import { createContext, useContext, useState, ReactNode } from "react";
import { InventoryItem } from "../interfaces/Inventory";

interface InventoryContextType {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

export const InventoryContext = createContext<InventoryContextType>({
  inventory: [],
  setInventory: () => []
});

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider = ({children}: InventoryProviderProps) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  return (
      <InventoryContext.Provider value={{ inventory, setInventory }}>
        {children}
      </InventoryContext.Provider>
  );
};

export const useInventoryContext = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventoryContext must be used within a InventoryProvider');
  }
  return context;
};