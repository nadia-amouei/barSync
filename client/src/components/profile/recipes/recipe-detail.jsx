//TODO: component to display recipe detail

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../nav-bar/nav-bar";

function RecipeDetail() {
  const [drinkDetail, setDrinkDetail] = useState(null);

  let params = useParams();
  const drinkId = params.recipeId;

  useEffect(() => {
    getDrinkDetails(drinkId);
  }, []);

  async function getDrinkDetails(drinkId) {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
    try {
      const response = await fetch(url + drinkId);
      const fetchResponse = await response.json();
      if (fetchResponse.drinks.length) {
        setDrinkDetail(fetchResponse.drinks[0]);
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
        </>
      ) : (
        <p>None found...</p>
      )}
    </>
  );
}

export default RecipeDetail;
