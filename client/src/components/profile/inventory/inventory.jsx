//TODO: when removing last ingredient from inventory doesn't remove it.
import { Link } from "react-router";
import Ingredient from "./ingredient";

function Inventory({ inventory, setInventory, getInventory }) {
  return (
    <>
      <p>Inventory</p>
      {inventory.length ? (
        inventory.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.strIngredient1}
              ingredient={ingredient}
              inventory={inventory}
              setInventory={setInventory}
              getInventory={getInventory}
            ></Ingredient>
          );
        })
      ) : (
        <p>No ingredients!</p>
      )}
      <Link to={"/ingredientsearch"}>
        <button>Add Ingredient</button>
      </Link>
    </>
  );
}

export default Inventory;
