const Student = require("../model/student.model");
const getStudents = async (req, res) => {
  try {
    let search = req.query.search || "";
    let students = await Student.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { course: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });
    res.render("index", { students });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};


const createStudent = async (req, res) => {
  try {
    let student = await Student.create(req.body);
    console.log("Student Created:", student);
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

const renderEditPage = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.redirect("/");
    res.render("edit", { student });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};


const updateStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};


const deleteStudent = async (req, res) => {
  try {
    let id = req.params.id;
    let student = await Student.findById(id);

    if (!student) {
      console.log("student not found");
      return res.redirect("/");
    }
    await Student.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

module.exports = {
  getStudents,
  createStudent,
  renderEditPage,
  updateStudent,
  deleteStudent,
};