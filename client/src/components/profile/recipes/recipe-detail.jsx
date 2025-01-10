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
      {drinkDetail ? (
        <>
          <p>RecipeDetail</p>
          <h1>{drinkDetail.strDrink}</h1>
          <img src={drinkDetail.strDrinkThumb} />
          <p>{drinkDetail.strInstructions}</p>
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
        </>
      ) : (
        <p>None found...</p>
      )}
    </>
  );
}

export default RecipeDetail;
