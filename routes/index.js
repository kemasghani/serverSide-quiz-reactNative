const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const gradeRoutes = require("./grade");

router.use("/grade", gradeRoutes);
router.use("/user", userRoutes);

// Default route
router.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

module.exports = router;
