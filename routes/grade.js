const express = require("express");
const {
  findAllGrades,
  findGradeById,
  createGrade,
  updateGrade,
  findGradeByUserId,
  findSingleGradeByUserId,
} = require("../controller/GradeController");

const router = express.Router();

// Define user routes
router.get("/", findAllGrades);
router.get("/:id", findGradeById);
router.get("/user/:id", findGradeByUserId);
router.get("/user/:id/:quizid", findSingleGradeByUserId);
router.post("/", createGrade);
router.put("/user/:id/:quizid", updateGrade);

module.exports = router;
