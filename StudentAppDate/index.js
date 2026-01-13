const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let students = [
    { id: 1, name: "Zaheer", age: 22, course: "Full Stack Development", marks: 85 },
    { id: 2, name: "Ayaan", age: 21, course: "Computer Science", marks: 78 },
    { id: 3, name: "Rahul", age: 23, course: "Mechanical Engineering", marks: 69 },
    { id: 4, name: "Sana", age: 20, course: "Information Technology", marks: 92 }
];

app.get("/", (req, res) => {
    res.render("index", { students });
});


app.post("/add-student", (req, res) => {
    const { name, age, course, marks } = req.body;

    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name,
        age: Number(age),
        course,
        marks: Number(marks)
    };

    students.push(newStudent);
    res.redirect("/");
});
app.get("/edit-student/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) return res.redirect("/");
    res.render("edit-student", { student });
});


app.post("/update-student/:id", (req, res) => {
    const { name, age, course, marks } = req.body;

    students = students.map(s =>
        s.id == req.params.id
            ? { ...s, name, age: Number(age), course, marks: Number(marks) }
            : s
    );

    res.redirect("/");
});


app.get("/delete-student/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) return res.redirect("/");
    res.render("delete-student", { student });
});
app.post("/delete-student/:id", (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.redirect("/");
});

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
