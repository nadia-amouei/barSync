import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../nav-bar/nav-bar";
import Ingredient from "../inventory/ingredient";

function RecipeDetail() {
  const [drinkDetail, setDrinkDetail] = useState(null);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  let params = useParams();
  const drinkId = params.recipeId;

  useEffect(() => {
    if (!inventory.length) {
      getInventory();
    }
    getFavorites();
    getDrinkDetails(drinkId);
    if (favorites.length) {
      const arrOfIds = favorites.map((el) => el.idDrink);
      setFavoriteIds(arrOfIds);
    }
    if (favoriteIds.includes(Number(drinkId))) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favorited]);

  async function getDrinkDetails(drinkId) {
    const url = "http://localhost:3000/recipedetail/" + drinkId;
    try {
      const response = await fetch(url);
      const fetchResponse = await response.json();
      if (fetchResponse.drinks.length) {
        const cocktailRecipe = fetchResponse.drinks[0];
        const cocktailIngredients = [];
        for (const key in cocktailRecipe) {
          if (key.includes("strIngredient") && cocktailRecipe[key] !== null) {
            cocktailIngredients.push({ strIngredient1: cocktailRecipe[key] });
          }
        }
        setDrinkDetail(cocktailRecipe);
        setDrinkIngredients(cocktailIngredients);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getInventory() {
    const url = "http://localhost:3000/inventory";
    try {
      const response = await fetch(url);
      const fetchInventory = await response.json();
      if (fetchInventory.length) {
        setInventory(fetchInventory);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getFavorites() {
    const url = "http://localhost:3000/favorites";
    try {
      const response = await fetch(url);
      const fetchFavorites = await response.json();
      if (fetchFavorites.length) {
        setFavorites(fetchFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addFavorite() {
    const title = drinkDetail.strDrink;
    const thumb = drinkDetail.strDrinkThumb;
    try {
      await fetch("http://localhost:3000/favorites", {
        method: "POST",
        body: JSON.stringify({
          idDrink: drinkId,
          strDrinkThumb: thumb,
          strDrink: title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFavorited(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFavorite() {
    try {
      await fetch("http://localhost:3000/favorites", {
        method: "DELETE",
        body: JSON.stringify({ idDrink: drinkId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFavorited(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="recipe-detail-container">
        {drinkDetail ? (
          <>
            <div className="recipe-tile">
              <img
                src={drinkDetail.strDrinkThumb}
                className="recipe-tile-img"
              />
              <p className="recipe-tile-text">{drinkDetail.strDrink}</p>
            </div>
            <div className="inventory-container margin-top">
              <h2>Ingredients</h2>
              {drinkIngredients.length ? (
                drinkIngredients.map((ingredient) => {
                  return (
                    <Ingredient
                      key={ingredient.strIngredient1}
                      ingredient={ingredient}
                      inventory={inventory}
                      setInventory={setInventory}
                      getInventory={getInventory}
                    />
                  );
                })
              ) : (
                <p>no ingredients?</p>
              )}
            </div>
          </>
        ) : (
          <p>None found...</p>
        )}
        <div className="inventory-container margin-top margin-right">
          {drinkDetail ? (
            <>
              <h2>Instructions:</h2>
              <p className="instructions-text margin-top">
                {drinkDetail.strInstructions}
              </p>
              <div className="ingredient-container">
                <p>
                  {favorited ? "Remove from favorites?" : "Add to favorites?"}
                </p>
                <button
                  className="ingredient-button"
                  onClick={favorited ? removeFavorite : addFavorite}
                >
                  {favorited
                    ? String.fromCodePoint("0x1F494")
                    : String.fromCodePoint("0x1F9E1")}
                </button>
              </div>
            </>
          ) : (
            <p>No instructions found!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RecipeDetail;
