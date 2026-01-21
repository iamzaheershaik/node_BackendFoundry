const mongoose = require("mongoose");

const studentSchema =  mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  course: { type: String },
  mobileNo: { type: String },
});

module.exports = mongoose.model("Student", studentSchema);
