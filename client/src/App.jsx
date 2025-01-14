import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Profile from "./components/profile/profile";
import Navbar from "./components/nav-bar/nav-bar";

function App() {
  const [inventory, setInventory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  async function getInventory() {
    const url = "http://localhost:3000/inventory";
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

  async function getFavorites() {
    const url = "http://localhost:3000/favorites";
    try {
      const response = await fetch(url);
      const fetchFavorites = await response.json();
      if (fetchFavorites.length) {
        console.log("favorites:", fetchFavorites);
        setFavorites(fetchFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getInventory();
    getFavorites();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Profile
        inventory={inventory}
        setInventory={setInventory}
        getInventory={getInventory}
        favorites={favorites}
        setFavorites={setFavorites}
        getFavorites={getFavorites}
      ></Profile>
    </>
  );
}

export default App;
