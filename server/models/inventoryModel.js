"use strict";

module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define("inventory", {
    strIngredient1: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });
  return inventory;
};
