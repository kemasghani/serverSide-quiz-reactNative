const express = require("express");
const {
  findAllUsers,
  sendOtpToEmail,
  loginUser,
  registerUser,
  submitOtp,
  changePass
} = require("../controller/UserController");
const router = express.Router();

// Define user routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/otp", sendOtpToEmail);
router.post("/submit-otp", submitOtp);
router.post("/change-pass", changePass);
router.get("/", findAllUsers);

module.exports = router;
