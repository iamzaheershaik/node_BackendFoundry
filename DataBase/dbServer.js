const express = require("express");
const app = express();
const PORT = 9090;
const dbConnect = require("./src/config/dbConnect");
const Student = require("./src/model/student.model");

dbConnect();
app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/add-student", async (req, res) => {
  let student = await Student.create(req.body);
  console.log(student);
  return res.redirect("/");
});
app.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`);
});
