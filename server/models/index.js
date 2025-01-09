"use strict";
const Sequelize = require("sequelize");
const inventoryModel = require("./inventoryModel.js");

//TODO: temporary config, will need changing

const config = {
  host: "localhost",
  dialect: "postgres",
};
const sequelize = new Sequelize("barsync", "willi", "Shredd3r", config);
const db = {};
db.sequelize = sequelize;
db.inventory = inventoryModel(sequelize, Sequelize.DataTypes);
module.exports = db;
