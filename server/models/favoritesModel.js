"use strict";

module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define("favorite", {
    idDrink: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
  });
  return favorites;
};
