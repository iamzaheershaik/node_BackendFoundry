const express = require("express");
const { dashboard } = require("../controller/index.controller");
const routes = express.Router();
routes.get("/", dashboard);
routes.use("/admin", require("./admin.routes"));
module.exports = routes;
