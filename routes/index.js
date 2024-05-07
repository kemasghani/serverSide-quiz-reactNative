const express = require("express");
const router = express.Router();
const categoryRoutes = require("./categoryRoute");
const packageRoutes = require("./packageRoute");
const userRoutes = require("./userRoute");
const imageRoutes = require('./imageRoutes');

router.use("/category", categoryRoutes);
router.use("/package", packageRoutes);
router.use("/user", userRoutes);
router.use("/image", imageRoutes);

module.exports = router;
