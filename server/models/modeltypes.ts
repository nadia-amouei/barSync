import { Model } from 'sequelize';

export interface UserModel extends Model {
  id: number,
  email: string,
  firstname: string,
  lastname: string,
  password: string
}

export interface InventoryModel extends Model {
  strIngredient1: string
}

export interface FavoritesModel extends Model {
  idDrink: number,
  strDrinkThumb: string,
  strDrink: string
}