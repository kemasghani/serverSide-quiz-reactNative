const Grade = require("../models/grade");

// make CRUD operations for grades
exports.findAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find({});
    res.json(grades);
  } catch (error) {
    console.error("Error getting grades:", error);
    res.status(500).json({ error: "Error getting grades" });
  }
};

exports.findGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ error: "Grade not found" });
    }
    res.json(grade);
  } catch (error) {
    console.error("Error getting grade:", error);
    res.status(500).json({ error: "Error getting grade" });
  }
};

//find grade by user id
exports.findGradeByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const grades = await Grade.find({ userId: userId });

    if (!grades || grades.length === 0) {
      return res
        .status(404)
        .json({ error: "No grades found for the specified user" });
    }

    res.status(200).json(grades);
  } catch (error) {
    console.error("Error getting grades:", error);
    res
      .status(500)
      .json({ error: "Internal server error while retrieving grades" });
  }
};

//find single grade by user id and quiz id
exports.findSingleGradeByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const quizId = req.params.quizid;
    const grade = await Grade.findOne({ userId: userId, quizId: quizId });

    if (!grade) {
      return res
        .status(404)
        .json({ error: "No grade found for the specified user and quiz" });
    }

    res.status(200).json(grade);
  } catch (error) {
    console.error("Error getting grade:", error);
    res
      .status(500)
      .json({ error: "Internal server error while retrieving grade" });
  }
};

exports.createGrade = async (req, res) => {
  try {
    const newGrade = await Grade.create(req.body);
    res.json(newGrade);
  } catch (error) {
    console.error("Error creating grade:", error);
    res.status(500).json({ error: "Error creating grade" });
  }
};

//update grade by user id and quiz id
exports.updateGrade = async (req, res) => {
  try {
    const userId = req.params.id;
    const quizId = req.params.quizid;
    const updatedGrade = await Grade.findOneAndUpdate(
      { userId: userId, quizId: quizId },
      req.body,
      { new: true }
    );

    if (!updatedGrade) {
      return res.status(404).json({ error: "Grade not found" });
    }

    res.json(updatedGrade);
  } catch (error) {
    console.error("Error updating grade:", error);
    res.status(500).json({ error: "Error updating grade" });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
    if (!deletedGrade) {
      return res.status(404).json({ error: "Grade not found" });
    }
    res.json(deletedGrade);
  } catch (error) {
    console.error("Error deleting grade:", error);
    res.status(500).json({ error: "Error deleting grade" });
  }
};
// Path: models/Grade.js
