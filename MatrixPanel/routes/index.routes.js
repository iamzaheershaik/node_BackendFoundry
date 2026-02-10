const express = require("express");
const { dashboard } = require("../controller/index.controller");
const router = express.Router();
router.get("/", dashboard);
router.use("/admin", require("./admin.routes"));
module.exports = router;
