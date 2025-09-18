const express = require("express");
const cors = require("cors");
const app = express();

// Body parser
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const artistRoutes = require("./routes/artists");
const dashboardRoutes = require("./routes/dashboard");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/artist", artistRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
