const express = require("express");
const app = express();
const PORT = 9090;
const dbConnect = require("./src/config/dbConnect");
const Student = require("./src/model/student.model");

dbConnect();
app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  let search = req.query.search ? req.query.search : "";
  let students = await Student.find({
    $or:[
      {firstName :{$regex: search, $options: "i" }}, // i is the Mongoose /i check the docmentation
      {lastName :{$regex: search, $options: "i" }},
      {course :{$regex: search, $options: "i" }},
      {email :{$regex: search, $options: "i" }}
    ]
  });
  res.render("index", { students })
})
app.post("/add-student", async (req, res) => {
  let student = await Student.create(req.body);
  console.log(student);
  return res.redirect("/");
});

app.get("/edit-student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.redirect("/");
    res.render("edit", { student });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.get("/delete-student/:id", async (req, res) => {
  let id = req.params.id;
  let student = await Student.findById(id);

  if(!student){
    console.log('student not found');
    return res.redirect('/')
  }
  await Student.findByIdAndDelete(id)
  return res.redirect("/")
})
app.post("/update-student/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
app.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`);
});
