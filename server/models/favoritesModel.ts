"use strict";
import { DataTypes, Sequelize } from 'sequelize';
import { FavoritesModel } from './modeltypes';

export default (sequelize: Sequelize) => {
  const favorites = sequelize.define<FavoritesModel>("favorite", {
    idDrink: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    strDrinkThumb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strDrink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return favorites;
};
