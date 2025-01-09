//TODO: get all inventory ingredients
//TODO: post one ingredient to db

"use strict";
const db = require("../models/index.js");

exports.getInventory = async (req, res) => {
  try {
    const inventory = await db.inventory.findAll();
    res.status(201);
    res.send(inventory);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.addIngredient = async (req, res) => {
  try {
    const ingredient = req.body.ingredient;
    await db.inventory.create({ ingredient: ingredient });
    res.status(201);
    res.send("added to inventory");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
