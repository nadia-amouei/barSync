//TODO: recipe component to display recipes to make
//TODO: going to change this and make it filtering through the inventory

import { useEffect, useState } from "react";
import RecipeDetail from "./recipe-detail";
import Navbar from "../../nav-bar/nav-bar";
import { Link } from "react-router";

function RecipeList() {
  const [inventory, setInventory] = useState([]);
  const [recipeFilters, setRecipeFilters] = useState([]);
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    if (!inventory.length) {
      getInventory();
    }
    if (recipeFilters.length) {
      getRecipes();
    } else {
      setRecipeList([]);
    }
  }, [recipeFilters]);

  async function getInventory() {
    const url = "http://localhost:3000/inventory";
    console.log("get inventory triggered");
    try {
      console.log("1");
      const response = await fetch(url);
      const fetchInventory = await response.json();
      if (fetchInventory.length) {
        console.log("2");
        setInventory(fetchInventory);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //TODO: need some way of dealing with 'none found'
  async function getRecipes() {
    const url =
      "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=";
    const filter = recipeFilters.join();
    console.log(url + filter);
    try {
      const response = await fetch(url + filter);
      const fetchResponse = await response.json();
      console.log(fetchResponse);
      if (
        fetchResponse.drinks.length &&
        fetchResponse.drinks !== "None Found"
      ) {
        setRecipeList(fetchResponse.drinks);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addIngredient(event) {
    const ingredient = event.target.value;
    console.log(ingredient);
    const updatedFilter = recipeFilters.slice();
    updatedFilter.push(ingredient.split(" ").join("_"));
    setRecipeFilters(updatedFilter);
    // getRecipes();
  }

  function removeIngredient(event) {
    const ingredient = event.target.value;
    const idxOfIngredient = recipeFilters.indexOf(ingredient);
    const updatedFilter = recipeFilters.slice();
    updatedFilter.splice(idxOfIngredient, 1);
    setRecipeFilters(updatedFilter);
    // getRecipes();
  }
  //TODO: test button toggles below and functionality for add remove to filter
  return (
    <>
      <Navbar></Navbar>
      <p>select the ingredients you would like to use!</p>
      <div>
        {inventory.length ? (
          inventory.map((ingredient) => {
            return (
              <div key={ingredient.strIngredient1}>
                {ingredient.strIngredient1}
                <button
                  value={ingredient.strIngredient1}
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
                    ? "Remove"
                    : "Add"}
                </button>
              </div>
            );
          })
        ) : (
          <p>You have no ingredients in your inventory!</p>
        )}
      </div>
      <div>
        {recipeList.length ? (
          recipeList.map((recipe) => {
            return (
              <div key={recipe.idDrink}>
                <Link to={"/recipe/" + recipe.idDrink}>
                  <img src={recipe.strDrinkThumb}></img>
                </Link>
                {recipe.strDrink}
              </div>
            );
          })
        ) : (
          <p>Select some ingredients to get some recipes!</p>
        )}
      </div>
    </>
  );
}

export default RecipeList;
