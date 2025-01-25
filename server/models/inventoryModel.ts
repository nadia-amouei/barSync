"use strict";
import { DataTypes, Sequelize } from 'sequelize';
import { InventoryModel } from './modeltypes';

export default (sequelize: Sequelize) => {
  const inventory = sequelize.define<InventoryModel>("inventory", {
    strIngredient1: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });
  return inventory;
};
