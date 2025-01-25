import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFavoritesContext } from "../../../contexts/FavoritesContext";
import { useInventoryContext } from "../../../contexts/InventoryContext";
import { InventoryItem } from "../../../interfaces/Inventory";
import { addFavoriteDrink, getDrink, removeFavoriteDrink } from "../../../services/apiService";
import Ingredient from "../inventory/ingredient";
import { DrinkDetails } from "../../../interfaces/DrinkDetails";

function RecipeDetail() {
  const { inventory } = useInventoryContext();
  const { favorites, setFavorites } = useFavoritesContext();

  const [drinkDetail, setDrinkDetail] = useState<DrinkDetails | null>(null);
  const [drinkIngredients, setDrinkIngredients] = useState<InventoryItem[]>([]);
  const [favorited, setFavorited] = useState<boolean>(false);

  let params = useParams<{ recipeId: string }>();
  const drinkId = params.recipeId;

  useEffect(() => {
    if (drinkId) getDrinkDetails(drinkId);

    setFavorited(favorites.some(elem => elem.idDrink === Number(drinkId)));
  }, [favorites]);

  async function getDrinkDetails(drinkId: string) {
    try {
      const fetchResponse = await getDrink(drinkId);
      if (fetchResponse.drinks.length) {
        const cocktailRecipe = fetchResponse.drinks[0];
        const cocktailIngredients = [];
        for (const key in cocktailRecipe) {
          if (key.includes("strIngredient") && cocktailRecipe[key] !== null) {
            cocktailIngredients.push({ id: 0, strIngredient1: cocktailRecipe[key], createdAt: '', updatedAt: '' });
          }
        }
        setDrinkDetail(cocktailRecipe);
        setDrinkIngredients(cocktailIngredients);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addFavorite() {
    const title = drinkDetail?.strDrink || "";
    const thumb = drinkDetail?.strDrinkThumb || "";
    if (!drinkId || !title || !thumb) return;
    try {
      await addFavoriteDrink(drinkId, title, thumb);
      setFavorited(true);
      setFavorites(prevFavs => [...prevFavs, {id: 0, idDrink: Number(drinkId), strDrinkThumb: thumb, strDrink: title}]);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFavorite() {
    try {
      if (!drinkId) return;
      await removeFavoriteDrink(drinkId);
      setFavorited(false);
      setFavorites(prevFavs => prevFavs.filter(elem => elem.idDrink !== Number(drinkId)));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="recipe-detail-container">
        {drinkDetail ? (
          <>
            <div className="recipe-tile">
              <img
                src={drinkDetail.strDrinkThumb}
                className="recipe-tile-img"
              />
              <p className="recipe-tile-text" data-testid="detailspage-drink-name">{drinkDetail.strDrink}</p>
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
              <p className="instructions-text margin-top" data-testid="instructions">
                {drinkDetail.strInstructions}
              </p>
              <div className="ingredient-container">
                <p>
                  {favorited ? "Remove from favorites?" : "Add to favorites?"}
                </p>
                <button
                  className="ingredient-button"
                  data-testid="favorite-button"
                  onClick={favorited ? removeFavorite : addFavorite}
                >
                  {favorited
                    ? String.fromCodePoint(parseInt("0x1F494"))
                    : String.fromCodePoint(parseInt("0x1F9E1"))}
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
