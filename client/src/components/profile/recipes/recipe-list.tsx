import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FavoriteItem } from "../../../interfaces/Favorite";
import { useInventoryContext } from "../../../contexts/InventoryContext";
import { getFilteredRecipes } from "../../../services/apiService";

function RecipeList() {
  const { inventory } = useInventoryContext();
  const [recipeFilters, setRecipeFilters] = useState<string[]>([]);
  const [recipeList, setRecipeList] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    if (recipeFilters.length) {
      getRecipes();
    } else {
      setRecipeList([]);
    }
  }, [recipeFilters]);

  async function getRecipes() {
    const filter = recipeFilters.join("9");
    try {
      const fetchResponse = await getFilteredRecipes(filter);
      if (fetchResponse.drinks.length) {
        setRecipeList(fetchResponse.drinks);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addIngredient(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const ingredient = event.currentTarget.value;
    if (!ingredient) return;
    const updatedFilter = recipeFilters.slice();
    updatedFilter.push(ingredient.split(" ").join("_"));
    setRecipeFilters(updatedFilter);
  }

  function removeIngredient(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const ingredient = event.currentTarget.value;
    if (!ingredient) return;
    const idxOfIngredient = recipeFilters.indexOf(ingredient);
    const updatedFilter = recipeFilters.slice();
    updatedFilter.splice(idxOfIngredient, 1);
    setRecipeFilters(updatedFilter);
  }

  return (
    <>
      <div className="recipe-list-container">
        <div className="inventory-container">
          <p>Select the ingredients you would like to use!</p>
          {inventory.length ? (
            inventory.map((ingredient) => {
              return (
                <div
                  className="ingredient-container"
                  key={ingredient.strIngredient1}
                  data-testid={ingredient.strIngredient1}
                >
                  {ingredient.strIngredient1}

                  <button
                    className="ingredient-button"
                    value={ingredient.strIngredient1}
                    data-testid={ingredient.strIngredient1 + '-button'}
                    onClick={
                      recipeFilters.includes(
                        ingredient.strIngredient1.split(" ").join("_")
                      )
                        ? removeIngredient
                        : addIngredient
                    }
                  >
                    {recipeFilters.includes(
                      ingredient.strIngredient1.split(" ").join("_")
                    )
                      ? "X"
                      : "+"}
                  </button>
                </div>
              );
            })
          ) : (
            <p>You have no ingredients in your inventory!</p>
          )}
        </div>
        <div className="recipe-tile-container" data-testid="recipe-tile-container">
          {recipeList.length ? (
            recipeList.map((recipe) => {
              return (
                <div className="recipe-tile" key={recipe.idDrink}>
                  <Link to={"/recipe/" + recipe.idDrink}>
                    <img
                      className="recipe-tile-img"
                      src={recipe.strDrinkThumb}
                    ></img>
                  </Link>
                  <p className="recipe-tile-text">{recipe.strDrink}</p>
                </div>
              );
            })
          ) : (
            <p className="recipe-tile-default-text subtitle">
              No recipes to display! Try selecting some ingredients to the left.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default RecipeList;
