//TODO: inventory component with list of ingredients

function Inventory({ inventory }) {
  
  return (
    <>
      <p>Inventory</p>
      {inventory.length ? (
        inventory.map((ingredient) => {
            return (
                <li key={ingredient.strIngredient1}>{ingredient.strIngredient1}</li>
            )
        })
      ) : (
        <p>No ingredients!</p>
      )}
    </>
  )
}

export default Inventory

