import { useEffect, useState } from "react";

function Ingredient({ ingredient, inventory, setInventory}) {
  const [added, setAdded] = useState(false);


  const plainTextInventory = inventory.map((el) => el.strIngredient1)

  useEffect(() => {
    if (inventory.length && plainTextInventory.includes(ingredient.strIngredient1)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [inventory])

  function addIngredient() {
    const inventoryCopy = inventory.slice();
    inventoryCopy.push(ingredient);
    setInventory(inventoryCopy);
  }
  
  function removeIngredient () {
    const idxOfIngredient = inventory.indexOf(ingredient);
    const updatedInventory = inventory.slice();
    updatedInventory.splice(idxOfIngredient, 1);
    setInventory(updatedInventory);
  }
//TODO: add a toggle for add / remove ingredient this is going to be re-used for the ingredient search 
  return (
    <>
      <div>{ingredient.strIngredient1}</div><button onClick={added ? removeIngredient : addIngredient}>{added ? "X" : "+"}</button>
    </>
  )
}

export default Ingredient