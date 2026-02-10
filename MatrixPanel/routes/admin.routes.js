const express = require("express");
const uploadImage = require("../middleware/uploadImage");
const {
  addAdminPage,
  addAdmin,
  viewAllAdmins,
  deleteAdmin,
  editAdminPage,
  updateAdmin,
} = require("../controller/admin.controller");

const router = express.Router();
router.get("/viewAdmin", viewAllAdmins);
router.get("/addAdmin", addAdminPage);
router.post("/addAdmin",uploadImage.single("profileImage"),addAdmin);
router.get("/editAdmin/:id", editAdminPage);
router.post("/updateAdmin/:id",uploadImage.single("profileImage"),updateAdmin);
router.get("/deleteAdmin/:id", deleteAdmin);

module.exports = router;