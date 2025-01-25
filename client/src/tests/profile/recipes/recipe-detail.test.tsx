import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RecipeDetail from '../../../components/profile/recipes/recipe-detail';
import { FavoritesContext } from "../../../contexts/FavoritesContext";
import { InventoryContext } from "../../../contexts/InventoryContext";
import drinkdetails from '../../mocks/drinkdetails';
import { inventory } from "../../mocks/inventory";
import { favorites } from "../../mocks/favorites";
import { FavoriteItem } from '../../../interfaces/Favorite';

jest.mock('../../../services/apiService.ts', () => ({
  getDrink: () => ({drinks: [drinkdetails]}),
  addFavoriteDrink: jest.fn(),
  removeFavoriteDrink: jest.fn(),
}));

describe("Recipe List Component", () => {
  const mockInventory = inventory.mockInventory;
  const setMockInventory = jest.fn();
  const mockFavorites = favorites.mockFavorites;
  const setMockFavorites = jest.fn();

  const mockFavorite1 = favorites.mockFavorite1;
  const mockFavorite2 = favorites.mockFavorite2;
  const mockFavorite3 = favorites.mockFavorite3;

  async function renderComponent(favorite: FavoriteItem) {
    render(
      <InventoryContext.Provider value={{inventory: mockInventory, setInventory: setMockInventory}}>
        <FavoritesContext.Provider value={{favorites: mockFavorites, setFavorites: setMockFavorites}}>
          <MemoryRouter initialEntries={[`/recipe/${favorite.idDrink}` ]}>
            <Routes>
              <Route path='/recipe/:recipeId' element={<RecipeDetail />} />
            </Routes>
          </MemoryRouter>
        </FavoritesContext.Provider>
      </InventoryContext.Provider>
    );
    // waits for component to render properly, test does not work without it
    await waitFor(() => {
      const drinkNameElem = screen.getByTestId("detailspage-drink-name");
      expect(drinkNameElem).toBeInTheDocument();
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display the instructions", async () => {
    await renderComponent(mockFavorite1);

    const instructionsElem = screen.getByTestId("instructions");
    expect(instructionsElem.textContent).toBeTruthy();
  });

  it("should add the recipe to favorites", async () => {
    await renderComponent(mockFavorite1);

    const favoriteButton = screen.getByTestId("favorite-button");
    await userEvent.click(favoriteButton);

    expect(setMockFavorites).toHaveBeenCalledTimes(1);
    const updateFn = setMockFavorites.mock.calls[0][0];
    const updatedFavorites = updateFn(mockFavorites);
    expect(updatedFavorites).toEqual([...mockFavorites, mockFavorite1]);
  });

  it("should remove the recipe from favorites", async () => {
    await renderComponent(mockFavorite2);

    const favoriteButton = screen.getByTestId("favorite-button");
    await userEvent.click(favoriteButton);

    expect(setMockFavorites).toHaveBeenCalledTimes(1);
    const updateFn = setMockFavorites.mock.calls[0][0];
    const updatedFavorites = updateFn(mockFavorites);
    expect(updatedFavorites).toEqual([mockFavorite3]);
  });
});