import { useState } from "react";
import { InventoryItem } from "../../../interfaces/Inventory";
import { addIngredient, removeIngredient } from "../../../services/apiService";
import { useInventoryContext } from "../../../contexts/InventoryContext";

interface IngredientProps {
  ingredient: InventoryItem;
  inventory: InventoryItem[];
}

function Ingredient({ ingredient, inventory }: IngredientProps )  {
  const [added, setAdded] = useState(inventory.some(elem => elem.strIngredient1 === ingredient.strIngredient1));

  const { setInventory } = useInventoryContext();

  async function handleClick () {
    if (added) {
      await removeIngredient(ingredient);
      setInventory(prevInventory => prevInventory.filter(elem => elem.strIngredient1 !== ingredient.strIngredient1));
      setAdded(false);
    } else {
      await addIngredient(ingredient);
      setInventory(prevInventory => [...prevInventory, ingredient]);
      setAdded(true);
    }
  }

  return (
    <>
      <div className="ingredient-container">
        <p>{ingredient.strIngredient1}</p>
        <button
          className="ingredient-button"
          onClick={handleClick}
        >
          {added
            ? String.fromCodePoint(parseInt("0x1F5D1", 16))
            : String.fromCodePoint(parseInt("0x1F378", 16))}
        </button>
      </div>
    </>
  );
}

export default Ingredient;
