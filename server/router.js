const router = require("express").Router();
const inventoryController = require("./controllers/inventoryController.js");
const apiController = require("./controllers/apiController.js");

router.get("/inventory", inventoryController.getInventory);
router.post("/inventory", inventoryController.addIngredient);
router.delete("/inventory", inventoryController.removeIngredient);

router.get("/ingredient_list", apiController.getIngredientList);
router.get("/recipedetail/:drinkId", apiController.getRecipeDetails);
router.get("/filtered_recipes/:filter", apiController.getFilteredRecipes);

module.exports = router;
