const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.get("/", studentController.getStudents);
router.post("/add-student", studentController.createStudent);
router.get("/edit-student/:id", studentController.renderEditPage);
router.post("/update-student/:id", studentController.updateStudent);
router.get("/delete-student/:id", studentController.deleteStudent);
module.exports = router;
