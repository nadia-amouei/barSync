import { useEffect, useState } from "react"
import { mockIngredientList, mockInventory } from "../../../mockdata"
import Navbar from "../../nav-bar/nav-bar";
import Ingredient from "./ingredient"

//TODO: sort routes out and test this


function IngredientSearch() {
  const [fullIngredientList, setFullIngredientList] = useState([])
  const [searchText, setSearchText] = useState("");
  const [inventory, setInventory] = useState([]);
  const [filteredIngredientList, setFilteredIngredientList] = useState([]);


  function getFullIngredientList() {
    setFullIngredientList(mockIngredientList)
  }
  function getInventory() {
    setInventory(mockInventory);
  }

  function handleChange(event) {
    setSearchText(event.target.value.toLowerCase());
  }
  
  function filterList() {
    const filteredList = fullIngredientList.filter((el) => el.strIngredient1.toLowerCase().includes(searchText)
    )
    setFilteredIngredientList(filteredList);
  }

  useEffect(() => {
    getInventory();
    getFullIngredientList();
    filterList();
  }, [searchText]);

  return (
    <>
    <Navbar></Navbar>
    <p>Search and Add ingredients to your list!</p>
    <input type="text" onChange={handleChange}></input>
    <div>
    {(filteredIngredientList.length < 20 && filteredIngredientList.length > 0) ? (
        filteredIngredientList.map((ingredient) => {
            return (
                <Ingredient key={ingredient.strIngredient1} ingredient={ingredient} inventory={inventory} setInventory={setInventory}></Ingredient>
            )
        })
      ) : (
        <p>Start typing to filter ingredients!</p>
      )}
    </div>
    </>
  )
}

export default IngredientSearch