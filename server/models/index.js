"use strict";
const Sequelize = require("sequelize");
const inventoryModel = require("./inventoryModel.js");
const userModel = require("./userModel.js");
const favoritesModel = require("./favoritesModel.js");

const config = {
  host: "localhost",
  dialect: "postgres",
};
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  config
);
const db = {};
db.sequelize = sequelize;
db.user = userModel(sequelize, Sequelize.DataTypes);
db.inventory = inventoryModel(sequelize, Sequelize.DataTypes);
db.favoritesModel = favoritesModel(sequelize, Sequelize.DataTypes);
module.exports = db;
