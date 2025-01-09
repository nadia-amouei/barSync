"use strict";

module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define("inventory", {
    ingredient: DataTypes.TEXT,
  });
  return inventory;
};
