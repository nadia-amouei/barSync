import Inventory from "./inventory/inventory";
import { Link } from "react-router";

        //TODO change styling here
function Profile({ inventory, setInventory, getInventory, favorites, getFavorites, setFavorites }) {
  return (
    <>
      <div className="profile-container">
        <div className="welcome-text">
          <h2 className="subtitle">Welcome to barSync!</h2>
          <p>
            To the right you will see your ingredient inventory where you can
            store ingredients you already own.
          </p>
          <p>
            If you wish to add a new ingredient select the button in the bar
            above.
          </p>
          <p>Want to make something? Select the button in the bar above.</p>
        </div>
        <div className="inventory-container">
          <Inventory
            inventory={inventory}
            setInventory={setInventory}
            getInventory={getInventory}
          ></Inventory>
        </div>
        <div className="recipe-tile-container">
          <h2 className="subtitle">Favorites:</h2>
          {favorites.length ? (favorites.map((favorite) => {
            return (
              <div className="recipe-tile" key={favorite.idDrink}>
                  <Link to={"/recipe/" + favorite.idDrink}>
                    <img
                      className="recipe-tile-img"
                      src={favorite.strDrinkThumb}
                    ></img>
                  </Link>
                  <p className="recipe-tile-text">{favorite.strDrink}</p>
                </div>
            )
          })) : (
            <p className="recipe-tile-default-text subtitle">
            No favorites to display! Take a look at some recipes to add some!
          </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
