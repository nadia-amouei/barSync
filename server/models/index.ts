"use strict";
import { Sequelize, Options } from "sequelize";
import inventoryModel from "./inventoryModel";
import userModel from "./userModel";
import favoritesModel from "./favoritesModel";
import dotenv from "dotenv";

dotenv.config();

const options: Options = {
  host: "localhost",
  dialect: "postgres",
  database: process.env.DATABASE_NAME || 'barsync',
  username: process.env.DATABASE_USER || 'nadia',
  password: process.env.DATABASE_PASS || '',
}

const sequelize = new Sequelize(options);

const User = userModel(sequelize);
const Favorite = favoritesModel(sequelize);
const Inventory = inventoryModel(sequelize);

User.hasMany(Favorite, {foreignKey: "userId", as: "favorites"});
Favorite.belongsTo(User, {foreignKey: "userId", as: "user"})

User.hasMany(Inventory, {foreignKey: "userId", as: "inventory"});
Inventory.belongsTo(User, {foreignKey: "userId", as: "user"})

const db = {
  sequelize: sequelize,
  user: User,
  inventory: Inventory,
  favoritesModel: Favorite
};
export { db };
