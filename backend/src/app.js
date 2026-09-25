const express = require("express");

const userRoutes = require("./routes/userRoutes");

const app = express();


app.use(express.json());



app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User REST API is running"
  });
});



app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


module.exports = app;
