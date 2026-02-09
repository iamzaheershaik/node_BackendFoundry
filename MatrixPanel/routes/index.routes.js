const express = require("express");
const { dashboardPage } = require("../controller/index.controller");
const routes = express.Router();
routes.get("/", dashboardPage);
routes.get("/admin", require("./admin.routes"));
routes.get();
module.exports = routes;
