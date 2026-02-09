const express = require("express");
const routes = express.Router();
const uploadImage = require("../middleware/uploadImage");
const {
  addAdminPage,
  addAdmin,
  viewAllAdmins,
  deleteAdmin,
  editAdminPage,
  updateAdmin
} 
= require("../controller/admin.controller");
routes.get("/viewAdmin", viewAllAdmins);
routes.get("/addAdmin", addAdminPage);
routes.post("/addAdmin",uploadImage.single("profileImage"),addAdmin);
routes.get("/edit-admin/:id", editAdminPage);
routes.post( "/update-admin/:id",uploadImage.single("profileImage"),updateAdmin);
routes.get("/delete-admin/:id", deleteAdmin);

module.exports = routes;