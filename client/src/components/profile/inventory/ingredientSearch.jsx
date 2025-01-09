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
    console.log(event.target.value)
    setSearchText(event.target.value.toLowerCase());
    const filteredList = fullIngredientList.filter((el) => {
      console.log(el.strIngredient1.toLowerCase().includes(searchText))
      if (el.strIngredient1.toLowerCase().includes(searchText)) return el;
      //return el.strIngredient1.toLowerCase().includes(searchText);
    })
    setFilteredIngredientList(filteredList);
  }

  useEffect(() => {
    getInventory();
    getFullIngredientList();
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <p>Search and Add ingredients to your list!</p>
    <input type="text" onChange={handleChange}></input>
    <div>
    {(/*filteredIngredientList.length < 100 &&*/ filteredIngredientList.length > 0) ? (
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