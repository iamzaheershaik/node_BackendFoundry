const express = require("express");
const PORT = 9087;
const app = express();
const dbConnect = require("./config/dbConnection");

//dbconncetion
dbConnect();

//middleWare
app.set("view engine", "ejs");
app.use(express.urlencoded({}));
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

//routes
app.use("/", require("./routes/index.routes"));

app.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`);
});
