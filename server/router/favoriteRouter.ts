"use strict";

import { RequestHandler, Router } from "express";
import favoriteController from "../controllers/favoritesController";
import authMiddleware from "../middleware/auth";

const favoriteRouter = Router();

favoriteRouter.get("/", authMiddleware as RequestHandler, favoriteController.getFavorites);
favoriteRouter.post("/", authMiddleware as RequestHandler, favoriteController.addFavorite);
favoriteRouter.delete("/", authMiddleware as RequestHandler, favoriteController.removeFavorite);

export { favoriteRouter };
