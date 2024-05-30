const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const gradeRoutes = require("./grade");
const path = require("path");

router.use("/grade", gradeRoutes);
router.use("/user", userRoutes);
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Default route
router.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

module.exports = router;
