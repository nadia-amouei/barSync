"use strict";
//TODO: this will now need to be changed to include the user id and ingredient
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
