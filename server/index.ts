"use strict";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { db } from "./models/index";
import setRouting from "./router/index";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

setRouting(app);

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
