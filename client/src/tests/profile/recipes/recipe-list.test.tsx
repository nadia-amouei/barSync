import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RecipeDetail from '../../../components/profile/recipes/recipe-detail';
import RecipeList from "../../../components/profile/recipes/recipe-list";
import { InventoryContext } from "../../../contexts/InventoryContext";
import { inventory } from "../../mocks/inventory";
import recipelist from '../../mocks/recipelist';

jest.mock('../../../services/apiService.ts', () => ({
  getFilteredRecipes: () => ({drinks: recipelist})
}));

describe("Recipe List Component", () => {
  const mockInventory = inventory.mockInventory;
  const setMockInventory = jest.fn();

  function renderComponent() {
    render(
      <InventoryContext.Provider value={{inventory: mockInventory, setInventory: setMockInventory}}>
        <MemoryRouter initialEntries={['/recipes' ]}>
          <Routes>
            <Route path='/recipes' element={<RecipeList />} />
            <Route path='/recipe/:recipeId' element={<RecipeDetail />} />
          </Routes>
        </MemoryRouter>
      </InventoryContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display a message when no ingredients are selected", async () => {
    renderComponent();

    const msgElem = screen.getByText("No recipes to display! Try selecting some ingredients to the left.");
    expect(msgElem).toBeInTheDocument();

    const addIngredientButton = screen.getByTestId(`${inventory.mockIngredient1.strIngredient1}-button`);
    await userEvent.click(addIngredientButton);
    expect(msgElem).not.toBeInTheDocument();
  });

  it("should display suitable recipes for selected ingredients", async () => {
    renderComponent();
    const addIngredientButton = screen.getByTestId(`${inventory.mockIngredient1.strIngredient1}-button`);
    await userEvent.click(addIngredientButton);

    const recipeContainer = screen.getByTestId("recipe-tile-container");
    expect(recipeContainer.children.length).toBeGreaterThan(0);
  });
});