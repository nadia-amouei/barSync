"use strict";

require("dotenv").config();
const express = require("express");
const router = require("./router.js");
const cors = require("cors");
const db = require("./models/index.js");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    app.listen(port, () => {
      console.log(`[SERVER]: server running at http://localhost:${port}`);
    });
    await db.sequelize.sync();

    console.log(`[DATABASE]: connection established`);
  } catch (error) {
    console.log(error);
  }
})();
