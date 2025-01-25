"use strict";

import { RequestHandler, Router } from "express";
import inventoryController from "../controllers/inventoryController";
import authMiddleware from "../middleware/auth";

const inventoryRouter = Router();

inventoryRouter.get("/", authMiddleware as RequestHandler, inventoryController.getInventory);
inventoryRouter.post("/", authMiddleware as RequestHandler,inventoryController.addIngredient);
inventoryRouter.delete("/", authMiddleware as RequestHandler,inventoryController.removeIngredient);

export { inventoryRouter };
