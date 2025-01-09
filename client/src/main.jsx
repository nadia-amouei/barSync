import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import IngredientSearch from './components/profile/inventory/ingredientSearch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ingredientsearch' element={<IngredientSearch />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


//TODO: add routes to pages