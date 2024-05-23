const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  quizId: { type: Number, required: true },
  title: { type: String, required: true },
  level: { type: Number, required: true },
  points: { type: Number, required: true },
  questionsCount: { type: Number, required: true },
  correctAnswer: { type: Number, required: true },
  completedAt: { type: Date, required: true },
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
