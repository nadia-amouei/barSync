import { Express, Router } from "express";
import { apiRouter } from './apiRouter';
import { favoriteRouter } from './favoriteRouter';
import { inventoryRouter } from './inventoryRouter';
import { userRouter } from './userRouter';

const rootRouter = Router();
rootRouter.all("*", (req, res) =>{
  res.status(404).send("These are not the routes you are looking for");
});

const setRouting = (app: Express) => {
  app.use("/", apiRouter);
  app.use("/favorites", favoriteRouter);
  app.use("/inventory", inventoryRouter);
  app.use("/", userRouter);
  app.use(rootRouter);
};

export default setRouting;