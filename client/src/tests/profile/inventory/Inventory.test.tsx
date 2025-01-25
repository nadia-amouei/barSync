import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Inventory from "../../../components/profile/inventory/inventory";
import { InventoryContext } from "../../../contexts/InventoryContext";
import { InventoryItem } from "../../../interfaces/Inventory";
import { inventory } from "../../mocks/inventory";

describe("Inventory Component", () => {
  const message = 'No ingredients! Select Add Ingredient above to begin!'
  const setMockInventory = jest.fn();

  function renderComponent(inventory: InventoryItem[]) {
    render(
      <InventoryContext.Provider value={{inventory: inventory, setInventory: setMockInventory}}>
        <Inventory />
      </InventoryContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display the names of the inventory ingredients", () => {
    renderComponent(inventory.mockInventory);

    const ingredientName1 = screen.getByText('Gin');
    expect(ingredientName1).toBeInTheDocument();
    const ingredientName2 = screen.getByText('Vodka');
    expect(ingredientName2).toBeInTheDocument();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it("should display a message when the inventory is empty", () => {
    renderComponent([]);

    const messageParagraph = screen.getByRole('paragraph');
    expect(messageParagraph.textContent).toEqual(message);
  });
});