import Inventory from "./inventory/inventory"
import RecipeList from "./recipes/recipe-list"

//TODO: initial profile view
function Profile({ inventory, setInventory }) {
  
  return (
    <>
      <p>Profile</p>
      <Inventory inventory={inventory} setInventory={setInventory}></Inventory>
      <RecipeList></RecipeList>
    </>
  )
}

export default Profile