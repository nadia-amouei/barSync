function Ingredient({ ingredient, inventory, setInventory}) {
  
  
  function removeIngredient () {
    const idxOfIngredient = inventory.indexOf(ingredient);
    const updatedInventory = inventory.slice();
    updatedInventory.splice(idxOfIngredient, 1);
    setInventory(updatedInventory);
  }
//TODO: add a toggle for add / remove ingredient this is going to be re-used for the ingredient search 
  return (
    <>
      <div>{ingredient.strIngredient1}</div><button onClick={removeIngredient}>X</button>
    </>
  )
}

export default Ingredient