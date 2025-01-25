import { DrinkDetails } from "../interfaces/DrinkDetails";
import { FavoriteItem } from "../interfaces/Favorite";
import { IngredientItem } from "../interfaces/Ingredient";
import { InventoryItem } from "../interfaces/Inventory";
import { getCookie } from "typescript-cookie";

const BASE_URL = "http://localhost:3000";

type EndPoint =
  | 'inventory'
  | 'ingredient_list'
  | 'favorites'
  | `filtered_recipes/${string}`
  | `recipedetail/${string}`;

async function makeServerRequest<T>(endpoint: EndPoint, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        "Authorization": `Bearer ${getCookie("token")}`
      }
    });
    if (!response.ok) {
      throw new Error("error fetching data");
    }

    return await response.json();
  } catch (e) {
    throw new Error(`API Error: ${e}`);
  }
}

async function addIngredient(ingredient: InventoryItem) {
  try {
    await makeServerRequest("inventory", {
      method: "POST",
      body: JSON.stringify({ strIngredient1: ingredient.strIngredient1 }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.log(error);
  }
}

async function removeIngredient(ingredient: InventoryItem) {
  try {
    await makeServerRequest("inventory", {
      method: "DELETE",
      body: JSON.stringify({ strIngredient1: ingredient.strIngredient1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function getAllIngredients() {
  try {
    return await makeServerRequest<{drinks: IngredientItem[]}>("ingredient_list");
  } catch (error) {
    console.log(error);
    return {drinks: []};
  }
}

async function fetchInventory() {
  try {
    return await makeServerRequest<InventoryItem[]>("inventory");
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getDrink(drinkId: string){
  try {
    return await makeServerRequest<{drinks: DrinkDetails[]}>(`recipedetail/${drinkId}`);
  } catch (error) {
    console.log(error);
    return {drinks: []}
  }
}

async function getFavoriteDrinks() {
  try {
    return await makeServerRequest<FavoriteItem[]>("favorites");
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function addFavoriteDrink(drinkId: string, title: string, thumb: string) {
  try {
    return await makeServerRequest("favorites", {
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
  } catch (error) {
    console.log(error);
  }
}

async function removeFavoriteDrink(drinkId: string) {
  try {
    return await makeServerRequest("favorites", {
      method: "DELETE",
      body: JSON.stringify({ idDrink: drinkId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function getFilteredRecipes(filter: string) {
  try {
    return await makeServerRequest<{drinks: FavoriteItem[]}>(`filtered_recipes/${filter}`);
  } catch (error) {
    console.log(error);
    return {drinks: []};
  }
}

export { addFavoriteDrink, addIngredient, fetchInventory, getAllIngredients, getDrink, getFavoriteDrinks, getFilteredRecipes, removeFavoriteDrink, removeIngredient };
