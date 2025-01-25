import React, { useEffect, useState } from "react";
import { IngredientItem } from "../../../interfaces/Ingredient";
import { InventoryItem } from "../../../interfaces/Inventory";
import Ingredient from "./ingredient";
import { getAllIngredients } from "../../../services/apiService";
import { useInventoryContext } from "../../../contexts/InventoryContext";

function IngredientSearch() {
  const [fullIngredientList, setFullIngredientList] = useState<IngredientItem[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredIngredientList, setFilteredIngredientList] = useState<InventoryItem[]>([]);

  const { inventory } = useInventoryContext();

  useEffect(() => {
    if (!fullIngredientList.length) {
      getFullIngredientList();
    }
    filterList();
  }, [searchText]);

  async function getFullIngredientList() {
    try {
      const fetchResponse = await getAllIngredients();
      if (fetchResponse.drinks.length) {
        setFullIngredientList(fetchResponse.drinks);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value.toLowerCase());
  }

  function filterList() {
    const filteredList = fullIngredientList.filter((el) =>
      el.strIngredient1.toLowerCase().includes(searchText)
    );
    const filteredItems = filteredList.map((elem, index) => {
      return {
        id: index,
        strIngredient1: elem.strIngredient1,
        createdAt : '',
        updatedAt : ''
      };
    });
    setFilteredIngredientList(filteredItems);
  }

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <h2 className="subtitle">Welcome to the ingredient search!</h2>
          <p>
            Start typing below to filter for ingredients to add to your
            inventory.
          </p>
          <input
            className="search-field"
            type="text"
            onChange={handleChange}
          ></input>
        </div>
        <div className="search-results-container" data-testid="search-results">
          {filteredIngredientList.length < 20 &&
          filteredIngredientList.length > 0 ? (
            filteredIngredientList.map((ingredient) => {
              return (
                <Ingredient
                  key={ingredient.strIngredient1}
                  ingredient={ingredient}
                  inventory={inventory}
                ></Ingredient>
              );
            })
          ) : (
            <p className="search-results-placeholder">
              Start typing to filter ingredients!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default IngredientSearch;
