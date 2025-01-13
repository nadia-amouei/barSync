import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Profile from "./components/profile/profile";
import Navbar from "./components/nav-bar/nav-bar";

function App() {
  const [inventory, setInventory] = useState([]);

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



  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Profile
        inventory={inventory}
        setInventory={setInventory}
        getInventory={getInventory}
      ></Profile>
    </>
  );
}

export default App;
