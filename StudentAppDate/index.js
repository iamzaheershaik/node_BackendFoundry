const express = require('express');
const student = express();

student.use(express.urlencoded({ extended: true }));
student.set("view engine", "ejs");

let students = [];

student.get('/', (req, res) => {
    res.render("index", { students });
})
student.post("/add-student", (req, res) => {
    const { name, age } = req.body;

    students.push({ name, age });
    res.redirect("/");
});
student.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});