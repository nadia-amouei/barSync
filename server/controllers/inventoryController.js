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
    const ingredient = req.body.strIngredient1;
    await db.inventory.create({ strIngredient1: ingredient });
    res.status(201);
    res.send("added to inventory");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.removeIngredient = async (req, res) => {
  try {
    const ingredient = req.body.strIngredient1;
    await db.inventory.destroy({
      where: {
        strIngredient1: ingredient,
      },
    });
    res.status(201);
    res.send("removed from db");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
