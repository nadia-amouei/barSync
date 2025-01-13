//TODO: component to display recipe detail

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../nav-bar/nav-bar";
import Ingredient from "../inventory/ingredient";

function RecipeDetail() {
  const [drinkDetail, setDrinkDetail] = useState(null);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [inventory, setInventory] = useState([]);

  let params = useParams();
  const drinkId = params.recipeId;

  useEffect(() => {
    if (!inventory.length) {
      getInventory();
    }
    getDrinkDetails(drinkId);
  }, []);

  async function getDrinkDetails(drinkId) {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
    try {
      const response = await fetch(url + drinkId);
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
    console.log("get inventory triggered");
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
