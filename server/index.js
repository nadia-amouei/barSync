"use strict";

const express = require("express");
const router = require("./router.js");
const cors = require("cors");
const db = require("./models/index.js");
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`[SERVER]: server running at http://localhost:${PORT}`);
    });
    await db.sequelize.sync();

    console.log(`[DATABASE]: connection established`);
  } catch (error) {
    console.log(error);
  }
})();
