"use strict";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "../models/index";
import jwt from 'jsonwebtoken';

const rounds = process.env.SALTROUNDS || 10;
const SECRET_KEY = process.env.SECRET_KEY || 'default';

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      res.status(409).send({ error: "409", message: "User already exists!" });
    }
    if (password.length < 6 ) {
      res.status(409).send({ error: "409", message: 'password is too short' });
    }
    const hash = await bcrypt.hash(password, rounds);
    const newUser = await db.user.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hash,
      favorites: [],
      inventory: []
    }, {include: [{model: db.favoritesModel, as: "favorites"}, {model: db.inventory, as: "inventory"}]});

    const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: "Could not create user" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email }, include: [{model: db.favoritesModel, as: "favorites"}, {model: db.inventory, as: "inventory"}] });
    if (!user)  throw new Error();

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw new Error();

    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.status(200).send({ accessToken });

  } catch (error) {
    res.status(401)
      .send({ message: "Wrong credentials" });
  }
};

export default { createUser, login };