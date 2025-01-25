"use strict";
import { Request, Response } from "express";
import { db } from "../models/index";

const getFavorites = async (req: Request, res: Response) => {
  try {
    const data = await db.favoritesModel.findAll({where: {userId: req.user.id}});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const addFavorite = async (req: Request, res: Response) => {
  try {
    const {idDrink, strDrinkThumb, strDrink } = req.body;

    await db.favoritesModel.create({
      idDrink: idDrink,
      strDrinkThumb: strDrinkThumb,
      strDrink: strDrink,
      userId: req.user.id
    });
    res.status(201).json({ message: 'Added to favorites'});

  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const {idDrink} = req.body;

    await db.favoritesModel.destroy({
      where: {
        idDrink: idDrink,
        userId: req.user.id
       },
    });

    res.status(200).json({message: "Removed from favorites."});
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export default { getFavorites, addFavorite, removeFavorite };