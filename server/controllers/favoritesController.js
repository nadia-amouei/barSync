"use strict";
const db = require("../models/index.js");

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await db.favoritesModel.findAll();
    res.status(201);
    res.send(favorites);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const favoriteId = req.body.idDrink;
    const favoriteThumb = req.body.strDrinkThumb;
    const favoriteTitle = req.body.strDrink;
    await db.favoritesModel.create({
      idDrink: favoriteId,
      strDrinkThumb: favoriteThumb,
      strDrink: favoriteTitle,
    });
    res.status(201);
    res.send("added to favorites");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const favorite = req.body.idDrink;
    await db.favoritesModel.destroy({
      where: {
        idDrink: favorite,
      },
    });
    res.status(201);
    res.send("removed from db");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
