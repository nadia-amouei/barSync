"use strict";
import { Request, Response } from "express";

const URL = process.env.API_URL || "http://www.thecocktaildb.com/api/json/v2/";
const API_KEY = process.env.API_KEY || "9973533";

type EndPoint = 
  | 'list.php?i=list' 
  | `filter.php?i=${string}`
  | `lookup.php?i=${string}`;

async function makeServerRequest<T>(endpoint: EndPoint, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${URL + API_KEY }/${endpoint}`, options);
    if (!response.ok) {
      throw new Error("error fetching data");
    }
    return await response.json();
  } catch (e) {
    throw new Error(`API Error: ${e}`);
  }
}

const getIngredientList = async (req: Request, res: Response) => {
  try {
    const data = await makeServerRequest("list.php?i=list" )
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const getFilteredRecipes = async (req: Request, res: Response) => {
  const convertedFilter = req.params.filter.replace(/9/g, ",");

  try {
    const data = await makeServerRequest(`filter.php?i=${convertedFilter}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const getRecipeDetails = async (req: Request, res: Response) => {
  try {
    const data = await makeServerRequest(`lookup.php?i=${req.params.drinkId}`)
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export default { getIngredientList, getFilteredRecipes, getRecipeDetails };
