import '@testing-library/jest-dom';
import { waitFor, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/nav-bar/nav-bar";
import Profile from "../../components/profile/profile";
import IngredientSearch from "../../components/profile/inventory/ingredientSearch";
import RecipeList from "../../components/profile/recipes/recipe-list";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { InventoryContext } from "../../contexts/InventoryContext";
import { FavoriteItem } from "../../interfaces/Favorite";
import { InventoryItem } from "../../interfaces/Inventory";

jest.mock('../../services/apiService.ts', () => ({
  getAllIngredients: () => ({drinks: []}),
}));

describe("Navbar Component", () => {
  const mockInventory: InventoryItem[] = [];
  const setMockInventory = jest.fn();
  const mockFavorites: FavoriteItem[] = [];
  const setMockFavorites = jest.fn();

  function renderComponent(initialRoute="/") {
    render(
      <InventoryContext.Provider value={{inventory: mockInventory, setInventory: setMockInventory}}>
        <FavoritesContext.Provider value={{favorites: mockFavorites, setFavorites: setMockFavorites}}>
          <MemoryRouter initialEntries={[initialRoute]}>
          <Navbar />
            <Routes>
              <Route path='/' element={<Profile />} />
              <Route path='/ingredientsearch' element={<IngredientSearch />} />
              <Route path='/recipes' element={<RecipeList />} />
            </Routes>
          </MemoryRouter>
        </FavoritesContext.Provider>
      </InventoryContext.Provider>
    );
  }

  it("should navigate to ingredient search", async () => {
    renderComponent();

    const button = screen.getByText('Add Ingredient');
    userEvent.click(button);
    await waitFor(() => {
      const msg = screen.getByText("Welcome to the ingredient search!");
      expect(msg).toBeInTheDocument();
    });
  });

  it("should navigate to recipes", async () => {
    renderComponent();

    const button = screen.getByText('Make something?');
    userEvent.click(button);
    await waitFor(() => {
      const msg = screen.getByText("Select the ingredients you would like to use!");
      expect(msg).toBeInTheDocument();
    });
  });

  it("should navigate to home", async () => {
    renderComponent("/ingredientsearch");

    const button = screen.getByText('Home');
    userEvent.click(button);
    await waitFor(() => {
      const msg = screen.getByText("Welcome to barSync!");
      expect(msg).toBeInTheDocument();
    });
  });
});