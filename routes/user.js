const express = require("express");
const {
  findAllUsers,
  sendEmail,
  loginUser,
  registerUser,
} = require("../controller/UserController");
const router = express.Router();

// Define user routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/email", sendEmail);
router.get("/", findAllUsers);

module.exports = router;
