"use strict";

import { Router } from "express";
import apiController from "../controllers/apiController";

const apiRouter = Router();

apiRouter.get("/ingredient_list", apiController.getIngredientList);
apiRouter.get("/recipedetail/:drinkId", apiController.getRecipeDetails);
apiRouter.get("/filtered_recipes/:filter", apiController.getFilteredRecipes);

export { apiRouter };
