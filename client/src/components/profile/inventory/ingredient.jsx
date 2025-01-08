function Ingredient({ ingredient, inventory, setInventory}) {
  
  
  function removeIngredient () {
    const idxOfIngredient = inventory.indexOf(ingredient);
    const updatedInventory = inventory.slice();
    updatedInventory.splice(idxOfIngredient, 1);
    setInventory(updatedInventory);
  }

  return (
    <>
      <div>{ingredient.strIngredient1}</div><button onClick={removeIngredient}>X</button>
    </>
  )
}

export default Ingredient