import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { InventoryProvider } from "./contexts/InventoryContext";
import "./index.css";

function Main () {
  return (
    <>
      <StrictMode>
        <InventoryProvider>
          <FavoritesProvider>
              <App />
          </FavoritesProvider>
        </InventoryProvider>
      </StrictMode>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
