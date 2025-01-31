import { NextFunction, Request, Response } from "express";
import authMiddleware from "../../middleware/auth";
import { db } from "../../models";
import jwt from 'jsonwebtoken';

jest.mock("../../models");
jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  const mockNext = jest.fn() as NextFunction;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 403 if authorization header is missing", async () => {
    const req = { headers: {} } as unknown as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;

    await authMiddleware(req, res, mockNext);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", async () => {
    const req = { headers: { authorization: "Bearer invalid_token" } } as unknown as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authMiddleware(req, res, mockNext);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 401 if user does not exist", async () => {
    const req = { headers: { authorization: "Bearer valid_token" } } as unknown as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;

    (jwt.verify as jest.Mock).mockReturnValue({ id: 1 });
    (db.user.findOne as jest.Mock).mockResolvedValue(null);

    await authMiddleware(req, res, mockNext);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should call next() if token is valid and user exists", async () => {
    const req = { headers: { authorization: "Bearer valid_token" } } as unknown as Request;
    const res = {} as unknown as Response;

    const mockUser = { id: 1, email: "test@example.com" };
    (jwt.verify as jest.Mock).mockReturnValue({ id: 1 });
    (db.user.findOne as jest.Mock).mockResolvedValue(mockUser);

    await authMiddleware(req, res, mockNext);

    expect(req.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });

});
