import { useEffect, useState } from 'react'
import './App.css'
import Profile from './components/profile/profile'
import Navbar from './components/nav-bar/nav-bar'
import { mockInventory } from './mockdata';
//TODO: determine components and create basic client structure
function App() {
  const [inventory, setInventory] = useState([]);

  function getInventory() {
    setInventory(mockInventory);
  }

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <p>App jsx!</p>
      <Profile inventory={inventory} setInventory={setInventory}></Profile>
    </>
  )
}

export default App
