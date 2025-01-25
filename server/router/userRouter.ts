"use strict";

import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.login);

export { userRouter };
