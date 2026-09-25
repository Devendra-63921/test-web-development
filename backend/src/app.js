const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;
if (corsOrigin && corsOrigin !== "*") {
  const allowedOrigins = corsOrigin.split(",").map((o) => o.trim());
  app.use(cors({ origin: allowedOrigins }));
} else {
  app.use(cors());
}

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User REST API is running",
  });
});

app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
