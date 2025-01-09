//TODO: basic router
const router = require("express").Router();
const inventoryController = require("./controllers/inventoryController.js");

router.get("/inventory", inventoryController.getInventory);
router.post("/inventory", inventoryController.addIngredient);

module.exports = router;
