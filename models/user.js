const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  umur: String,
  domisili: String,
  password: String,
  otp: String,
  avatar: String, // Field to store avatar URL or path
  kelas: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
