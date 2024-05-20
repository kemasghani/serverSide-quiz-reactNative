const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const router = require("./routes");

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });

// Test MongoDB connection endpoint
app.get("/test", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).send("Ping to MongoDB successful!");
  } catch (err) {
    console.error("Ping to MongoDB failed:", err);
    res.status(500).send("Ping to MongoDB failed!");
  }
});

// Use routes
app.use(router);

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
