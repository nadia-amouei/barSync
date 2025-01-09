//TODO: recipe component to display recipes to make
//TODO: going to change this and make it filtering through the inventory

import { useEffect, useState } from "react";
import RecipeDetail from "./recipe-detail"

function RecipeList() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    if (!inventory.length) {
      getInventory();
    }
  }, [])

  async function getInventory() {
    const url = "http://localhost:3000/inventory";
    console.log("get inventory triggered")
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
      <p>select the ingredients you would like to use!</p>
      <div>
        {inventory.length ? (inventory.map((ingredient) => {
          return (
            <div key={ingredient.strIngredient1}>{ingredient.strIngredient1}</div>
          )
        })) : (
          <p>You have no ingredients in your inventory!</p>
        )}
      </div>
      <RecipeDetail></RecipeDetail>
    </>
  )
}

export default RecipeList