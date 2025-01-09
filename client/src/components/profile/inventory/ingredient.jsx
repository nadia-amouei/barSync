import { useEffect, useState } from "react";

function Ingredient({ ingredient, inventory, setInventory, getInventory}) {
  const [added, setAdded] = useState(false);


  const plainTextInventory = inventory.map((el) => el.strIngredient1)

  useEffect(() => {
    if (inventory.length && plainTextInventory.includes(ingredient.strIngredient1)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [inventory])

  async function addIngredient() {
    //!commented out old code, need to come back and remove once not needed
    // const inventoryCopy = inventory.slice();
    // inventoryCopy.push(ingredient);
    // setInventory(inventoryCopy);
    try {
      await fetch("http://localhost:3000/inventory", {
        method: "POST",
        body: JSON.stringify({strIngredient1: ingredient.strIngredient1}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getInventory();
    } catch (error) {
      console.log(error);
    }
  }
  
  async function removeIngredient () {
    // const idxOfIngredient = inventory.indexOf(ingredient);
    // const updatedInventory = inventory.slice();
    // updatedInventory.splice(idxOfIngredient, 1);
    // setInventory(updatedInventory);
    try {
      await fetch("http://localhost:3000/inventory", {
        method: "DELETE",
        body: JSON.stringify({strIngredient1: ingredient.strIngredient1}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getInventory();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>{ingredient.strIngredient1}</div><button onClick={added ? removeIngredient : addIngredient}>{added ? "X" : "+"}</button>
    </>
  )
}

export default Ingredient