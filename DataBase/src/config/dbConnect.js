const mongoose = require('mongoose');

const dbConnect = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("DB Is Connected"))
  .catch((err) => console.log(err))
}
module.exports = dbConnect;