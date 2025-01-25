import bcrypt from "bcrypt";
import { Request, Response } from "express";
import userController from "../../controllers/userController";
import { db } from "../../models/index";
import jwt from 'jsonwebtoken';

jest.mock("../../models/index");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Controller - createUser", () => {
  it("should create a new user successfully", async () => {
    const mockReqBody = {
      email: "test@example.com",
      firstname: "John",
      lastname: "Doe",
      password: "password1234",
    };

    (db.user.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
    (db.user.create as jest.Mock).mockResolvedValue({ id: 1, ...mockReqBody });

    const req = { body: mockReqBody } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await userController.createUser(req, res);

    expect(db.user.create).toHaveBeenCalledWith({
      email: mockReqBody.email,
      firstname: mockReqBody.firstname,
      lastname: mockReqBody.lastname,
      password: "hashed_password",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ message: "user register successfully" });
  });

  it("should return error if user already exists", async () => {
    const mockReqBody = {
      email: "test@example.com",
      firstname: "John",
      lastname: "Doe",
      password: "password123",
    };

    (db.user.findOne as jest.Mock).mockResolvedValue({ id: 1, ...mockReqBody });

    const req = { body: mockReqBody } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({ error: "409", message: "User already exists!" });
  });

  it("should return error if password is too short", async () => {
    const mockReqBody = {
      email: "test@example.com",
      firstname: "John",
      lastname: "Doe",
      password: "123",
    };

    (db.user.findOne as jest.Mock).mockResolvedValue(null);

    const req = { body: mockReqBody } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({ error: "409", message: "password is too short" });
  });

});

describe("User Controller - login", () => {
  it("should log in a user and return an access token", async () => {
    const mockReqBody = {
      email: "test@example.com",
      password: "password123",
    };

    const mockUser = {
      id: 1,
      email: "test@example.com",
      password: "hashed_password",
    };

    (db.user.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mock_access_token");

    const req = { body: mockReqBody } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ accessToken: "mock_access_token" });
  });

  it("should return error if user is not found", async () => {

    const mockReqBody = {
      email: "test@example.com",
      password: "password123",
    };

    (db.user.findOne as jest.Mock).mockResolvedValue(null);

    const req = { body: mockReqBody } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ message: "Wrong credentials" });
  });

  it("should return error if password is incorrect", async () => {

    const mockReqBody = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    const mockUser = {
      id: 1,
      email: "test@example.com",
      password: "hashed_password",
    };

    (db.user.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const req = { body: mockReqBody } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ message: "Wrong credentials" });
  });

});