const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from other apps / frontend
app.use(cors());

// Read JSON data from requests
app.use(express.json());

// Check if API is working
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WellBite Recipe API is running"
  });
});


// Recipe API routes
const recipeRoutes = require("./routes/v1/recipes.routes");
app.use("/api/v1", recipeRoutes);

// If route is not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Handle errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

module.exports = app;
