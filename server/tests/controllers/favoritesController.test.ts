import { Request, Response } from "express";
import { db } from "../../models/index";
import favoritesController from "../../controllers/favoritesController";

jest.mock("../../models/index");

describe("Favourites Controller - getFavorites", () => {

  it("should return a list of favorites", async () => {
    const mockData = [
      { idDrink: "1", strDrinkThumb: "thumb1.jpg", strDrink: "Drink 1" },
      { idDrink: "2", strDrinkThumb: "thumb2.jpg", strDrink: "Drink 2" },
    ];

    (db.favoritesModel.findAll as jest.Mock).mockResolvedValue(mockData);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await favoritesController.getFavorites(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("should handle errors and return a 500 status", async () => {
    (db.favoritesModel.findAll as jest.Mock).mockRejectedValue(new Error());

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await favoritesController.getFavorites(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

})

describe("Favorites Controller - addFavorite", () => {

  it("should add a favorite and return a success message", async () => {
    const mockReqBody = {
      idDrink: "1",
      strDrinkThumb: "thumb1.jpg",
      strDrink: "Drink 1",
    };

    (db.favoritesModel.create as jest.Mock).mockResolvedValue(mockReqBody);

    const req = {
      body: mockReqBody,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await favoritesController.addFavorite(req, res);


    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Added to favorites" });
  });

  it("should handle errors and return a 500 status", async () => {
    const mockReqBody = {
      idDrink: "1",
      strDrinkThumb: "thumb1.jpg",
      strDrink: "Drink 1",
    };

    (db.favoritesModel.create as jest.Mock).mockRejectedValue(new Error());

    const req = {
      body: mockReqBody,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await favoritesController.addFavorite(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("Favorites Controller - removeFavorite", () => {

  it("should remove a favorite and return a success message", async () => {
    const mockReqBody = {
      idDrink: "1",
      strDrinkThumb: "thumb1.jpg",
      strDrink: "Drink 1",
    };

    (db.favoritesModel.destroy as jest.Mock).mockResolvedValue(1);

    const req = {
      body: mockReqBody,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await favoritesController.removeFavorite(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Removed from favorites." });
  });

  it("should return a 500 status", async () => {
    const mockReqBody = {
      idDrink: "1",
      strDrinkThumb: "thumb1.jpg",
      strDrink: "Drink 1",
    };

    (db.favoritesModel.destroy as jest.Mock).mockRejectedValue(new Error());

    const req = {
      body: mockReqBody,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await favoritesController.removeFavorite(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
