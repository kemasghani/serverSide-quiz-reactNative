const express = require("express");
const {
  findAllUsers,
  sendOtpToEmail,
  loginUser,
  registerUser,
  submitOtp,
  changePass,
  updateUser,
  findUserById,
  uploadAvatar,
} = require("../controller/UserController");
const router = express.Router();
const { upload, processAndUploadImage } = require("../middlewares");
// Define user routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/otp", sendOtpToEmail);
router.post("/submit-otp", submitOtp);
router.post("/change-pass", changePass);
router.post("/:id/upload-avatar", upload.single("avatar"), processAndUploadImage, uploadAvatar);
router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.put("/:id", updateUser);

module.exports = router;
