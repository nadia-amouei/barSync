const bcrypt = require("bcrypt");
const db = require("../models/index.js");

exports.createUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      res.status(409).send({ error: "409", message: "invalid credentials" });
    }
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, process.env.SALTROUNDS);
    user = await db.user.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hash,
    });
    req.session.uid = user.id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: "Could not create user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw new Error();
    req.session.uid = user.id;
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
};
