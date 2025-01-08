import { useEffect, useState } from "react"
import { mockIngredientList } from "../../../mockdata"
import Navbar from "../../nav-bar/nav-bar";

//TODO: sort routes out and test this


function IngredientSearch() {
  const [fullIngredientList, setFullIngredientList] = useState([])
  const [searchText, setSearchText] = useState("");

  function getFullIngredientList() {
    setFullIngredientList(mockIngredientList)
  }

  function handleChange(event) {
    setSearchText(event.target.value);
    const filteredList = fullIngredientList.filter((el) => {
      return el.strIngredient1.includes(searchText);
    })
    setFullIngredientList(filteredList);
  }

  useEffect(() => {
    getFullIngredientList();
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <p>Search and Add ingredients to your list!</p>
    <input type="text" onChange={handleChange}></input>
    <div>
    {fullIngredientList.length < 10 ? (
        fullIngredientList.map((ingredient) => {
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