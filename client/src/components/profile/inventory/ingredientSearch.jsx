import { useEffect, useState } from "react";
import Navbar from "../../nav-bar/nav-bar";
import Ingredient from "./ingredient";

//TODO: I have re-used get inventory to pass down to ingredient. this can be simplified.


function IngredientSearch() {
  const [fullIngredientList, setFullIngredientList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [inventory, setInventory] = useState([]);
  const [filteredIngredientList, setFilteredIngredientList] = useState([]);

  useEffect(() => {
    if (!inventory.length) {
      getInventory();
    }
    if (!fullIngredientList.length) {
      getFullIngredientList();
    }
    filterList();
  }, [searchText]);

  async function getFullIngredientList() {
    const url =
      "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list";
    console.log("getfullingredientlist triggered");
    try {
      const response = await fetch(url);
      const fetchResponse = await response.json();
      if (fetchResponse.drinks.length) {
        setFullIngredientList(fetchResponse.drinks);
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

  function handleChange(event) {
    setSearchText(event.target.value.toLowerCase());
  }

  function filterList() {
    const filteredList = fullIngredientList.filter((el) =>
      el.strIngredient1.toLowerCase().includes(searchText)
    );
    setFilteredIngredientList(filteredList);
  }

  return (
    <>
      <Navbar></Navbar>
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
        <div className="search-results-container">
          {filteredIngredientList.length < 20 &&
          filteredIngredientList.length > 0 ? (
            filteredIngredientList.map((ingredient) => {
              return (
                <Ingredient
                  key={ingredient.strIngredient1}
                  ingredient={ingredient}
                  inventory={inventory}
                  setInventory={setInventory}
                  getInventory={getInventory}
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
