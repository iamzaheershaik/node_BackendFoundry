const express = require("express");
const app = express();
const PORT = 9090;
const dbConnect = require("./src/config/dbConnect");
app.use(express.static("public"));

const studentRoutes = require("./src/routes/student.routes");

dbConnect();

app.set("view engine", "ejs");
app.use(express.urlencoded({}));

app.use("/", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`);
});
