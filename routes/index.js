const express = require("express");
const router = express.Router();
const userRoutes = require("./user");

router.use("/user", userRoutes);

// Default route
router.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

module.exports = router;
