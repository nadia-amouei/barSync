import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { InventoryContext } from "../../../contexts/InventoryContext";
import { InventoryItem } from "../../../interfaces/Inventory";
import userEvent from '@testing-library/user-event';
import fullIngredientlist from '../../mocks/fullIngredientlist';
import IngredientSearch from "../../../components/profile/inventory/ingredientSearch";

jest.mock('../../../services/apiService.ts', () => ({
  getAllIngredients: () => ({drinks: fullIngredientlist}),
}));

describe("IngredientSearch Component", () => {

  const mockInventory: InventoryItem[] = [];
  const setMockInventory = jest.fn();

  function renderComponent() {
    render(
      <InventoryContext.Provider value={{inventory: mockInventory, setInventory: setMockInventory}}>
        <IngredientSearch />
      </InventoryContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should search for ingredients and display the names", async () => {
    const searchTerm = "Orange";
    renderComponent();

    const input = screen.getByRole('textbox');
    await userEvent.type(input, searchTerm);
    const resultsContainer = screen.getByTestId('search-results');
    const regex = new RegExp(`${searchTerm}`, 'i')
    Array.from(resultsContainer.children).forEach(child => {
      expect(child.textContent).toMatch(regex);
    });
  });

  it("should display a message when no results are found", async () => {
    const searchTerm = "\\?\\\"!2";
    renderComponent();

    const input = screen.getByRole('textbox');
    await userEvent.type(input, searchTerm);
    const resultsContainer = screen.getByTestId('search-results');
    expect(resultsContainer.children.length).toEqual(1);
    const regex = new RegExp(`${searchTerm}`, 'i')
    expect(resultsContainer.children[0].textContent).not.toMatch(regex);
    expect(resultsContainer.children[0].textContent).toEqual("Start typing to filter ingredients!");
  });
});