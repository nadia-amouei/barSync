import { Request, Response } from "express";
import { db } from "../../models/index";
import inventoryController from "../../controllers/inventoryController";

jest.mock("../../models/index");

describe("inventory Controller - getInventory", () => {

  it("should return a list of inventory", async () => {
    const mockData = [
      { strIngredient1: "White Wine"  },
      { strIngredient1: "Wildberry schnapps" },
    ];

    (db.inventory.findAll as jest.Mock).mockResolvedValue(mockData);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await inventoryController.getInventory(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("should handle errors and return a 500 status", async () => {

    (db.inventory.findAll as jest.Mock).mockRejectedValue(new Error());

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await inventoryController.getInventory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

})

describe("inventory Controller - addFavorite", () => {

  it("should add a favorite and return a success message", async () => {
    const mockReqBody = {
      strIngredient1: "Wildberry schnapps"
    };

    (db.inventory.create as jest.Mock).mockResolvedValue(mockReqBody);

    const req = {
      body: mockReqBody,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await inventoryController.addIngredient(req, res);


    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Added to Ingredient" });
  });

  it("should handle errors and return a 500 status", async () => {
    const mockReqBody = {
      strIngredient1: "Wildberry schnapps"
    };

    (db.inventory.create as jest.Mock).mockRejectedValue(new Error());

    const req = {
      body: mockReqBody,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await inventoryController.addIngredient(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("inventory Controller - removeFavorite", () => {

  it("should remove a favorite and return a success message", async () => {
    const mockReqBody = {
      strIngredient1:"Wildberry schnapps"
    };

    (db.inventory.destroy as jest.Mock).mockResolvedValue(1);

    const req = {
      body: mockReqBody,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await inventoryController.removeIngredient(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "ingredient removed" });
  });

  it("should return a 500 status", async () => {
    const mockReqBody = {
      strIngredient1: "Wildberry schnapps"
    };

    (db.inventory.destroy as jest.Mock).mockRejectedValue(new Error());

    const req = {
      body: mockReqBody,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await inventoryController.removeIngredient(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
