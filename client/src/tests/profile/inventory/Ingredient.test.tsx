import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { InventoryContext } from "../../../contexts/InventoryContext";
import Ingredient from "../../../components/profile/inventory/ingredient";
import { InventoryItem } from "../../../interfaces/Inventory";
import userEvent from '@testing-library/user-event';
import { inventory } from "../../mocks/inventory";

jest.mock('../../../services/apiService.ts', () => ({
  addIngredient: jest.fn(),
  removeIngredient: jest.fn(),
}));

describe("Ingredient Component", () => {
  const mockInventory = inventory.mockInventory;
  const mockIngredient1 = inventory.mockIngredient1;
  const setMockInventory = jest.fn();

  function renderComponent(ingredient: InventoryItem, inventory: InventoryItem[]) {
    render(
      <InventoryContext.Provider value={{inventory: inventory, setInventory: setMockInventory}}>
        <Ingredient ingredient={ingredient} inventory={inventory}/>
      </InventoryContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display the ingredient's name", () => {
    renderComponent(inventory.mockIngredient1, mockInventory);

    const ingredientName1 = screen.getByText(mockIngredient1.strIngredient1);
    expect(ingredientName1).toBeInTheDocument();
  });

  it("should update the iconbutton accordingly", async () => {
    renderComponent(inventory.mockIngredient1, []);

    const button = screen.getByRole('button');
    expect(button.textContent).toEqual(String.fromCodePoint(parseInt("0x1F378", 16)));
    await userEvent.click(button);
    expect(button.textContent).toEqual(String.fromCodePoint(parseInt("0x1F5D1", 16)));
    await userEvent.click(button);
    expect(button.textContent).toEqual(String.fromCodePoint(parseInt("0x1F378", 16)));
  });

  it("should add an ingredient to the inventory", async () => {
    renderComponent(inventory.mockIngredient1, []);

    const button = screen.getByRole('button');
    await userEvent.click(button);
    // inventory checks
    expect(setMockInventory).toHaveBeenCalledTimes(1);
    const updateFn = setMockInventory.mock.calls[0][0];
    const updatedInventory = updateFn(mockInventory);
    expect(updatedInventory).toEqual([...mockInventory, mockIngredient1]);
  });

  it("should remove an ingredient from the inventory", async () => {
    renderComponent(inventory.mockIngredient2, mockInventory);

    const button = screen.getByRole('button');
    await userEvent.click(button);
    // inventory checks
    expect(setMockInventory).toHaveBeenCalledTimes(1);
    const updateFn = setMockInventory.mock.calls[0][0];
    const updatedInventory = updateFn(mockInventory);
    expect(updatedInventory).toEqual([mockIngredient1]);
  });
});