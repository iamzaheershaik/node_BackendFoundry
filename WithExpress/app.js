const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/product", (req, res) => {
  res.render("product");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// 404 (last)
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


