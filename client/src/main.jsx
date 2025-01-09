import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import IngredientSearch from './components/profile/inventory/ingredientSearch.jsx'
import RecipeList from './components/profile/recipes/recipe-list.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ingredientsearch' element={<IngredientSearch />} />
        <Route path='/recipes' element={<RecipeList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


//TODO: add routes to pages
//TODO: add route params to go to recipe detail