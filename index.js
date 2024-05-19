const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

const app = express();
const routes = require("./routes");

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());
// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://smarta:KjG9CgMMUARdMPSt@smarta.nce9kp1.mongodb.net/"
);

// Use routes
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
