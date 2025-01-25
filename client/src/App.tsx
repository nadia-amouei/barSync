import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./components/login/loginPage";
import Navbar from "./components/nav-bar/nav-bar";
import IngredientSearch from "./components/profile/inventory/ingredientSearch";
import Profile from "./components/profile/profile";
import RecipeDetail from "./components/profile/recipes/recipe-detail";
import RecipeList from "./components/profile/recipes/recipe-list";
import { useFavoritesContext } from "./contexts/FavoritesContext";
import { useInventoryContext } from "./contexts/InventoryContext";
import { fetchInventory, getFavoriteDrinks } from "./services/apiService";
import ProtectRoute from "./components/protect-route";

function App() {
  const {setInventory} = useInventoryContext();
  const {setFavorites} = useFavoritesContext();
  useEffect(() => {
    fetchInventory()
      .then(data => setInventory(data))
      .catch(e => console.log(e));
    getFavoriteDrinks()
      .then(data => setFavorites(data))
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>}
          />
          <Route path="/ingredientsearch" element={
            <ProtectRoute>
              <IngredientSearch />
            </ProtectRoute>}
          />
          <Route path="/recipes" element={
            <ProtectRoute>
              <RecipeList />
            </ProtectRoute>}
          />
          <Route path="/recipe/:recipeId" element={
            <ProtectRoute>
              <RecipeDetail />
            </ProtectRoute>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
