import { Link } from "react-router";
import Inventory from "./inventory/inventory";
import RecipeList from "./recipes/recipe-list";

//TODO: initial profile view
function Profile({ inventory, setInventory, getInventory }) {
  return (
    <>
      <p>Profile</p>
      <Inventory
        inventory={inventory}
        setInventory={setInventory}
        getInventory={getInventory}
      ></Inventory>

    </>
  );
}

export default Profile;
