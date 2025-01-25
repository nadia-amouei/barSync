import Ingredient from "./ingredient";
import { useInventoryContext } from "../../../contexts/InventoryContext";

function Inventory() {
  const { inventory } = useInventoryContext();
  return (
    <>
      <h2 className="subtitle">Inventory:</h2>
      {inventory.length ? (
        inventory.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.strIngredient1}
              ingredient={ingredient}
              inventory={inventory}
            ></Ingredient>
          );
        })
      ) : (
        <p>No ingredients! Select Add Ingredient above to begin!</p>
      )}
    </>
  );
}

export default Inventory;
