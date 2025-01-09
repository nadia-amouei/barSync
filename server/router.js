const router = require("express").Router();
const inventoryController = require("./controllers/inventoryController.js");

router.get("/inventory", inventoryController.getInventory);
router.post("/inventory", inventoryController.addIngredient);
router.delete("/inventory", inventoryController.removeIngredient);

module.exports = router;
