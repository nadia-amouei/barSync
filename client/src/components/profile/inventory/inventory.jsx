//TODO: inventory component with list of ingredients
//TODO: button functionality

import { Link } from "react-router"
import Ingredient from "./ingredient"

function Inventory({ inventory, setInventory }) {



  return (
    <>
      <p>Inventory</p>
      {inventory.length ? (
        inventory.map((ingredient) => {
            return (
                <Ingredient key={ingredient.strIngredient1} ingredient={ingredient} inventory={inventory} setInventory={setInventory}></Ingredient>
            )
        })
      ) : (
        <p>No ingredients!</p>
      )}
      <Link to={'/ingredientsearch'}>
      <button>Add Ingredient</button>
      </Link>
    </>
  )
}

export default Inventory

