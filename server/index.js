//TODO: basic server structure
"use strict";

const express = require("express");
const router = require("./router.js");
const cors = require("cors");
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`[SERVER]: server running at http://localhost:${PORT}`);
});
